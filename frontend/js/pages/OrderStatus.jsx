import { CircularProgress, IconButton, InputAdornment, TextField } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { Grid } from '@material-ui/core';
import React, { useState } from 'react';
import { creators } from '../store/orders';

export default function OrderStatus() {
  const [value, setValue] = useState('');
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleKeyDown = (e) => {
    if (e.keyCode == 13) {
      console.log('press enter');
    }
  };
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <>
      <Grid container spacing={2} style={{ margin: '10px' }}>
        <Grid item xs={12}>
          <TextField
            label="Tìm kiếm đơn hàng (id)"
            placeholder="VD: 1,2,3"
            variant="filled"
            style={{ width: '40%' }}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <IconButton style={{ top: '-5px' }}>
                    <Search></Search>
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12}>
          {loading ? <CircularProgress /> : <TextField defaultValue="something" />}
        </Grid>
      </Grid>
    </>
  );
}
