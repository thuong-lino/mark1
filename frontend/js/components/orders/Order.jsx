import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { useSelector } from 'react-redux';
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
    editable: true,
  },
  {
    field: 'unit',
    headerName: 'ĐVT',
    width: 100,
    editable: true,
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
    editable: true,
  },
  {
    field: 'unit_price',
    headerName: 'Đơn giá',
    width: 120,
    editable: true,
  },
  {
    field: 'total',
    headerName: 'Thành tiền',
    width: 150,
    editable: true,
  },
  {
    field: 'date_sent',
    headerName: 'Ngày gửi',
    width: 150,
    editable: true,
  },
  {
    field: 'date_flight',
    headerName: 'Ngày bay',
    width: 120,
    editable: true,
  },
  {
    field: 'date_received',
    headerName: 'Ngày đến',
    width: 150,
    editable: true,
  },
];

export default function OrderTable() {
  let orders = useSelector((state) => state.orders.orders);
  return (
    <div style={{ height: 600, width: '100%' }}>
      {orders ? (
        <DataGrid
          rows={orders}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
          disableSelectionOnClick
        />
      ) : null}
    </div>
  );
}
