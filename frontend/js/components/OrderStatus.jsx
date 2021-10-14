import React from 'react';
import PropTypes from 'prop-types';
import { Chip } from '@material-ui/core';

function OrderStatus(props) {
  const { date_flight, date_received } = props;
  const status = [];
  if (date_flight == null) {
    status.push(
      <Chip style={{ marginLeft: '10px' }} label="Hàng chưa được gửi" color="primary"></Chip>
    );
  }
  if (date_received == null) {
    status.push(
      <Chip style={{ marginLeft: '10px' }} label="Chưa nhận được hàng" color="secondary"></Chip>
    );
  }
  if (date_flight && date_received) {
    status.push(<Chip style={{ marginLeft: '10px', color: '#79ec79' }} label="Hoàn thành"></Chip>);
  }

  return status.map((s, idx) => <span key={idx}>{s}</span>);
}

OrderStatus.propTypes = {
  date_flight: PropTypes.string,
  date_received: PropTypes.string,
};

export default OrderStatus;
