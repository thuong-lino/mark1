import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Tabs from '../components/Tabs';
// eslint-disable-next-line babel/camelcase
import { creators as customer_creators } from '../store/customers';

import CustomerPaid from './CustomerPaid';
import OrderTable from './Order';

export default function DailyTransaction() {
  const dispatch = useDispatch();
  useEffect(() => {
    // eslint-disable-next-line babel/camelcase
    dispatch(customer_creators.getTransactions());
  }, [dispatch]);
  return (
    <Tabs
      itemLeft={<OrderTable />}
      itemRight={<CustomerPaid />}
      labelLeft="Gửi hàng"
      labelRight="Trả tiền"
    />
  );
}
