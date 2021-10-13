import React, { useState } from 'react';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Chip } from '@material-ui/core';
import AddOrder from '../components/AddOrder';
import { HighlightOffOutlined, HourglassEmptyOutlined } from '@material-ui/icons';
import { push } from 'connected-react-router';

const columns = [
  { field: 'id', headerName: 'ID', flex: 0.6, sortable: false, cellClassName: 'orderTableId' },
  {
    field: 'customer',
    headerName: 'Khách Hàng',
    flex: 3,
  },

  {
    field: 'date_sent',
    headerName: 'Ngày gửi',
    flex: 2,
  },
  {
    field: 'date_flight',
    flex: 2,
    headerName: 'Ngày bay',
    renderCell: (params) => {
      if (!params.row.date_flight) {
        return (
          <Chip
            icon={<HighlightOffOutlined />}
            label="Hàng chưa được gửi đi"
            color="primary"
            variant="outlined"
            style={{ fontSize: '10px' }}
          />
        );
      }
    },
  },
  {
    field: 'date_received',
    headerName: 'Ngày đến',
    flex: 2,
    renderCell: (params) => {
      if (!params.row.date_received) {
        return (
          <Chip
            icon={<HourglassEmptyOutlined />}
            label="Chưa nhận được hàng"
            color="secondary"
            variant="outlined"
            style={{ fontSize: '10px' }}
          />
        );
      }
    },
  },
  {
    field: 'total',
    headerName: 'Thành tiền',
    headerAlign: 'right',
    cellClassName: 'orderTableTotal',
    flex: 1.5,

    valueFormatter: (params) => {
      return `$ ${params.row.total}`;
    },
  },
];

export default function OrderTable() {
  const dispatch = useDispatch();
  const [createMode, setCreateMode] = useState(false);
  let orders = useSelector((state) => state.orders.orders); // use let because DataGrid needed
  const customers = useSelector((state) => state.customers.customers);

  const handleButtonClick = () => {
    setCreateMode(!createMode);
  };
  const handleOnRowClick = (params) => {
    dispatch(push(`/orders/${params.row.id}/`));
    console.log('row click', params.row.id);
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
      {createMode === true ? <AddOrder customers={customers}></AddOrder> : null}
      <div style={{ height: 600, width: '100%', margin: '10px 0px' }}>
        {orders ? (
          <DataGrid
            rows={orders}
            getRowClassName={(params) => 'orderTableRow'}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
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
        ) : null}
      </div>
    </div>
  );
}
