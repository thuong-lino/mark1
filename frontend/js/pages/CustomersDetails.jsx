import React, { useState, useEffect } from 'react';
import api from '../store/api';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { useParams } from 'react-router';
import { useSnackbar } from 'notistack';

import { ArrowBack, Edit, Person } from '@material-ui/icons';
import {
  Typography,
  Paper,
  List,
  ListItem,
  Divider,
  Button,
  Grid,
  CircularProgress,
} from '@material-ui/core';

const CustomersDetails = () => {
  const [data, setData] = useState({
    id: null,
    firstname: null,
    lastname: null,
    phone_number: null,
    DOB: null,
    makhachhang: null,
    email: null,
    TIN: null,
    address: null,
    last_transaction: null,
  });
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/api/customers/${id}`);
        setData(res.data);
      } catch (error) {
        enqueueSnackbar('Không tìm thấy khách hàng bạn yêu cầu, vui lòng thử lại', {
          variant: 'error',
        });
      }
    };
    fetchData();
  }, []);
  if (data.id) {
    return (
      <>
        <div>
          <div
            className="backButton"
            onClick={() => {
              dispatch(push('/customers/'));
            }}
          >
            <ArrowBack />
            <Typography compoent="span" variant="body1">
              DS Khách Hàng
            </Typography>
          </div>
        </div>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            {' '}
            <Paper elevation={7} style={{ margin: 'auto' }}>
              <List component="nav">
                <ListItem style={{ justifyContent: 'space-between' }}>
                  <Typography component="span" variant="h5">
                    Thông Tin Khách Hàng
                  </Typography>
                  <Person />
                  {/* <span>
                      <Button>
                        <Edit
                        // onClick={() => {
                        //   setEditDialog(true);
                        // }}
                        />
                      </Button>
                    </span> */}
                </ListItem>
                <Divider />
                <ListItem className="orderDetailListItem">
                  <Typography variant="body1">
                    Họ và tên đệm: <strong>{data.lastname}</strong>
                  </Typography>
                </ListItem>
                <ListItem className="orderDetailListItem">
                  <Typography variant="body1">
                    Tên: <strong>{data.firstname}</strong>
                  </Typography>
                </ListItem>
                <ListItem className="orderDetailListItem">
                  <Typography variant="body1">
                    Số điện thoại: <strong>{data.phone_number}</strong>
                  </Typography>
                </ListItem>
                <ListItem className="orderDetailListItem">
                  <Typography variant="body1">
                    Email liên hệ: <strong>{data.email}</strong>
                  </Typography>
                </ListItem>
                <ListItem className="orderDetailListItem">
                  <Typography variant="body1">
                    Ngày sinh: <strong>{data.DOB}</strong>
                  </Typography>
                </ListItem>
                <ListItem className="orderDetailListItem">
                  <Typography variant="body1">
                    Địa chỉ: <strong>{data.address}</strong>
                  </Typography>
                </ListItem>
                <ListItem className="orderDetailListItem">
                  <Typography variant="body1">
                    Mã số thuế: <strong>{data.TIN}</strong>
                  </Typography>
                </ListItem>
                <ListItem className="orderDetailListItem">
                  <Typography variant="body1">
                    Mã khách hàng: <strong>{data.makhachhang}</strong>
                  </Typography>
                </ListItem>
              </List>
            </Paper>
          </Grid>
          <Grid item xs={8}>
            <Typography component="span"></Typography>
          </Grid>
        </Grid>
      </>
    );
  }
  return <CircularProgress />;
};

export default CustomersDetails;
