import React, { Component } from 'react';
import { IconButton, Button, Grid, Typography, TextField } from '@material-ui/core';
import { MyFormControl, MyInput } from './CustomMui';
import { Autocomplete } from '@material-ui/lab';

const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
];
export class AddOrder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: '',
      unit: '',
      quantity: '',
      weight: '',
      quantity: '',
      unit_price: '',
      currency: '',
      date_sent: '',
      customer: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitOrder = this.handleSubmitOrder.bind(this);
  }
  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }
  handleSubmitOrder() {}

  render() {
    const { item, unit, quantity, weight, unit_price, date_sent, customer, currency } = this.state;
    console.log(this.state);
    return (
      <>
        <Grid spacing={1} container>
          <Grid item xs={12}>
            <Typography component="h4" variant="h4">
              Thêm đơn
            </Typography>
          </Grid>
          <Grid item xs={12} className="inputField">
            <MyFormControl>
              <Autocomplete
                id="controled"
                options={top100Films}
                getOptionLabel={(option) => option.title}
                onChange={(e, value) => {
                  this.setState({ customer: value });
                }}
                value={customer}
                style={{ width: 300 }}
                size="small"
                renderInput={(params) => (
                  <TextField {...params} label="customer" variant="outlined" />
                )}
              />
            </MyFormControl>
            <MyFormControl>
              <TextField
                id="item"
                onChange={this.handleChange}
                helperText="Tên hàng"
                value={item}
              />
            </MyFormControl>
            <MyFormControl style={{ width: 75 }}>
              <TextField id="unit" helperText="ĐVT" onChange={this.handleChange} value={unit} />
            </MyFormControl>
            <MyFormControl style={{ width: 75 }}>
              <TextField
                id="quantity"
                onChange={this.handleChange}
                helperText="số lượng"
                value={quantity}
                inputProps={{ style: { textAlign: 'center' }, min: '0', type: 'number' }}
              />
            </MyFormControl>
            <MyFormControl style={{ width: 75 }}>
              <TextField
                id="weight"
                onChange={this.handleChange}
                helperText="Kg"
                value={weight}
                inputProps={{ style: { textAlign: 'center' }, min: '0', type: 'number' }}
              />
            </MyFormControl>
            <MyFormControl style={{ width: 75 }}>
              <TextField
                id="unit_price"
                onChange={this.handleChange}
                helperText="đơn giá"
                value={unit_price}
                inputProps={{ style: { textAlign: 'center' }, min: '0', type: 'number' }}
                InputProps={{ endAdornment: '$' }}
              />
            </MyFormControl>
            <MyFormControl style={{ width: 100 }}>
              <TextField
                id="total"
                value={weight * unit_price}
                disabled
                helperText="thành tiền"
                inputProps={{ style: { textAlign: 'center' }, min: '0', type: 'number' }}
              />
            </MyFormControl>
          </Grid>

          <Grid item xs={12} className="sendOrderField">
            <Button
              variant="outlined"
              className="sendOrderItem"
              color="primary"
              onClick={this.handleSubmitOrder}
            >
              Tạo
            </Button>
          </Grid>
        </Grid>
      </>
    );
  }
}

export default AddOrder;
