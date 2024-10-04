import { configureStore } from '@reduxjs/toolkit';
import conversionReducer from './conversionSlice';
import tickerReducer from './tickerSlice';

export const store = configureStore({
  reducer: {
    conversions: conversionReducer,
    tickers: tickerReducer,
  },
});
