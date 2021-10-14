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

function EditDateOrder(props) {
  const { date_flight, date_received, onSave, isOpen, onClose } = props;
  const [data, setData] = useState({
    date_flight: date_flight,
    date_received: date_received,
  });
  const handleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };
  const handleClose = () => {
    onClose(false);
  };
  const handleSave = () => {
    onSave(data);
  };
  return (
    <div>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">Thời gian</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="date_flight"
            value={data.date_flight ? data.date_flight : ''}
            onChange={handleChange}
            helperText="Ngày gửi"
            type="date"
            fullWidth
          />
          <TextField
            margin="dense"
            id="date_received"
            value={data.date_received ? data.date_received : ''}
            onChange={handleChange}
            helperText="Ngày nhận"
            type="date"
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
EditDateOrder.propTypes = {
  isOpen: PropTypes.bool,
  date_flight: PropTypes.string,
  date_received: PropTypes.string,
  onSave: PropTypes.func,
  onClose: PropTypes.func,
};
export default EditDateOrder;
