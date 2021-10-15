import React, { useState } from 'react';
import PropTypes from 'prop-types';
//-----mui
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
//-----endMui
function SelectPeriods(props) {
  const { periods, selectedPeriod, onChangeCurrentPeriod } = props;
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    onChangeCurrentPeriod(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <FormControl>
        <InputLabel id="period-select-label">Kỳ hiện tại</InputLabel>
        <Select
          labelId="period-open-select-label"
          id="period-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={selectedPeriod}
          onChange={handleChange}
        >
          {periods.map((period) => {
            const { open_date, close_date, isOpen, id } = period;
            let menuItem = null;
            if (close_date === null) {
              menuItem = (
                <MenuItem
                  key={id}
                  value={id}
                  style={{ fontWeight: 'bold' }}
                >{`${open_date} đến hiện tại`}</MenuItem>
              );
            } else {
              menuItem = (
                <MenuItem key={id} value={id}>{`${open_date} đến ${close_date}`}</MenuItem>
              );
            }
            return menuItem;
          })}
        </Select>
      </FormControl>
    </div>
  );
}

SelectPeriods.propTypes = {
  periods: PropTypes.array,
  selectedPeriod: PropTypes.number,
  onChangeCurrentPeriod: PropTypes.func,
};

export default SelectPeriods;
