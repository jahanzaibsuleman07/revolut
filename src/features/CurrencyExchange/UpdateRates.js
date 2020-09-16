import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { fetchCurrencyRates } from './currencyRatesSlice';

const UpdateRates = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrencyRates());
  });

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchCurrencyRates());
    }, 10000);
    return () => clearInterval(interval);
  }, [dispatch]);

  return null;
};

export default UpdateRates;
