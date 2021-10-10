import React from 'react';
import Tabs from '../components/Tabs';
import OrderTable from '../components/Order';
import CustomerPaid from '../components/CustomerPaid';

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
