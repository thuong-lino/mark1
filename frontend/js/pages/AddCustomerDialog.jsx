import React from 'react';
import PropTypes from 'prop-types';
import api from '../store/api';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { creators } from '../store/customers';
//---mui
import {
  Dialog,
  TextField,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Grid,
  Button,
  Container,
  FormControl,
} from '@material-ui/core/';

function AddCustomerDialog(props) {
  const open = props.open;
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [data, setCustomerData] = React.useState({
    firstname: '',
    lastname: '',
    email: '',
    phone_number: '',
    makhachhang: '',
    DOB: undefined,
    TIN: '',
    address: '',
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setCustomerData({ ...data, [id]: value });
  };

  const handleClose = () => {
    props.onClose(false);
  };
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/customers/', data);
      dispatch(creators.getCustomers());
      enqueueSnackbar('Thêm khách hàng thành công', { variant: 'success' });

      props.onClose(false);
    } catch (error) {
      if (error !== undefined) {
        const resError = error.response.data;
        const strError = JSON.stringify(resError);
        enqueueSnackbar(strError, { variant: 'error' });
      } else {
        enqueueSnackbar('Ooops! Đã xảy ra lỗi, vui lòng thử lại', { variant: 'error' });
      }
    }
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <form onSubmit={handleSave}>
          <DialogTitle id="form-dialog-title">Thêm khách hàng</DialogTitle>
          <DialogContent>
            <DialogContentText>Vui lòng điền đầy đủ thông tin có chứa dấu *.</DialogContentText>

            <Container>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    id="lastname"
                    variant="filled"
                    margin="dense"
                    autoFocus
                    required
                    value={data.lastname}
                    onChange={handleChange}
                    label="Họ và Tên đệm"
                    type="text"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="firstname"
                    variant="filled"
                    margin="dense"
                    required
                    value={data.firstname}
                    onChange={handleChange}
                    label="Tên"
                    type="text"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    id="phone_number"
                    variant="filled"
                    required
                    value={data.phone_number}
                    onChange={handleChange}
                    label="Số điện thoại"
                    type="text"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="DOB"
                    margin="normal"
                    value={data.DOB}
                    onChange={handleChange}
                    helperText="Ngày sinh"
                    type="date"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="makhachhang"
                    value={data.makhachhang}
                    onChange={handleChange}
                    placeholder="vd: 131, 331, ..."
                    label="Mã khách hàng"
                    type="text"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="TIN"
                    value={data.TIN}
                    onChange={handleChange}
                    label="Mã số thuế"
                    type="number"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="email"
                    value={data.email}
                    onChange={handleChange}
                    label="Email"
                    type="email"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="address"
                    value={data.address}
                    onChange={handleChange}
                    label="Địa chỉ"
                    type="text"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Container>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Hủy bỏ
            </Button>
            <Button type="submit" color="primary">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

AddCustomerDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default AddCustomerDialog;
