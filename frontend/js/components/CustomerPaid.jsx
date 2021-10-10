import React, { useEffect } from 'react';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { creators } from '../store/customers';
const columns = [
  { field: 'id', headerName: 'ID', width: 70, sortable: false },
  {
    field: 'customer',
    headerName: 'Khách Hàng',
    width: 200,
    sortable: false,
  },
  {
    field: 'amount',
    headerName: 'Số tiền',
    width: 150,
  },
  {
    field: 'created_at',
    headerName: 'Ngày / Giờ',
    width: 170,
  },
];

export default function CustomerPaid() {
  let transactions = useSelector((state) => state.customers.transactions);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(creators.getTransactions());
  }, []);
  return (
    <div style={{ height: 600, width: '100%' }}>
      {transactions ? (
        <DataGrid
          rows={transactions.results}
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
