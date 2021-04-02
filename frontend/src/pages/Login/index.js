import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Card,
  FormControl,
  OutlinedInput,
  InputLabel,
  Button,
  makeStyles,
} from '@material-ui/core';
import Error from '../../components/Error';

import { useAuth } from '../../context/auth';
import api from '../../services/api';

const useStyles = makeStyles(() => ({
  button: {
    backgroundColor: '#F74545',
    marginRight: '10px',
    fontWeight: 'bold',
    height: '50px',
    color: 'white !important',
    '&:hover': {
      backgroundColor: '#532458 !important',
    },
  },
  card: {
    margin: '200px 500px',
    padding: '50px',
    display: 'grid',
  },
  form: {
    marginBottom: '10px',
  },
  error: {
    textAlign: 'center',
    marginBottom: '15px',
    marginTop: '-20px',
  },
}));

function Login() {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAuthTokens } = useAuth();

  const [isError, setIsError] = useState(false);
  const [error, setError] = useState('');

  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await api.post('/sessions', { email, password });

      if (response.status === 200) {
        localStorage.setItem('userId', response.data.user.id);
        setAuthTokens(response.data.token);
        history.push('/dashboard');
      }
    } catch (err) {
      setError(err.response.data.error);
      setIsError(true);
    }
  }

  return (
    <>
      <Card className={classes.card}>
        {isError && (
          <span className={classes.error}>
            <Error error={error} />
          </span>
        )}
        <FormControl variant="outlined" className={classes.form}>
          <InputLabel htmlFor="component-outlined-email">Email</InputLabel>
          <OutlinedInput
            id="component-outlined-email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            label="Email"
          />
        </FormControl>
        <FormControl variant="outlined" className={classes.form}>
          <InputLabel htmlFor="component-outlined-pass">Password</InputLabel>
          <OutlinedInput
            id="component-outlined-pass"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            label="Password"
          />
        </FormControl>
        <Button
          onClick={(e) => {
            handleSubmit(e);
          }}
          className={classes.button}
        >
          LOGAR
        </Button>
      </Card>
    </>
  );
}

export default Login;
