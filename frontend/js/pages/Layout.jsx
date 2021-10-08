import React, { Component } from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import Topbar from '../components/topbar/Topbar';
import './layout.css';

export default class Layout extends Component {
  constructor(props) {
    super(props);

    this.state = {};
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
