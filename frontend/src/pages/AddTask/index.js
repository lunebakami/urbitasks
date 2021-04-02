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
import BackButton from '../../components/BackButton';
import Error from '../../components/Error';

import { useAuth } from '../../context/auth';
import api from '../../services/api';

const useStyles = makeStyles(() => ({
  button: {
    marginBottom: '10px',
    backgroundColor: '#F74545',
    fontWeight: 'bold',
    height: '50px',
    color: 'white !important',
    '&:hover': {
      backgroundColor: '#532458 !important',
    },
  },
  error: {
    position: 'relative',
    textAlign: 'center',
    marginTop: '-30px',
    marginBottom: '15px',
  },
  card: {
    margin: '200px 500px',
    padding: '50px',
    display: 'grid',
    alignItems: 'space-around',
  },
  form: { marginBottom: '10px' },
}));

function AddTask() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState('');

  const { authTokens } = useAuth();

  const userId = localStorage.getItem('userId');
  const classes = useStyles();

  const history = useHistory();

  async function handleAdd(e) {
    e.preventDefault();

    try {
      const response = await api.post(
        `/${userId}/tasks`,
        {
          name,
          description,
        },
        {
          headers: {
            Authorization: authTokens,
          },
        }
      );

      if (response.status === 200) {
        history.push('/dashboard');
      }
    } catch (err) {
      setIsError(true);
      setError(err.response.data.error);
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
          <InputLabel htmlFor="component-outlined-description">
            Description
          </InputLabel>
          <OutlinedInput
            id="component-outlined-description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            label="Description"
          />
        </FormControl>
        <Button
          onClick={(e) => {
            handleAdd(e);
          }}
          className={classes.button}
        >
          ADICIONAR
        </Button>
        <BackButton />
      </Card>
    </>
  );
}

export default AddTask;
