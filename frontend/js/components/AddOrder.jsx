import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Typography, TextField, MenuItem, Fab, IconButton } from '@material-ui/core';
import { MyFormControl } from './CustomMui';
import { Autocomplete } from '@material-ui/lab';
import { creators } from '../store/orders';
import api from '../store/api';
import { withSnackbar } from 'notistack';
import { Add } from '@material-ui/icons';
import AddCustomerDialog from '../pages/AddCustomerDialog';
import { symbols } from '../constants';

export class AddOrder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: '',
      unit: '',
      quantity: '',
      weight: '',
      unit_price: '',
      currency: 'GBP',
      customer: null,
      phone: '',
      address: '',
      customerDialogOpen: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitOrder = this.handleSubmitOrder.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }
  handleDialogClose(close) {
    this.setState({ customerDialogOpen: close });
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
    const { user, getOrders, enqueueSnackbar } = this.props;
    console.log(user.user_id);
    const order = {
      user_id: user.user_id,
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
      customerDialogOpen,
    } = this.state;
    const { customers, errors } = this.props;
    const symbol = symbols(currency);
    return (
      <>
        <Grid spacing={1} container>
          <Grid item xs={12}>
            <Typography component="h4" variant="h4">
              Thêm đơn
            </Typography>
          </Grid>
          <form onSubmit={this.handleSubmitOrder}>
            <Grid item xs={12} className="inputField">
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <Fab
                  style={{ marginTop: 5 }}
                  size="small"
                  onClick={() => {
                    this.setState({ customerDialogOpen: true });
                  }}
                >
                  <Add />
                </Fab>

                <AddCustomerDialog open={customerDialogOpen} onClose={this.handleDialogClose} />

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
                      <TextField {...params} margin="none" label="Chọn khách hàng" required />
                    )}
                  />
                </MyFormControl>
              </div>
              .
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
                  helperText="Giá / Kg"
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
                  value={`${Math.round(weight * unit_price * 100) / 100} ${symbol}`}
                  variant="outlined"
                  margin="dense"
                  disabled
                  helperText="Thành tiền"
                  inputProps={{
                    style: { textAlign: 'center', fontWeight: 'bold' },
                    type: 'text',
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
                <MenuItem value="GBP">GBP</MenuItem>
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
    user: state.auth.user,
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
