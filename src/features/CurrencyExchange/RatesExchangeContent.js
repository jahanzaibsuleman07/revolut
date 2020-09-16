import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Carousel, Spin } from 'antd';

import { currencyRatesSelector } from './currencyRatesSlice';
import { fixedAmountSelector } from '../FixedAmountData/fixedAmountSlice';
import InputCurrency from './InputCurrency';
import { convertCurrency, isValidDecimalNumber } from './utils';

const availableCurrencies = [
  { id: '0', name: 'USD', symbol: '$' },
  { id: '1', name: 'GBP', symbol: '£' },
  { id: '2', name: 'EUR', symbol: '€' },
];

const RateExchangeContent = () => {
  const [currentOrigin, setCurrentOrigin] = useState(availableCurrencies[0]);
  const [currentTarget, setCurrentTarget] = useState(availableCurrencies[0]);
  const [originFixed, setOriginFixed] = useState(0);
  const [targetFixed, setTargetFixed] = useState(0);
  const [originValue, setOriginValue] = useState('');
  const [targetValue, setTargetValue] = useState('');

  const { currencyRates, hasErrors } = useSelector(currencyRatesSelector);
  const fixedAmount = useSelector(fixedAmountSelector);

  useEffect(() => {
    const oFixed = convertCurrency(
      fixedAmount.value,
      currencyRates.rates && currencyRates.rates.USD,
      currencyRates.rates && currencyRates.rates[currentOrigin.name]
    );
    setOriginFixed(oFixed);
  }, [currencyRates, currentOrigin, fixedAmount]);

  useEffect(() => {
    const tFixed = convertCurrency(
      fixedAmount.value,
      currencyRates.rates && currencyRates.rates.USD,
      currencyRates.rates && currencyRates.rates[currentTarget.name]
    );
    setTargetFixed(tFixed);
  }, [currencyRates, currentTarget, fixedAmount]);

  const onChangeCurrOrigin = (currentOriginSlide) => {
    const oValue = convertCurrency(
      targetValue,
      currencyRates.rates && currencyRates.rates[currentTarget.name],
      currencyRates.rates &&
        currencyRates.rates[availableCurrencies[currentOriginSlide].name]
    ).toString();
    setOriginValue(oValue);

    setCurrentOrigin(availableCurrencies[currentOriginSlide]);
  };

  const onChangeCurrTarget = (currentTargetSlide) => {
    const tValue = convertCurrency(
      originValue,
      currencyRates.rates && currencyRates.rates[currentOrigin.name],
      currencyRates.rates &&
        currencyRates.rates[availableCurrencies[currentTargetSlide].name]
    ).toString();
    setTargetValue(tValue);

    setCurrentTarget(availableCurrencies[currentTargetSlide]);
  };

  const onHandleOriginValue = (e) => {
    const inputValue = e.target.value;
    if (inputValue === '' || isValidDecimalNumber(inputValue)) {
      setOriginValue(inputValue);

      const tValue = convertCurrency(
        inputValue,
        currencyRates.rates && currencyRates.rates[currentOrigin.name],
        currencyRates.rates && currencyRates.rates[currentTarget.name]
      ).toString();
      setTargetValue(tValue);
    }
  };

  const onHandleTargetValue = (e) => {
    const inputValue = e.target.value;
    if (inputValue === '' || isValidDecimalNumber(inputValue)) {
      setTargetValue(inputValue);

      const oValue = convertCurrency(
        inputValue,
        currencyRates.rates && currencyRates.rates[currentTarget.name],
        currencyRates.rates && currencyRates.rates[currentOrigin.name]
      ).toString();
      setOriginValue(oValue);
    }
  };

  return (
    <>
      {!hasErrors ? (
        <Row>
          <Col span={12} offset={6}>
            <Spin spinning={!currencyRates.rates}>
              <Carousel afterChange={onChangeCurrOrigin}>
                {availableCurrencies.map((currency) => (
                  <div key={currency.id}>
                    {currencyRates.rates && (
                      <div className="slide-content">
                        <h3>{currency.name}</h3>
                        <p>
                          You have {currency.symbol} {originFixed}
                        </p>
                        <InputCurrency
                          onHandleValue={onHandleOriginValue}
                          value={originValue}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </Carousel>
              <Carousel afterChange={onChangeCurrTarget}>
                {availableCurrencies.map((currency) => (
                  <div key={currency.id}>
                    {currencyRates.rates && (
                      <div className="slide-content content-target">
                        <h3>{currency.name}</h3>
                        <p>
                          You have {currency.symbol} {targetFixed} <br />
                          <small>
                            {currency.symbol}1 = {currentOrigin.symbol}
                            {convertCurrency(
                              1,
                              currencyRates.rates &&
                                currencyRates.rates[currency.name],
                              currencyRates.rates &&
                                currencyRates.rates[currentOrigin.name]
                            )}
                          </small>
                        </p>
                        <InputCurrency
                          onHandleValue={onHandleTargetValue}
                          value={targetValue}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </Carousel>
            </Spin>
          </Col>
        </Row>
      ) : (
        <h1>API has encountered an error.</h1>
      )}
    </>
  );
};

export default RateExchangeContent;
