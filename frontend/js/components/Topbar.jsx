import React from 'react';
import { NotificationsNone, Settings, ExitToApp } from '@material-ui/icons';
import { Link, useHistory } from 'react-router-dom';

export default function Topbar(props) {
  const { doLogout, push } = props;
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
            <a href="/admin/" className="link">
              {' '}
              <Settings />
            </a>
          </div>
          <div className="topbarIconContainer">
            <ExitToApp className="topbarIcon" onClick={doLogout} />
          </div>
        </div>
      </div>
    </div>
  );
}
