import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Chip, CircularProgress } from '@material-ui/core';
import AddOrder from '../components/AddOrder';
import { HighlightOffOutlined, HourglassEmptyOutlined } from '@material-ui/icons';
import { push } from 'connected-react-router';
import { symbols } from '../constants';
import { creators } from '../store/orders';
import SelectPeriods from '../components/SelectPeriods';
import { useSnackbar } from 'notistack';
import api from '../store/api';
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
      const symbol = symbols(params.row.currency);
      return `${symbol} ${params.row.total}`;
    },
  },
];

function OrderTable() {
  const dispatch = useDispatch();
  const [createMode, setCreateMode] = useState(false);
  const [periods, setPeriods] = useState();
  const [currentPeriod, setCurrentPeriod] = useState();
  const { enqueueSnackbar } = useSnackbar();
  let orders = useSelector((state) => state.orders.orders); // use let because DataGrid needed
  const customers = useSelector((state) => state.customers.customers);

  useEffect(() => {
    const fetchPeriods = async () => {
      try {
        const res = await api.get('/api/statements/periods/');
        setPeriods(res.data);
      } catch (error) {
        enqueueSnackbar('Lấy dữ liệu các kỳ không thành công', { variant: 'error' });
      }
    };
    fetchPeriods();
  }, []);
  // On current Period Change
  useEffect(() => {
    dispatch(creators.getOrders(currentPeriod));
  }, [currentPeriod, dispatch]);

  const onChangeCurrentPeriod = (selectedPeriod) => {
    setCurrentPeriod(selectedPeriod);
  };
  const handleButtonClick = () => {
    setCreateMode(!createMode);
  };
  const handleOnRowClick = (params) => {
    dispatch(push(`/orders/${params.row.id}/`));
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
  if (orders && periods) {
    return (
      <div className="ordersWrapper">
        <div style={{ marginBottom: 10, display: 'flex', justifyContent: 'space-between' }}>
          {button}
          <SelectPeriods
            periods={periods}
            onChangeCurrentPeriod={onChangeCurrentPeriod}
            selectedPeriod={currentPeriod === undefined ? periods[0].id : currentPeriod}
          ></SelectPeriods>
        </div>
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
          ) : (
            <CircularProgress />
          )}
        </div>
      </div>
    );
  }
  return <CircularProgress />;
}
export default OrderTable;
