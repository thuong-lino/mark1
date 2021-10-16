import React, { Component } from 'react';
import Topbar from '../components/Topbar';
import { connect } from 'react-redux';
import { creators } from '../store/customers';
import { creators as authCreators } from '../store/auth';
import { Link } from 'react-router-dom';

import './layout.css';
import {
  Description,
  Equalizer,
  PermIdentity,
  ShoppingCart,
  Today,
  TrendingUp,
} from '@material-ui/icons';
class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const { getCustomers, doLogout, autoLogin } = this.props;
    const user = JSON.parse(localStorage.getItem('user'));
    getCustomers(); // common used
    autoLogin(user);
  }
  render() {
    const { pathname, doLogout } = this.props;
    return (
      <div>
        <Topbar doLogout={doLogout} />
        <div className="container">
          <div className="sidebar">
            <div className="sidebarWrapper">
              <ul className="sidebarList">
                <li className="sidebarListItem">
                  <Equalizer className="sidebarIcon" /> Biểu đồ
                </li>
                <Link to="/statements/" className="link">
                  <li className={`sidebarListItem ${pathname == '/statements/' ? 'active' : ''}`}>
                    <Description className="sidebarIcon" />
                    Tổng hợp công nợ
                  </li>
                </Link>
                <Link to="/daily/" className="link">
                  <li className={`sidebarListItem ${pathname == '/daily/' ? 'active' : ''}`}>
                    <Today className="sidebarIcon" />
                    Phát sinh hằng ngày
                  </li>
                </Link>
                <Link to="/orders/" className="link">
                  <li className={`sidebarListItem ${pathname == '/orders/' ? 'active' : ''}`}>
                    <ShoppingCart className="sidebarIcon" /> Tìm đơn hàng
                  </li>
                </Link>
                <Link to="/customers/" className="link">
                  <li className={`sidebarListItem ${pathname == '/customers/' ? 'active' : ''}`}>
                    <PermIdentity className="sidebarIcon" />
                    Khách hàng
                  </li>
                </Link>
                <li className={`sidebarListItem ${pathname == '/analyst/' ? 'active' : ''}`}>
                  <TrendingUp className="sidebarIcon" />
                  Phân tích
                </li>
              </ul>
            </div>
          </div>
          <div className="mainPage">{this.props.children}</div>
        </div>
      </div>
    );
  }
}
const mstp = (state) => {
  return {
    customers: state.customers.customers,
    pathname: state.router.location.pathname,
  };
};
const mdtp = (dispatch) => {
  return {
    getCustomers: () => {
      dispatch(creators.getCustomers());
    },
    autoLogin: (user) => {
      dispatch({ type: 'LOGIN_SUCCESS', user });
    },
    doLogout: () => {
      dispatch(authCreators.doLogout());
    },
  };
};
export default connect(mstp, mdtp)(Layout);
