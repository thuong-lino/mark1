import { ArrowBack, Edit } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import {
  Paper,
  TableCell,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  Table,
  Grid,
  CircularProgress,
  ListItem,
  List,
  Typography,
  Divider,
  Button,
  TextField,
} from '@material-ui/core';
import { useParams } from 'react-router';
import api from '../store/api';
import { useSnackbar } from 'notistack';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import OrderStatus from '../components/OrderStatus';
import EditAddress from '../components/EditAddress';
import EditDateOrder from '../components/EditStatusOrder';

const date = new Date();
const month = date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth();
const today = date.getFullYear() + '-' + month + '-' + date.getDate();

export default function OrderDetail() {
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const [editDialog, setEditDialog] = useState(false);
  const [editDateOrderDialog, setDateOrderDialog] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  let { id } = useParams();
  useEffect(() => {
    const order_id = id;
    const getOrderDetail = async () => {
      try {
        const res = await api.get(`/api/orders/${order_id}`);
        setData(res.data);
      } catch (error) {
        if (error.response.data) {
          enqueueSnackbar(error.response.data.detail, { variant: 'error' });
        }
        //
      }
    };
    getOrderDetail();
  }, []);
  const handleSave = async (editedAddress) => {
    try {
      await api.patch(`/api/orders/${id}/`, { ...editedAddress });

      setData({ ...data, address: editedAddress.address, phone: editedAddress.phone });
      enqueueSnackbar('Lưu thành công', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Oppps! Lỗi', { variant: 'error' });
    }
  };
  const handleDateOrderSave = async (editedDate) => {
    try {
      await api.patch(`/api/orders/${id}/`, { ...editedDate });

      setData({
        ...data,
        date_flight: editedDate.date_flight,
        date_received: editedDate.date_received,
      });
      enqueueSnackbar('Lưu thành công', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Oppps! Lỗi', { variant: 'error' });
    }
  };
  const handleCloseDialog = (isOpen) => {
    setEditDialog(isOpen);
  };
  const handleCloseDateOrderDialog = (isOpen) => {
    setDateOrderDialog(isOpen);
  };
  const handleShortcurtDateFlight = async (e) => {
    const date_flight = e.target.value;
    try {
      await api.patch(`/api/orders/${id}/`, { date_flight: date_flight });

      setData({
        ...data,
        date_flight: date_flight,
      });
      enqueueSnackbar('Lưu thành công', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Oppps! Lỗi', { variant: 'error' });
    }
  };
  const handleShortcurtDateReceived = async () => {
    const date_received = today;
    try {
      await api.patch(`/api/orders/${id}/`, { date_received });

      setData({
        ...data,
        date_received,
      });
      enqueueSnackbar('Lưu thành công', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Oppps! Lỗi', { variant: 'error' });
    }
  };
  if (data) {
    return (
      <>
        <div>
          <div
            className="backButton"
            onClick={() => {
              dispatch(push('/daily/'));
            }}
          >
            <ArrowBack />
            <Typography compoent="span" variant="body1">
              ĐƠN HÀNG
            </Typography>
          </div>
        </div>

        <div className="headerId">
          <Typography variant="h5">
            # {data.id}
            <OrderStatus date_flight={data.date_flight} date_received={data.date_received} />
          </Typography>
        </div>
        <div className="orderDetailDate">
          <Typography variant="body2">{data.date_sent}</Typography>
        </div>

        <Grid container spancing={2} direction="column" justifyContent="space-around" spacing={2}>
          <Grid item xs={12}>
            <Grid item container justifyContent="space-around" spacing={2}>
              <Grid item xs={12} sm={8}>
                <Grid item container spacing={2} direction="row">
                  <Grid item xs={12}>
                    <Paper elevation={7}>
                      <TableContainer>
                        <Table className="orderDetailTable" aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell>Tên hàng</TableCell>
                              <TableCell align="right">ĐVT</TableCell>
                              <TableCell align="right">Số Lương</TableCell>
                              <TableCell align="right">Trọng lượng&nbsp;(Kg)</TableCell>
                              <TableCell align="right">Đơn giá&nbsp;(USD)</TableCell>
                              <TableCell align="right">Thành tiền&nbsp;(USD)</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow key={data.id}>
                              <TableCell component="th" scope="row">
                                {data.item}
                              </TableCell>
                              <TableCell align="right">{data.unit}</TableCell>
                              <TableCell align="right">{data.quantity}</TableCell>
                              <TableCell align="right">{data.weight}</TableCell>
                              <TableCell align="right">{data.unit_price} US$</TableCell>
                              <TableCell align="right">{data.total} US$</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      {data.date_flight ? null : (
                        <TextField
                          id="shortcurt_date_flight"
                          color="primary"
                          variant="outlined"
                          label="Chọn ngày bay"
                          type="date"
                          value={data.date_flight ? data.date_flight : ''}
                          onChange={handleShortcurtDateFlight}
                          style={{ borderBottomColor: '#3f51b5' }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      )}
                      {data.date_received ? null : (
                        <Button
                          variant="outlined"
                          color="secondary"
                          style={{ marginLeft: 10 }}
                          onClick={handleShortcurtDateReceived}
                        >
                          Đã nhận được hàng
                        </Button>
                      )}
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Paper style={{ margin: 'auto' }} elevation={7}>
                  <List component="nav">
                    <ListItem>
                      <Typography variant="h5">Khách hàng</Typography>
                    </ListItem>
                    <Divider />
                    <ListItem className="orderDetailListItem">
                      <Typography variant="body1">{data.customer}</Typography>
                    </ListItem>
                    <ListItem className="orderDetailListItem">
                      <Typography
                        component={Link}
                        to={`/customers/${data.customer[0]}/`}
                        color="primary"
                        variant="body1"
                      >
                        Xem thông tin khách hàng
                      </Typography>
                    </ListItem>
                    <Divider />
                    <ListItem style={{ justifyContent: 'space-between' }}>
                      <Typography component="span" variant="h5">
                        Thông tin liên lạc
                      </Typography>
                      <span>
                        <Button>
                          <Edit
                            onClick={() => {
                              setEditDialog(true);
                            }}
                          />
                        </Button>
                        <EditAddress
                          onSave={handleSave}
                          isOpen={editDialog}
                          onClose={handleCloseDialog}
                          address={data.address}
                          phone={data.phone}
                        />
                      </span>
                    </ListItem>
                    <ListItem className="orderDetailListItem">
                      <Typography variant="body1">{data.address}</Typography>
                    </ListItem>
                    <ListItem className="orderDetailListItem">
                      <Typography variant="body1">{data.phone}</Typography>
                    </ListItem>
                    <Divider />
                    <ListItem style={{ justifyContent: 'space-between' }}>
                      <Typography component="span" variant="h5">
                        Thời gian
                      </Typography>
                      <span>
                        <Button>
                          <Edit
                            onClick={() => {
                              setDateOrderDialog(true);
                            }}
                          />
                        </Button>
                        <EditDateOrder
                          onSave={handleDateOrderSave}
                          isOpen={editDateOrderDialog}
                          onClose={handleCloseDateOrderDialog}
                          date_flight={data.date_flight}
                          date_received={data.date_received}
                        />
                      </span>
                    </ListItem>
                    <ListItem className="orderDetailListItem">
                      <Typography variant="body1">Ngày gửi: {data.date_sent}</Typography>
                    </ListItem>
                    <ListItem className="orderDetailListItem">
                      <Typography variant="body1">Ngày bay: {data.date_flight}</Typography>
                    </ListItem>
                    <ListItem className="orderDetailListItem">
                      <Typography variant="body1">Ngày nhận: {data.date_received}</Typography>
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  }
  return <CircularProgress />;
}
