import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CurrencyRates from '../pages/CurrencyRates';
import api from '../store/api';
import { useSnackbar } from 'notistack';

import { Settings, ExitToApp, LocalAtm } from '@material-ui/icons';
import { Popover } from '@material-ui/core';

export default function Topbar(props) {
  const { doLogout } = props;
  const [VND, setVND] = useState(null);
  const [EUR, setEUR] = useState(null);
  const [GBP, setGBP] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const fetchData = async () => {
    try {
      const res = await api.get('/api/payments/currency_rates/');
      const data = res.data;
      setVND(data.VND);
      setEUR(data.EUR);
      setGBP(data.GBP);
    } catch (error) {
      console.log(error);
    }
  };
  const updateRates = async () => {
    try {
      setUpdating(true);
      await api.post('/api/payments/update_rates/');
      setUpdating(false);
      enqueueSnackbar('Cập nhật thành công !', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Cập nhật không thành công, vui lòng đổi API KEY trong admin !', {
        variant: 'error',
      });
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const updateRatesClicked = async () => {
    await updateRates();
    fetchData();
  };

  const open = Boolean(anchorEl);

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
          <div
            className="topbarIconContainer"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
            aria-owns={open ? 'mouse-over-popover' : undefined}
            aria-haspopup="true"
          >
            <LocalAtm />
            <Popover
              //style={{ pointerEvents: 'none' }}
              id="mouse-over-popover"
              open={open}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              onClose={handlePopoverClose}
              disableRestoreFocus
            >
              <CurrencyRates
                VND={VND}
                GBP={GBP}
                EUR={EUR}
                updating={updating}
                updateRatesClicked={updateRatesClicked}
              />
            </Popover>
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
