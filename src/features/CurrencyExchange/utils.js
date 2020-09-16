export const convertCurrency = (amount, from, to) => {
  const fromInUSD = 1 / from;
  return +(+amount * fromInUSD * to).toFixed(2);
};

export const isValidDecimalNumber = (value) => {
  const validRegEx = new RegExp(/^(\d?)+(\.\d{0,2})?$/);
  return validRegEx.test(value);
};
