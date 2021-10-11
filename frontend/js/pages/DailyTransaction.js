import React from 'react';
import Tabs from '../components/Tabs';
import OrderTable from './Order';
import CustomerPaid from './CustomerPaid';

export default function DailyTransaction() {
  return (
    <Tabs
      labelLeft="Gửi hàng"
      labelRight="Trả tiền"
      itemLeft={<OrderTable />}
      itemRight={<CustomerPaid />}
    />
  );
}
