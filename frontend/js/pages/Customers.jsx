import React, { useState, useEffect } from 'react';
import api from '../store/api';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import AddCustomerDialog from './AddCustomerDialog';

import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { CircularProgress, Typography, Button } from '@material-ui/core';
const columns = [
  { field: 'id', headerName: 'ID', flex: 1.4 },
  {
    field: 'firstname',
    headerName: 'Tên',
    flex: 4,
    editable: true,
  },
  {
    field: 'email_phonenumber',
    headerName: 'Email + Số điện thoại',
    flex: 8,
    sortable: false,
    editable: true,
    valueGetter: (params) => {
      return `${params.row.phone_number}  ${params.row.email}`;
    },
  },
  {
    field: 'total_order',
    headerName: 'Tổng đơn hàng',
    type: 'number',
    flex: 3,
    headerAlign: 'center',
    cellClassName: 'total_order',
    editable: true,
  },
];
const Customers = () => {
  const [data, setData] = useState([
    {
      id: null,
      email: null,
      firstname: null,
      phone_number: null,
      total_order: null,
    },
  ]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCustomerList = async () => {
      try {
        const res = await api.get('/api/customers/');
        const orderedData = res.data.sort((a, b) => b.total_order - a.total_order);
        setData(orderedData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCustomerList();
  }, []);
  const handleOnRowClick = (params) => {
    dispatch(push(`/customers/${params.row.id}/`));
  };
  const onDialogClose = () => {
    setDialogOpen(false);
  };
  if (data.length > 1) {
    return (
      <>
        <div className="customersHeader">
          <Typography variant="h4">Khách Hàng</Typography>
          <Button variant="contained" color="primary" onClick={() => setDialogOpen(true)}>
            Thêm khách hàng mới
          </Button>
        </div>
        <AddCustomerDialog open={dialogOpen} onClose={onDialogClose} />
        <div style={{ width: '100%', height: 1000 }}>
          <DataGrid
            rows={data}
            columns={columns}
            getRowClassName={(params) => 'orderTableRow'}
            pageSize={100}
            disableSelectionOnClick
            onRowClick={handleOnRowClick}
            ocaleText={{
              toolbarDensity: 'Size',
              toolbarDensityLabel: 'Size',
              toolbarDensityCompact: 'Small',
              toolbarDensityStandard: 'Medium',
              toolbarDensityComfortable: 'Large',
            }}
            components={{
              Toolbar: GridToolbar,
            }}
          />
        </div>
      </>
    );
  }
  return <CircularProgress />;
};

export default Customers;
