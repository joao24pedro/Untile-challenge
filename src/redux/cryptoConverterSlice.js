import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSupportedMarkets } from '../utils/fetchCoinGecko';

// Async thunk to fetch markets data
export const fetchMarkets = createAsyncThunk('markets/fetchMarkets', async () => {
  const response = await fetchSupportedMarkets();
  return response;
});

const converterSlice = createSlice({
  name: 'markets',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
    history: [],
  },
  reducers: {
    addConversion: (state, action) => {
      state.history.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMarkets.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMarkets.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchMarkets.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addConversion } = converterSlice.actions;

export default converterSlice.reducer;
