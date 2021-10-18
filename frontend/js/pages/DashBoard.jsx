import React, { useState, useEffect } from 'react';
import api from '../store/api';
import { useSnackbar } from 'notistack';

// mui
import { CircularProgress, Grid, Paper, Typography } from '@material-ui/core';
import {
  TrendingDown,
  TrendingUp,
  AttachMoney,
  ShoppingCart,
  ShopTwoOutlined,
} from '@material-ui/icons';
import Chart from '../components/Chart';
const DashBoard = () => {
  const [data, setData] = useState({
    orders_today: null,
    orders_yesterday: null,
    order_rate: null,
    amount_today: null,
    amount_yesterday: null,
    amount_rate: null,
    orders_in_month: null,
    orders_in_previous_month: null,
    order_month_rate: null,
    monthly: null,
  });
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/api/orders/statistics/');
        setData(res.data);
      } catch (error) {
        enqueueSnackbar('Có lỗi không mong muốn, vui lòng thử lại sau', { variant: 'error' });
      }
    };
    fetchData();
  }, []);
  if (data.monthly) {
    const orderUp = data.orders_today >= data.orders_yesterday;
    const amountUp = data.amount_today >= data.amount_yesterday;
    const orderMonthUp = data.orders_in_month >= data.orders_in_previous_month;
    return (
      <>
        <Grid container spacing={2} direction="column">
          <Grid item xs={12}>
            <Grid item container direction="row" spacing={8} justifyContent="space-evenly">
              <Grid item xs={12} sm={4}>
                <Paper style={{ margin: 'auto', padding: 20 }} elevation={7}>
                  <div className="WidgetDashboar">
                    <div className="HeaderWidgetDashboard">
                      <Typography component="span" variant="overline">
                        Số đơn hôm nay
                      </Typography>
                      <ShoppingCart fontSize="large" color="primary" />
                    </div>
                    <div>
                      <Typography component="span" variant="h3">
                        {data.orders_today}
                      </Typography>
                    </div>
                    <div className={`FooterWidgetDashboard ${orderUp ? 'stonks' : 'stinks'}`}>
                      <Typography component="span" variant="body1">
                        {data.order_rate}%
                      </Typography>
                      {orderUp ? <TrendingUp /> : <TrendingDown />}
                    </div>
                    <Typography component="span" variant="overline">
                      Số đơn hôm qua: {<strong>{data.orders_yesterday} </strong>}
                    </Typography>
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Paper style={{ margin: 'auto', padding: 20 }} elevation={7}>
                  <div className="WidgetDashboar">
                    <div className="HeaderWidgetDashboard">
                      <Typography component="span" variant="overline">
                        Tổng tiền hàng hôm nay
                      </Typography>
                      <AttachMoney fontSize="large" color="primary" />
                    </div>
                    <div>
                      <Typography component="span" variant="h3">
                        {data.amount_today} US$
                      </Typography>
                    </div>
                    <div className={`FooterWidgetDashboard ${amountUp ? 'stonks' : 'stinks'}`}>
                      <Typography component="span" variant="body1">
                        {data.amount_rate}%
                      </Typography>
                      {amountUp ? <TrendingUp /> : <TrendingDown />}
                    </div>
                    <Typography component="span" variant="overline">
                      Tổng tiền hôm qua:{' '}
                      {<strong>{data.amount_yesterday ? data.amount_yesterday : 0} </strong>}
                    </Typography>
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Paper style={{ margin: 'auto', padding: 20 }} elevation={7}>
                  <div className="WidgetDashboar">
                    <div className="HeaderWidgetDashboard">
                      <Typography component="span" variant="overline">
                        Tổng đơn tháng này
                      </Typography>
                      <ShopTwoOutlined fontSize="large" color="primary" />
                    </div>
                    <div>
                      <Typography component="span" variant="h3">
                        {data.orders_in_month}
                      </Typography>
                    </div>
                    <div className={`FooterWidgetDashboard ${orderMonthUp ? 'stonks' : 'stinks'}`}>
                      <Typography component="span" variant="body1">
                        {data.order_month_rate}%
                      </Typography>
                      {orderMonthUp ? <TrendingUp /> : <TrendingDown />}
                    </div>
                    <Typography component="span" variant="overline">
                      Số đơn tháng trước: {<strong>{data.orders_in_previous_month} </strong>}
                    </Typography>
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" style={{ margin: 10 }}>
              Tổng lượng đơn trong tháng
            </Typography>
            <Chart data={data.monthly} />
          </Grid>
        </Grid>
      </>
    );
  }
  return <CircularProgress />;
};

export default React.memo(DashBoard);
