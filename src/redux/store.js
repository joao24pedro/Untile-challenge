import { configureStore } from '@reduxjs/toolkit';
import conversionReducer from './cryptoConverterSlice';
import tickerReducer from './tickersSlice';

export const store = configureStore({
  reducer: {
    conversions: conversionReducer,
    markets: conversionReducer,
    tickers: tickerReducer,
  },
});
