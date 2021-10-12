import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { creators } from '../store/orders';
import { Button, IconButton, Typography } from '@material-ui/core';
import AddOrder from '../components/AddOrder';

const columns = [
  { field: 'id', headerName: 'ID', width: 70, sortable: false },
  {
    field: 'customer',
    headerName: 'Khách Hàng',
    editable: true,
    width: 150,
  },
  {
    field: 'item',
    headerName: 'Tên hàng',
    width: 100,
    sortable: false,
  },
  {
    field: 'unit',
    headerName: 'ĐVT',
    sortable: false,
    width: 100,
  },
  {
    field: 'quantity',
    headerName: 'SL',
    sortable: false,
    width: 70,
  },
  {
    field: 'weight',
    sortable: false,
    headerName: 'Kg',
    width: 70,
  },
  {
    field: 'unit_price',
    headerName: 'Đơn giá',
    width: 120,
  },
  {
    field: 'total',
    headerName: 'Thành tiền',
    width: 150,
  },
  {
    field: 'date_sent',
    headerName: 'Ngày gửi',
    width: 150,
  },
  {
    field: 'date_flight',
    headerName: 'Ngày bay',
    width: 120,
  },
  {
    field: 'date_received',
    headerName: 'Ngày đến',
    width: 150,
  },
];

export default function OrderTable() {
  //cxonst [orders, setOrders] = useState(null)
  const dispatch = useDispatch();
  const [createMode, setCreateMode] = useState(false);
  let orders = useSelector((state) => state.orders.orders); // use let because DataGrid needed
  const customers = useSelector((state) => state.customers.customers);
  const errors = useSelector((state) => state.customers.errors);

  const handleButtonClick = () => {
    setCreateMode(!createMode);
  };
  const button =
    createMode === false ? (
      <Button
        className="orderButton"
        variant="contained"
        onClick={handleButtonClick}
        color="primary"
      >
        Create
      </Button>
    ) : (
      <Button
        className="orderButton"
        variant="contained"
        onClick={handleButtonClick}
        color="secondary"
      >
        Hide
      </Button>
    );
  return (
    <div className="ordersWrapper">
      {button}
      {createMode === true ? <AddOrder customers={customers} user_id={2}></AddOrder> : null}
      <div style={{ height: 600, width: '100%', margin: '10px 0px' }}>
        {orders ? (
          <DataGrid
            rows={orders}
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
        ) : null}
      </div>
    </div>
  );
}
