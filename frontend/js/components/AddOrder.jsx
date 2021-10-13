import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Typography, TextField, MenuItem } from '@material-ui/core';
import { MyFormControl } from './CustomMui';
import { Autocomplete } from '@material-ui/lab';
import { creators } from '../store/orders';
import api from '../store/api';
import { withSnackbar } from 'notistack';

export class AddOrder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: '',
      unit: '',
      quantity: '',
      weight: '',
      unit_price: '',
      currency: 'USD',
      customer: null,
      phone: '',
      address: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitOrder = this.handleSubmitOrder.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }
  async handleSubmitOrder(e) {
    e.preventDefault();
    const {
      item,
      unit,
      quantity,
      weight,
      unit_price,
      customer,
      currency,
      phone,
      address,
    } = this.state;
    const { user_id, getOrders, enqueueSnackbar } = this.props;
    const order = {
      user_id,
      customer_id: customer.id,
      item,
      unit,
      quantity,
      weight,
      unit_price,
      currency,
      phone,
      address,
    };

    try {
      const res = await api.post(`/api/orders/`, order);
      enqueueSnackbar('Thêm đơn hàng thành công', { variant: 'success' });
      this.setState({
        item: '',
        unit: '',
        quantity: '',
        weight: '',
        phone: '',
        address: '',
      });
      getOrders();
    } catch (error) {
      if (error.response) {
        error = error.response.data.msg;
        enqueueSnackbar(error, { variant: 'error' });
      }
    }
  }

  render() {
    const {
      item,
      unit,
      quantity,
      weight,
      unit_price,
      customer,
      currency,
      phone,
      address,
    } = this.state;
    const { customers, errors } = this.props;
    const symbol = currency === 'USD' ? '$' : '₫';
    return (
      <>
        <Grid spacing={1} container>
          <Grid item xs={12}>
            {errors ? <Typography color="error"> {errors.error}</Typography> : null}
          </Grid>

          <Grid item xs={12}>
            <Typography component="h4" variant="h4">
              Thêm đơn
            </Typography>
          </Grid>
          <form onSubmit={this.handleSubmitOrder}>
            <Grid item xs={12} className="inputField">
              <MyFormControl style={{ top: '-12px' }}>
                <Autocomplete
                  id="controled"
                  options={customers ? customers : []}
                  getOptionLabel={(option) => option.phone_number + ' ' + option.firstname}
                  onChange={(e, value) => {
                    this.setState({ customer: value });
                  }}
                  value={customer}
                  style={{ width: 300 }}
                  size="small"
                  renderInput={(params) => (
                    <TextField {...params} label="Chọn khách hàng" required />
                  )}
                />
              </MyFormControl>
              <MyFormControl>
                <TextField
                  id="item"
                  required
                  onChange={this.handleChange}
                  helperText="Tên hàng"
                  value={item}
                />
              </MyFormControl>
              <MyFormControl style={{ width: 75 }}>
                <TextField
                  id="unit"
                  helperText="ĐVT"
                  onChange={this.handleChange}
                  required
                  value={unit}
                />
              </MyFormControl>
              <MyFormControl style={{ width: 75 }}>
                <TextField
                  id="quantity"
                  onChange={this.handleChange}
                  required
                  helperText="số lượng"
                  value={quantity}
                  inputProps={{ style: { textAlign: 'center' }, min: '0', type: 'number' }}
                />
              </MyFormControl>
              <MyFormControl style={{ width: 75 }}>
                <TextField
                  id="weight"
                  required
                  onChange={this.handleChange}
                  helperText="Kg"
                  value={weight}
                  inputProps={{
                    style: { textAlign: 'center' },
                    min: '0',
                    type: 'number',
                    step: 0.01,
                  }}
                />
              </MyFormControl>
              <MyFormControl style={{ width: 100 }}>
                <TextField
                  id="unit_price"
                  required
                  onChange={this.handleChange}
                  helperText="đơn giá"
                  value={unit_price}
                  inputProps={{
                    style: { textAlign: 'center' },
                    min: '0',
                    type: 'number',
                    step: 0.01,
                  }}
                  InputProps={{ endAdornment: symbol }}
                />
              </MyFormControl>
              <MyFormControl style={{ width: 100 }}>
                <TextField
                  id="total"
                  value={Math.round(weight * unit_price * 100) / 100}
                  disabled
                  helperText="thành tiền"
                  inputProps={{
                    style: { textAlign: 'center' },
                    type: 'number',
                  }}
                />
              </MyFormControl>
            </Grid>

            <Grid item xs={12} className="sendOrderField">
              <TextField
                style={{ width: '300px' }}
                id="address"
                className="sendOrderItem"
                helperText="Địa chỉ nhận hàng"
                onChange={this.handleChange}
                value={address}
              />
              <TextField
                id="phone"
                className="sendOrderItem"
                helperText="Số điện thoại"
                onChange={this.handleChange}
                value={phone}
              />
              <TextField
                id="currencyy"
                className="sendOrderItem"
                value={currency}
                defaultValue="USD"
                select
                helperText="Currency"
                onChange={(e) => {
                  this.setState({ currency: e.target.value });
                }}
              >
                <MenuItem id="USD" value="USD">
                  USD
                </MenuItem>
                <MenuItem value="VND">VND</MenuItem>
              </TextField>
              <Button variant="outlined" className="sendOrderItem" color="primary" type="submit">
                Tạo
              </Button>
            </Grid>
          </form>
        </Grid>
      </>
    );
  }
}
const mstp = (state) => {
  return {
    user_id: state.auth.user.user_id,
  };
};
const mdtp = (dispatch) => {
  return {
    getOrders: () => {
      dispatch(creators.getOrders());
    },
  };
};
export default connect(mstp, mdtp)(withSnackbar(AddOrder));
