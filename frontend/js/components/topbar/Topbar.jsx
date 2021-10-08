import React from 'react';
import './topbar.css';
import { NotificationsNone, Settings, ExitToApp } from '@material-ui/icons';
export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarWarpper">
        <div className="topLeft">
          <span className="logo">MARK1</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <div className="topbarIconContainer">
            <ExitToApp className="topbarIcon" />
          </div>
        </div>
      </div>
    </div>
  );
}
