import React from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';

const InputCurrency = ({ onHandleValue, value }) => {
  return (
    <Input type="number" onChange={onHandleValue} value={value} step="0.01" />
  );
};

InputCurrency.propTypes = {
  onHandleValue: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default InputCurrency;
