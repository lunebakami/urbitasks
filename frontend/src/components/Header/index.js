import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
} from '@material-ui/core';

import api from '../../services/api';
import { useAuth } from '../../context/auth';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  button: {
    backgroundColor: '#F74545',
    marginRight: '10px',
    height: '50px',
    width: '90px',
    color: 'white',
  },
  title: {
    flexGrow: 1,
  },
  bar: {
    backgroundImage: 'linear-gradient(to right, #502155, #6C3A6F)',
    height: '100px',
  },
}));

function Header() {
  const history = useHistory();
  const { setAuthTokens, authTokens } = useAuth();
  const classes = useStyles();
  const headerLink = authTokens ? '/dashboard' : '/';

  function logout() {
    api.defaults.headers.common.Authorization = null;
    setAuthTokens();
    localStorage.removeItem('tokens');
    history.push('/');
  }

  return (
    <AppBar position="static">
      <Toolbar className={classes.bar}>
        <Typography variant="h6" className={classes.title}>
          <Link to={headerLink}>URBITASKS</Link>
        </Typography>
        {authTokens ? (
          <Button
            className={classes.button}
            onClick={() => {
              logout();
            }}
          >
            LOGOUT
          </Button>
        ) : (
          <>
            <Link to="login">
              <Button className={classes.button} color="inherit">
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button className={classes.button} color="inherit">
                Sign In
              </Button>
            </Link>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
