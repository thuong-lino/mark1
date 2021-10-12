import React, { useState } from 'react';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { creators } from '../../store/auth';
import { useDispatch, connect } from 'react-redux';
import { Redirect } from 'react-router';
const paperStyle = { padding: 60, height: '70vh', width: 380, margin: '50px auto' };
const avatarStyle = { backgroundColor: '#1bbd7e' };
const btnstyle = { margin: '25px 0' };
class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }
  handleSubmit() {
    const { username, password } = this.state;
    const { doLogin } = this.props;
    doLogin(username, password);
    <Redirect to="/"></Redirect>;
  }
  render() {
    const { username, password } = this.state;
    return (
      <>
        <Grid>
          <Paper elevation={10} style={paperStyle}>
            <Grid align="center">
              <Avatar style={avatarStyle}>
                <LockOutlinedIcon />
              </Avatar>
              <h2>Sign In</h2>
            </Grid>
            <TextField
              autoComplete="off"
              id="username"
              label="Username"
              placeholder="Enter username"
              fullWidth
              required
              value={username}
              onChange={this.handleChange}
            />
            <TextField
              id="password"
              label="Password"
              placeholder="Enter password"
              type="password"
              fullWidth
              required
              onChange={this.handleChange}
              value={password}
            />
            <FormControlLabel
              control={<Checkbox name="checkedB" color="primary" />}
              label="Remember me"
            />
            <Button
              onClick={this.handleSubmit}
              color="primary"
              variant="contained"
              style={btnstyle}
              fullWidth
            >
              Sign in
            </Button>
            <Typography>
              <Link href="#">Forgot password ?</Link>
            </Typography>
            <Typography>
              {' '}
              Do you have an account ?<Link href="#">Sign Up</Link>
            </Typography>
          </Paper>
        </Grid>
      </>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    doLogin: (email, password) => {
      dispatch(creators.getLogin(email, password));
    },
  };
};
export default connect(null, mapDispatchToProps)(Login);
