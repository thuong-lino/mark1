import React, { Component } from 'react';
import { Button, TextField, Typography, Grid, MenuItem } from '@material-ui/core';
import { MyFormControl } from './CustomMui';
import { Autocomplete } from '@material-ui/lab';

export class AddTransaction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customer: null,
      amount: '',
      currency: 'USD',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    const { customer, amount, currency } = this.state;
    const { onSubmit } = this.props;
    const transaction = {
      customer_id: customer.id,
      amount,
      currency,
    };
    onSubmit(transaction);
    this.setState({ amount: '' });
  }
  render() {
    const { customer, amount, currency } = this.state;
    const { errors, customers } = this.props;
    const symbol = currency === 'USD' ? '$' : '₫';
    return (
      <Grid spacing={1} container>
        <Grid item xs={12}>
          {errors ? <Typography color="error">{errors} </Typography> : null}
        </Grid>
        <Grid item xs={12}>
          <form onSubmit={this.handleSubmit}>
            <MyFormControl>
              <Autocomplete
                id="customer"
                options={customers ? customers : []}
                getOptionLabel={(option) => option.phone_number + ' ' + option.firstname}
                onChange={(e, value) => {
                  this.setState({ customer: value });
                }}
                value={customer}
                style={{ width: 300 }}
                size="small"
                renderInput={(params) => <TextField {...params} label="Chọn khách hàng" required />}
              />
            </MyFormControl>
            <MyFormControl style={{ bottom: '-12px' }}>
              <TextField
                id="amount"
                required
                onChange={this.handleChange}
                helperText="Số tiền"
                value={amount}
                inputProps={{
                  style: { textAlign: 'center' },
                  min: '0',
                  type: 'number',
                }}
                InputProps={{ endAdornment: symbol }}
              />
            </MyFormControl>
            <MyFormControl>
              <TextField
                id="currencyy"
                className="sendOrderItem"
                value={currency}
                defaultValue="USD"
                style={{ textAlign: 'center' }}
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
            </MyFormControl>

            <MyFormControl style={{ bottom: '-12px' }}>
              <Button type="submit" color="primary" variant="outlined">
                Thêm giao dịch
              </Button>
            </MyFormControl>
          </form>
        </Grid>
      </Grid>
    );
  }
}

export default AddTransaction;
