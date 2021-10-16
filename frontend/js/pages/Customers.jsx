import React, { useState, useEffect } from 'react';
import api from '../store/api';
const Customers = () => {
  const [data, setData] = useState();
  useEffect(() => {
    const fetchCustomerList = async () => {
      try {
        const res = await api.get('/api/customers/');
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCustomerList();
  }, []);

  return (
    <div>
      <p>Hi</p>
    </div>
  );
};

export default Customers;
