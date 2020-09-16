import React from 'react';
import { Row, Col } from 'antd';

import UpdateRates from './UpdateRates';
import RatesExchangeContent from './RatesExchangeContent';

const CurrencyExchange = () => {
  return (
    <Row>
      <Col xs={24}>
        <UpdateRates />
        <RatesExchangeContent />
      </Col>
    </Row>
  );
};

export default CurrencyExchange;
