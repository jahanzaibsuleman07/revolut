import { createSlice } from '@reduxjs/toolkit';

export const fixedAmountSlice = createSlice({
  name: 'fixedAmount',
  initialState: {
    amount: {
      currency: 'USD',
      value: '200',
    },
  },
});

export const fixedAmountSelector = (state) => state.fixedAmount.amount;

export default fixedAmountSlice.reducer;
