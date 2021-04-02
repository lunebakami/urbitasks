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

import { useAuth } from '../../context/auth';
import api from '../../services/api';
import Error from '../../components/Error';

const useStyles = makeStyles(() => ({
  button: {
    backgroundColor: '#F74545',
    fontWeight: 'bold',
    height: '50px',
    color: 'white !important',
    '&:hover': {
      backgroundColor: '#532458 !important',
    },
  },
  form: {
    marginBottom: '10px',
  },
  card: {
    margin: '200px 500px',
    padding: '50px',
    display: 'grid',
    alignItems: 'space-around',
  },
  error: {
    textAlign: 'center',
    marginBottom: '15px',
    marginTop: '-20px',
  },
}));

function Register() {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const [isError, setIsError] = useState(false);
  const [error, setError] = useState('');
  const { setAuthTokens } = useAuth();

  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post('/users', {
        name,
        email,
        password,
      });

      if (response.status === 200) {
        const result = await api.post('/sessions', { email, password });

        if (result.status === 200) {
          localStorage.setItem('userId', result.data.user.id);
          setAuthTokens(result.data.token);
          history.push('/dashboard');
        }
      }
    } catch (err) {
      setIsError(true);
      setError(err.response.data.error || 'Error');
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
          <InputLabel htmlFor="component-outlined-name">Name</InputLabel>
          <OutlinedInput
            id="component-outlined-name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            label="Name"
          />
        </FormControl>
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
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            label="Password"
          />
        </FormControl>
        <Button
          onClick={(e) => {
            handleLogin(e);
          }}
          className={classes.button}
        >
          REGISTRAR
        </Button>
      </Card>
    </>
  );
}

export default Register;
