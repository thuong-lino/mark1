import React, { Component } from 'react';
import Topbar from '../components/Topbar';
import { connect } from 'react-redux';
import { creators } from '../store/customers';
import { creators as c2 } from '../store/orders';
import { Link } from 'react-router-dom';

import './layout.css';
import { LineStyle } from '@material-ui/icons';
class Layout extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {
    const { getCustomers } = this.props;
    getCustomers();
    this.props.getOrders();
  }
  render() {
    const { pathname } = this.props;
    return (
      <div>
        <Topbar />
        <div className="container">
          <div className="sidebar">
            <div className="sidebarWrapper">
              <div className="sidebarMenu">
                <h3 className="sidebarTitle">
                  Dashboard
                  <ul className="sidebarList">
                    <li className="sidebarListItem">
                      <LineStyle className="sidebarIcon" /> Biểu đồ
                    </li>
                    <li className="sidebarListItem">
                      <LineStyle className="sidebarIcon" />
                      Tổng hợp công nợ
                    </li>
                    <Link to="/daily/" className="link">
                      <li className={`sidebarListItem ${pathname == '/daily/' ? 'active' : ''}`}>
                        <LineStyle className="sidebarIcon" />
                        Tổng hợp chứng từ phát sinh
                      </li>
                    </Link>
                    <li className="sidebarListItem">
                      <LineStyle className="sidebarIcon" />
                      Phân tích
                    </li>
                  </ul>
                </h3>
              </div>
              <div className="sidebarMenu">
                <h3 className="sidebarTitle">
                  Đơn Hàng
                  <ul className="sidebarList">
                    <li className="sidebarListItem">
                      <LineStyle className="sidebarIcon" /> Hàng Đi / Hàng Đến
                    </li>
                    <li className="sidebarListItem">
                      <LineStyle className="sidebarIcon" />
                      Gửi hàng / Trả tiền
                    </li>
                  </ul>
                </h3>
              </div>
              <div className="sidebarMenu">
                <h3 className="sidebarTitle">
                  Khách hàng
                  <ul className="sidebarList">
                    <li className="sidebarListItem">
                      <LineStyle className="sidebarIcon" />
                      Thông tin
                    </li>
                  </ul>
                </h3>
              </div>
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
    getOrders: () => {
      dispatch(c2.getOrders());
    },
  };
};
export default connect(mstp, mdtp)(Layout);
