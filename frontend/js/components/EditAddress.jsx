import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core/';

function EditAddress(props) {
  const { address, phone, onSave, isOpen, onClose } = props;
  const [data, setData] = useState({
    address: address,
    phone: phone,
  });
  const handleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };
  const handleClose = () => {
    onClose(!isOpen);
  };
  const handleSave = () => {
    onSave(data);
  };
  return (
    <div>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">Chỉnh sửa thông tin liên lạc</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="address"
            value={data.address}
            onChange={handleChange}
            label="Địa chỉ"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="phone"
            value={data.phone}
            onChange={handleChange}
            label="Số điện thoại"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
EditAddress.propTypes = {
  isOpen: PropTypes.bool,
  address: PropTypes.string,
  phone: PropTypes.string,
  onSave: PropTypes.func,
  onClose: PropTypes.func,
};
export default EditAddress;
