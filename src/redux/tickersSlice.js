import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCoinTickers } from '../utils/fetchCoinGecko';

// Async thunk to fetch tickers data
export const fetchTickers = createAsyncThunk('tickers/fetchTickers', async ({ coinId, exchangeId }) => {
  const tickers = await fetchCoinTickers(coinId, exchangeId);
  return tickers;
});

const tickersSlice = createSlice({
  name: 'tickers',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTickers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchTickers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default tickersSlice.reducer;
