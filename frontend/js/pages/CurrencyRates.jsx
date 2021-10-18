import React from 'react';
import { Typography, List, ListItem, Button, CircularProgress } from '@material-ui/core';

export default function CurrencyRates(props) {
  const { VND, EUR, GBP, updateRatesClicked, updating } = props;

  if ((VND, EUR, GBP)) {
    return (
      <List>
        <ListItem>
          <Typography>BASE: USD</Typography>
        </ListItem>
        <ListItem>
          <Typography>
            GBP:{' '}
            <Typography component="span" color="secondary">
              {GBP}
            </Typography>
          </Typography>
        </ListItem>
        <ListItem>
          <Typography>
            VND:{' '}
            <Typography component="span" color="secondary">
              {VND}
            </Typography>
          </Typography>
        </ListItem>
        <ListItem>
          <Typography>
            EUR:{' '}
            <Typography component="span" color="secondary">
              {EUR}
            </Typography>
          </Typography>
        </ListItem>
        <ListItem>
          <Button color="primary" variant="contained" fullWidth onClick={updateRatesClicked}>
            {updating ? <CircularProgress size={20} /> : 'Cập nhật'}
          </Button>
        </ListItem>
        <div style={{ margin: 2, fontSize: 10 }}>
          *Lưu ý cập nhật mỗi ngày không quá <br /> <strong style={{ fontSize: 17 }}> 30 </strong>{' '}
          lần
        </div>
      </List>
    );
  }
  return <Typography style={{ color: 'red' }}>loading</Typography>;
}
