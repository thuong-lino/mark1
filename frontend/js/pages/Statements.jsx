import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { creators } from '../store/statements';
import {
  CircularProgress,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from '@material-ui/core';
import SelectPeriods from '../components/SelectPeriods';
import api from '../store/api';
import { useSnackbar } from 'notistack';

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
    cellClassName: 'noCuoiKi',
    headerName: 'Nợ cuối kỳ',
    width: 150,
  },
  {
    field: 'close_credit',
    cellClassName: 'coCuoiKi',
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
  const [open, setOpen] = useState(false);
  const [periods, setPeriods] = useState();
  const [currentPeriod, setCurrentPeriod] = useState();
  const { enqueueSnackbar } = useSnackbar();

  //On mount
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
    dispatch(creators.getStatements(currentPeriod));
  }, [currentPeriod]);
  const onChangeCurrentPeriod = (selectedPeriod) => {
    setCurrentPeriod(selectedPeriod);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handelSubmit = async () => {
    try {
      await api.post('/api/statements/close_period/');
      enqueueSnackbar('Đóng kỳ hành công', { variant: 'success' });
      enqueueSnackbar('Mở kỳ mới thành công', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Oopss! Lỗi', { variant: 'error' });
    }
    setOpen(false);
  };

  if (statements && periods) {
    return (
      <>
        <div style={{ marginBottom: 10, display: 'flex', justifyContent: 'flex-end' }}>
          <SelectPeriods
            periods={periods}
            onChangeCurrentPeriod={onChangeCurrentPeriod}
            selectedPeriod={currentPeriod === undefined ? periods[0].id : currentPeriod}
          ></SelectPeriods>
        </div>

        <div style={{ height: 600, width: '100%' }}>
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
        </div>
        <Button
          color="secondary"
          variant="contained"
          style={{ margin: 10, position: 'relative', float: 'right' }}
          onClick={handleClickOpen}
        >
          Chốt Kỳ
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{'Đóng kỳ giao dịch này?'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Hành động này sẽ đóng kỳ giao dịch này, các số dư cuối kỳ sẽ tự động chuyển sang số dư
              đầu kỳ mới.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Hủy Bỏ
            </Button>
            <Button onClick={handelSubmit} color="secondary" autoFocus>
              Đã hiểu
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
  return <CircularProgress />;
}
