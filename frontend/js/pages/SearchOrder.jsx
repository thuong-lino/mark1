import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { IconButton, InputAdornment, TextField } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { Grid } from '@material-ui/core';
import { push } from 'connected-react-router';
import api from '../store/api';
import { useSnackbar } from 'notistack';

export default function SearchOrder() {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleKeyDown = (e) => {
    if (e.keyCode == 13) {
      handleSubmit();
    }
  };
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleClick = () => {
    handleSubmit();
  };
  const handleSubmit = async () => {
    try {
      const res = await api.post('/api/orders/search/', { order_id: value });
      if (res.status === 200) {
        dispatch(push(`/orders/${value}`));
      }
    } catch (error) {
      enqueueSnackbar('Không tìm thấy yêu cầu', { variant: 'error' });
    }
  };
  return (
    <>
      <Grid container spacing={2} style={{ margin: '10px' }}>
        <Grid item xs={12}>
          <TextField
            label="Tìm kiếm đơn hàng (id)"
            placeholder="VD: 1001"
            variant="filled"
            style={{ width: '40%' }}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <IconButton style={{ top: '-5px' }} onClick={handleClick}>
                    <Search></Search>
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}
