import { convertCurrency, isValidDecimalNumber } from './utils';

it('validates currency conversion', () => {
  expect(convertCurrency(200, 1, 1)).toEqual(200);
  expect(convertCurrency(200, 1, 0.775816)).toEqual(155.16);
});

it('validates float number with maximum two decimal values', () => {
  expect(isValidDecimalNumber(20.22)).toEqual(true);
  expect(isValidDecimalNumber(20.222)).toEqual(false);
  expect(isValidDecimalNumber(202.22)).toEqual(true);
  expect(isValidDecimalNumber('ABC')).toEqual(false);
  expect(isValidDecimalNumber(0)).toEqual(true);
  expect(isValidDecimalNumber(20)).toEqual(true);
});
