import React from 'react';
import Tabs from '../components/Tabs';
import OrderTable from '../components/Order';
import CustomerPaid from '../components/CustomerPaid';

export default function DailyTransaction() {
  return (
    <Tabs
      labelLeft="Hàng Gửi Hằng Ngày"
      labelRight="Tiền Trả Hằng Hgày"
      itemLeft={<OrderTable />}
      itemRight={<CustomerPaid />}
    />
  );
}
