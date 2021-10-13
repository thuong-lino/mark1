import React, { useEffect } from 'react';
import Tabs from '../components/Tabs';
import OrderTable from './Order';
import CustomerPaid from './CustomerPaid';
import { creators as order_creators } from '../store/orders';
import { creators as customer_creators } from '../store/customers';
import { useDispatch } from 'react-redux';

export default function DailyTransaction() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(order_creators.getOrders());
    dispatch(customer_creators.getTransactions());
  }, [dispatch]);
  return (
    <Tabs
      labelLeft="Gửi hàng"
      labelRight="Trả tiền"
      itemLeft={<OrderTable />}
      itemRight={<CustomerPaid />}
    />
  );
}
