import React from 'react';
import { NotificationsNone, Settings, ExitToApp } from '@material-ui/icons';
import { Link, useHistory } from 'react-router-dom';
import api from '../store/api';

export default function Topbar(props) {
  const history = useHistory();
  const { doLogout } = props;
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
            <ExitToApp className="topbarIcon" onClick={doLogout} />
          </div>
        </div>
      </div>
    </div>
  );
}
