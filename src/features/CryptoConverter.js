import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addConversion } from '../redux/cryptoConverterSlice';
import { fetchConversionRate, fetchCurrencies } from '../utils/fetchCoinGecko';
import ConversionForm from '../components/conversionForm';
import ConversionHistory from '../components/conversionHistory';

const CryptoConverter = () => {
  const dispatch = useDispatch();
  
  // Separate currencies state from form state
  const [currencies, setCurrencies] = useState({
    data: [],
    isLoading: true,
    error: null
  });

  const [formState, setFormState] = useState({
    inputCurrency: '',
    targetCurrency: '',
    amount: '',
    result: null,
    loading: false,
    error: null
  });

  const conversionHistory = useSelector((state) => state.conversions.history);

  // Load currencies on mount
  useEffect(() => {
    const loadCurrencies = async () => {
      try {
        const data = await fetchCurrencies();
        setCurrencies({
          data,
          isLoading: false,
          error: null
        });
      } catch (error) {
        setCurrencies(prev => ({ 
          ...prev,
          isLoading: false,
          error: 'Failed to load currencies. Please try again later.'
        }));
      }
    };

    loadCurrencies();
  }, []);

  const validateForm = useCallback(({ inputCurrency, targetCurrency, amount }) => {
    if (!inputCurrency || !targetCurrency || !amount) {
      return 'Please fill in all fields';
    }
    return null;
  }, []);

  const performConversion = useCallback(async ({ inputCurrency, targetCurrency, amount }) => {
    const conversionRate = await fetchConversionRate(inputCurrency, targetCurrency);
    const convertedAmount = parseFloat(amount) * conversionRate;
    
    return {
      inputCurrency,
      targetCurrency,
      amount: parseFloat(amount),
      convertedAmount,
      timestamp: new Date().toISOString()
    };
  }, []);

  const handleConversion = useCallback(async () => {
    if (formState.loading) return;

    const validationError = validateForm(formState);
    if (validationError) {
      setFormState(prev => ({
        ...prev,
        error: validationError
      }));
      return;
    }

    setFormState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const result = await performConversion(formState);
      dispatch(addConversion(result));

      setFormState(prev => ({
        ...prev,
        result: result.convertedAmount,
        loading: false,
        error: null
      }));
    } catch (error) {
      setFormState(prev => ({
        ...prev,
        error: 'Conversion failed. Please try again.',
        loading: false
      }));
    }
  }, [formState, dispatch, validateForm, performConversion]);

  const handleInputChange = useCallback((field) => (e) => {
    const value = field === 'amount' ? e.target.value.replace(/[^0-9.]/g, '') : e.target.value;
    setFormState(prev => ({
      ...prev,
      [field]: value,
      error: null
    }));
  }, []);

  return (
    <div className="container mx-auto p-2">
      <h1 className="text-blue-600 text-4xl font-bold mb-6 text-center">Crypto Calculator</h1>
      
      <ConversionForm
        formState={formState}
        currencies={currencies}
        onInputChange={handleInputChange}
        onConvert={handleConversion}
      />

      <ConversionHistory history={conversionHistory} />
    </div>
  );
};

export default CryptoConverter;