import React from 'react';
import { LineStyle } from '@material-ui/icons';
export default function Sidebar() {
  return (
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
              <li className="sidebarListItem">
                <LineStyle className="sidebarIcon" />
                Tổng hợp chứng từ phát sinh
              </li>
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
  );
}
