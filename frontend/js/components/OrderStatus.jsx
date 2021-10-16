import React from 'react';
import PropTypes from 'prop-types';
import { Chip } from '@material-ui/core';

function SearchOrder(props) {
  const { date_flight, date_received } = props;
  const status = [];
  if (date_flight == null) {
    status.push(<Chip style={{ marginLeft: '10px' }} label="CHƯA ĐƯỢC GỬI" color="primary"></Chip>);
  }
  if (date_received == null) {
    status.push(
      <Chip style={{ marginLeft: '10px' }} label="CHƯA NHẬN ĐƯỢC" color="secondary"></Chip>
    );
  }
  if (date_flight && date_received) {
    status.push(
      <Chip
        style={{ marginLeft: '10px', color: '#ffffff', backgroundColor: '#43a047' }}
        label="HOÀN THÀNH"
      ></Chip>
    );
  }

  return status.map((s, idx) => <span key={idx}>{s}</span>);
}

SearchOrder.propTypes = {
  date_flight: PropTypes.string,
  date_received: PropTypes.string,
};

export default SearchOrder;
