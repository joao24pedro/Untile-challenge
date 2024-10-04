import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tickers: [],
};

const tickerSlice = createSlice({
  name: 'tickers',
  initialState,
  reducers: {
    setTickers: (state, action) => {
      state.tickers = action.payload;
    },
  },
});

export const { setTickers } = tickerSlice.actions;

export default tickerSlice.reducer;
