import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  history: [],
};

const conversionSlice = createSlice({
  name: 'conversions',
  initialState,
  reducers: {
    addConversion: (state, action) => {
      state.history.push(action.payload);
    },
  },
});

export const { addConversion } = conversionSlice.actions;

export default conversionSlice.reducer;
