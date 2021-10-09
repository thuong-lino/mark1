import React from 'react';
import Tabs from '../components/Tabs';
import OrderTable from '../components/orders/Order';

export default function DailyTransaction() {
  return (
    <Tabs
      labelLeft="Hàng Gửi Hằng Ngày"
      labelRight="Tiền Trả Hằng Hgày"
      itemLeft={<OrderTable />}
      itemRight="Tiền Trả"
    />
  );
}
