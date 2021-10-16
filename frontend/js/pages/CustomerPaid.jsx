import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { useSnackbar } from 'notistack';
import { Button, CircularProgress } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { creators } from '../store/customers';
import AddTransaction from '../components/AddTransaction';
import api from '../store/api';
import { symbols } from '../constants';
const columns = [
  { field: 'id', headerName: 'ID', width: 70, sortable: false },
  {
    field: 'customer',
    headerName: 'Khách Hàng',
    width: 300,
    sortable: false,
  },
  {
    field: 'created_at',
    headerName: 'Ngày / Giờ',
    width: 170,
  },
  {
    field: 'amount',
    headerName: 'Số tiền',
    headerAlign: 'right',
    cellClassName: 'orderTableTotal',
    valueFormatter: (params) => {
      const symbol = symbols('USD');
      return `${symbol} ${params.row.amount}`;
    },
    width: 150,
  },
];

export default function CustomerPaid() {
  let transactions = useSelector((state) => state.customers.transactions);
  const customers = useSelector((state) => state.customers.customers);
  const errors = useSelector((state) => state.customers.errors);
  const { enqueueSnackbar } = useSnackbar();
  const [createMode, setCreateMode] = useState(false);
  const dispatch = useDispatch();

  const handleButtonClick = () => {
    setCreateMode(!createMode);
  };
  const handleSubmit = (transaction) => {
    api
      .post('/api/customers/add_transaction/', transaction)
      .then((res) => {
        if (res.status === 201) {
          enqueueSnackbar('Thêm giao dịch thành công', { variant: 'success' });
        }
        dispatch(creators.getTransactions());
      })
      .catch((e) => {
        console.log(e.response);
      });
  };
  const button =
    createMode === false ? (
      <Button variant="contained" onClick={handleButtonClick} color="primary">
        Thêm giao dịch
      </Button>
    ) : (
      <Button
        style={{ width: 100 }}
        variant="contained"
        onClick={handleButtonClick}
        color="secondary"
      >
        Ẩn
      </Button>
    );
  return (
    <>
      {button}
      {createMode === true ? (
        <AddTransaction
          customers={customers}
          onSubmit={handleSubmit}
          errors={errors}
        ></AddTransaction>
      ) : null}
      <div style={{ height: 600, width: '100%', margin: '10px 0px' }}>
        {transactions ? (
          <DataGrid
            rows={transactions}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            disableSelectionOnClick
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
        ) : (
          <CircularProgress />
        )}
      </div>
    </>
  );
}
