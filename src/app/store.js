import { configureStore } from '@reduxjs/toolkit';
import fixedAmountReducer from '../features/FixedAmountData/fixedAmountSlice';
import currencyRatesReducer from '../features/CurrencyExchange/currencyRatesSlice';

export default configureStore({
  reducer: {
    fixedAmount: fixedAmountReducer,
    currencyRates: currencyRatesReducer,
  },
});
