import React, { Component } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { connect } from 'react-redux';
import { creators } from '../store/customers';

class Layout extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {
    const { getCustomers } = this.props;
    getCustomers();
  }
  render() {
    return (
      <div>
        <Topbar />
        <div className="container">
          <Sidebar />
          <div className="other">otherpage</div>
        </div>
      </div>
    );
  }
}
const mstp = (state) => {
  return {
    customers: state.customers.customers,
  };
};
const mdtp = (dispatch) => {
  return {
    getCustomers: () => {
      dispatch(creators.getCustomers());
    },
  };
};
export default connect(mstp, mdtp)(Layout);
