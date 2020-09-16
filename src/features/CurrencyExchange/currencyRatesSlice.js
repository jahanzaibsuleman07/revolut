import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  loading: false,
  hasErrors: false,
  currencyRates: {},
};

export const currencyRatesSlice = createSlice({
  name: 'currencyRates',
  initialState,
  reducers: {
    getCurrencyRates: (state) => {
      state.loading = true;
    },
    getCurrencyRatesSuccess: (state, { payload }) => {
      state.currencyRates = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getCurrencyRatesFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

export const {
  getCurrencyRates,
  getCurrencyRatesSuccess,
  getCurrencyRatesFailure,
} = currencyRatesSlice.actions;

export const currencyRatesSelector = (state) => state.currencyRates;

export const fetchCurrencyRates = () => {
  return async (dispatch) => {
    dispatch(getCurrencyRates());

    try {
      const response = await fetch(
        `https://openexchangerates.org/api/latest.json?app_id=${process.env.REACT_APP_OER_API_KEY}`
      );
      const data = await response.json();

      dispatch(getCurrencyRatesSuccess(data));
    } catch (error) {
      dispatch(getCurrencyRatesFailure());
    }
  };
};

export default currencyRatesSlice.reducer;
