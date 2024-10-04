import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTickers } from '../redux/tickersSlice';
import { fetchCoinTickers, fetchSupportedMarkets, fetchCurrencies } from '../utils/fetchCoinGecko';
import CurrencySelect from '../components/currencySelect';
import TickerList from '../components/tickersList';

const Tickers = () => {
    const dispatch = useDispatch();

    // State for currencies
    const [currencies, setCurrencies] = useState({
        data: [],
        isLoading: true,
        error: null
    });

    // State for markets
    const [markets, setMarkets] = useState({
        data: [],
        isLoading: false,
        error: null
    });

    // State for tickers and form
    const [state, setState] = useState({
        selectedCoin: '',
        selectedMarket: '',
        tickers: [],
        isLoading: false,
        error: null
    });

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
                    error: 'Failed to load currencies'
                }));
            }
        };

        loadCurrencies();
    }, []);

    // Load markets when coin is selected
    useEffect(() => {
        const loadMarkets = async () => {
            if (!state.selectedCoin) {
                setMarkets({ data: [], isLoading: false, error: null });
                return;
            }

            setMarkets(prev => ({ ...prev, isLoading: true, error: null }));

            try {
                const marketsData = await fetchSupportedMarkets(state.selectedCoin);
                setMarkets({
                    data: Array.isArray(marketsData) ? marketsData : [],
                    isLoading: false,
                    error: null
                });
            } catch (error) {
                setMarkets({
                    data: [],
                    isLoading: false,
                    error: 'Failed to fetch markets'
                });
            }
        };

        loadMarkets();
    }, [state.selectedCoin]);

    const handleCoinChange = (e) => {
        setState(prev => ({
            ...prev,
            selectedCoin: e.target.value,
            selectedMarket: '', // Reset market when coin changes
            tickers: [] // Reset tickers when coin changes
        }));
    };

    const handleMarketChange = (e) => {
        setState(prev => ({
            ...prev,
            selectedMarket: e.target.value
        }));
    };

    const handleSubmit = async () => {
        const { selectedCoin, selectedMarket } = state;
        if (!selectedCoin || !selectedMarket) {
            setState(prev => ({
                ...prev,
                error: 'Please select both a coin and a market'
            }));
            return;
        }

        setState(prev => ({ ...prev, isLoading: true, error: null }));

        try {
            const fetchedTickers = await fetchCoinTickers(selectedCoin, selectedMarket);
            setState(prev => ({
                ...prev,
                tickers: fetchedTickers,
                isLoading: false
            }));
        } catch (error) {
            setState(prev => ({
                ...prev,
                error: 'Failed to fetch tickers',
                isLoading: false
            }));
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-full">
            <h1 className="text-blue-600 text-3xl font-bold mb-6">Tickers</h1>

            <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <CurrencySelect
                        value={state.selectedCoin}
                        onChange={handleCoinChange}
                        label="Select Coin"
                        currencies={currencies.data}
                        isLoading={currencies.isLoading}
                        error={currencies.error}
                    />

                    <select
                        className="border p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                disabled:bg-gray-100 disabled:cursor-not-allowed h-12"
                        onChange={handleMarketChange}
                        value={state.selectedMarket}
                        disabled={markets.isLoading || !state.selectedCoin}
                    >
                        <option value="">Select Market</option>
                        {markets.data.map((market) => (
                            <option key={market.id} value={market.id}>
                                {market.name}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-900 
                            transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed h-12"
                        disabled={state.isLoading || !state.selectedCoin || !state.selectedMarket}
                    >
                        {state.isLoading ? 'Searching...' : 'Search Tickers'}
                    </button>
                </div>

                

                {state.error && (
                    <div className="p-3 bg-red-100 text-red-700 rounded">
                        {state.error}
                    </div>
                )}

                {markets.error && (
                    <div className="p-3 bg-red-100 text-red-700 rounded">
                        {markets.error}
                    </div>
                )}

                <TickerList tickers={state.tickers} />
            </div>
        </div>
    );
};

export default Tickers;
