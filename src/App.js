import React from 'react';
import { Layout } from 'antd';

import CurrencyExchange from './features/CurrencyExchange';

import './App.scss';

const { Content } = Layout;

const App = () => {
  return (
    <>
      <Layout>
        <Content>
          <CurrencyExchange />
        </Content>
      </Layout>
    </>
  );
};

export default App;
