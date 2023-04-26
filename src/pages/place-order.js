import Layout from '@components/Layout';
import React from 'react';

const PlaceOrderPage = () => {
  return (
    <Layout>
      This is dummy PlaceOrderPage. Only user which are logged in can see this
      page. If user wont be logged in he will be immidiately redirected to
      GoogleAuth page
    </Layout>
  );
};

export default PlaceOrderPage;
