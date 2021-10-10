import React from 'react';
import Tabs from '../components/Tabs';
import AddOrder from '../components/AddOrder';

export default function Orders() {
  return (
    <Tabs
      labelLeft="Hàng Gửi Hằng Ngày"
      labelRight="Tiền Trả Hằng Hgày"
      itemLeft={<AddOrder />}
      itemRight={'<Something />'}
    />
  );
}
