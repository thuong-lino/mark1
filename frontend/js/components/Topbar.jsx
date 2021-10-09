import React from 'react';
import { NotificationsNone, Settings, ExitToApp } from '@material-ui/icons';
import './topbar.css';
import { Link } from 'react-router-dom';
import api from '../store/api';

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarWarpper">
        <div className="topLeft">
          <Link to="/" className="link">
            {' '}
            <span className="logo">MARK1</span>
          </Link>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <div className="topbarIconContainer">
            <ExitToApp className="topbarIcon" onClick={() => api.post('/rest-auth/logout/')} />
          </div>
        </div>
      </div>
    </div>
  );
}
