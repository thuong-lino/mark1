import React, { useEffect } from 'react';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { creators } from '../store/orders';

const columns = [
  { field: 'id', headerName: 'ID', width: 70, sortable: false },
  {
    field: 'customer',
    headerName: 'Khách Hàng',
    width: 100,
    sortable: false,
    settings: false,
  },
  {
    field: 'item',
    headerName: 'Tên hàng',
    width: 100,
  },
  {
    field: 'unit',
    headerName: 'ĐVT',
    width: 100,
  },
  {
    field: 'quantity',
    headerName: 'SL',
    width: 100,
  },
  {
    field: 'weight',
    headerName: 'Kg',
    width: 100,
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
  let orders = useSelector((state) => state.orders.orders);
  useEffect(() => {
    dispatch(creators.getOrders());
  }, []);

  return (
    <div style={{ height: 600, width: '100%' }}>
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
  );
}
