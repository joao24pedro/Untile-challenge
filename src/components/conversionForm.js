import React from 'react';
import PropTypes from 'prop-types';
import CurrencySelect from './currencySelect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const ConversionForm = ({ 
  formState, 
  onInputChange, 
  onConvert,
  currencies
}) => (
  <div className="space-y-4">
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <input
            type="text"
            value={formState.amount}
            onChange={onInputChange('amount')}
            className="border p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent max-w-27 h-12"
            placeholder="Amount"
            aria-label="Amount"
        />
        
        <CurrencySelect
            value={formState.inputCurrency}
            onChange={onInputChange('inputCurrency')}
            label="Input Currency"
            currencies={currencies.data}
            isLoading={currencies.isLoading}
            error={currencies.error}
        />
        <FontAwesomeIcon icon={faArrowRight} className='min-h-10 min-w-10 pt-2 pr-2' />
        <CurrencySelect
            value={formState.targetCurrency}
            onChange={onInputChange('targetCurrency')}
            label="Target Currency"
            currencies={currencies.data}
            isLoading={currencies.isLoading}
            error={currencies.error}
        />
        <button
            onClick={onConvert}
            className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-900 
                        transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed h-12"
            disabled={formState.loading}
            >
            {formState.loading ? 'Converting...' : 'Convert'}
        </button>
    </div>

    {formState.error && (
      <div className="p-3 bg-red-100 text-red-700 rounded">
        {formState.error}
      </div>
    )}
  </div>
);

ConversionForm.propTypes = {
    formState: PropTypes.shape({
      amount: PropTypes.string.isRequired,
      inputCurrency: PropTypes.string.isRequired,
      targetCurrency: PropTypes.string.isRequired,
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
      result: PropTypes.number
    }).isRequired,
    currencies: PropTypes.shape({
      data: PropTypes.array.isRequired,
      isLoading: PropTypes.bool.isRequired,
      error: PropTypes.string
    }).isRequired,
    onInputChange: PropTypes.func.isRequired,
    onConvert: PropTypes.func.isRequired
  };

export default ConversionForm;