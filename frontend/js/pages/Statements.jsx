import React, { useEffect } from 'react';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { creators } from '../store/statements';

const columns = [
  { field: 'id', headerName: 'ID', width: 70, sortable: false },
  {
    field: 'customer',
    headerName: 'Khách Hàng',
    width: 150,
    sortable: false,
  },
  {
    field: 'open_debit',
    headerName: 'Nợ đầu kỳ',
    width: 150,
    cellClassName: 'no',
  },
  {
    field: 'open_credit',
    headerName: 'Có đầu kỳ',
    cellClassName: 'co',
    width: 150,
  },
  {
    field: 'transaction_debit',
    cellClassName: 'no',
    headerName: 'Nợ trong kỳ',
    width: 150,
  },
  {
    field: 'transaction_credit',
    cellClassName: 'co',
    headerName: 'Có trong kỳ',
    width: 150,
  },
  {
    field: 'close_debit',
    cellClassName: 'no',
    headerName: 'Nợ cuối kỳ',
    width: 150,
  },
  {
    field: 'close_credit',
    cellClassName: 'co',
    headerName: 'Có cuối kỳ',
    width: 150,
  },
  {
    field: 'period',
    width: 150,
    headerName: 'Kỳ',
  },
];

export default function Statements() {
  let statements = useSelector((state) => state.statements.statements);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(creators.getStatements());
  }, []);
  return (
    <div style={{ height: 600, width: '100%' }}>
      {statements ? (
        <DataGrid
          rows={statements.results}
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
