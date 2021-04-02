import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { Card, IconButton, Button, makeStyles } from '@material-ui/core';
import { Delete } from '@material-ui/icons';

import { useAuth } from '../../context/auth';
import api from '../../services/api';
import BackButton from '../../components/BackButton';

const useStyles = makeStyles((theme) => ({
  list: {
    backgroundColor: theme.palette.background.paper,
  },
  card: {
    marginTop: '100px',
    marginLeft: '25%',
    marginRight: '25%',
    padding: '20px 50px',
    textAlign: 'center',
    width: '50%',
    display: 'flex',
    justifyContent: 'space-between',
    flexGrow: 1,
  },
  name: {
    textAlign: 'start',
    width: '500px',
    maxWidth: '500px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  description: {
    textAlign: 'start',
    color: '#6c757d',
    maxWidth: '500px',
  },
  actions: {
    alignSelf: 'center',
    marginRight: '-250px',
  },
  error: {
    position: 'relative',
    paddingLeft: '41%',
    textAlign: 'center',
    marginBottom: '15px',
  },
  grid: {
    display: 'grid',
    alignItems: 'center',
    paddingRight: '400px',
    marginLeft: '20px',
    width: '40%',
    overflowWrap: 'break-word',
    wordWrap: 'break-word',
    hyphens: 'auto',
  },
  completeBtn: {
    backgroundColor: '#643368',
    color: 'white',
    '&:hover': {
      backgroundColor: '#8782D6',
    },
  },
  completedBtn: {
    backgroundColor: '#43aa8b',
    color: 'white !important',
  },
  deleteBtn: {
    alignSelf: 'center',
  },
  backDiv: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingRight: '25%',
    marginTop: '5px',
  },
  backSpan: {
    backgroundColor: 'white',
    padding: '5px',
    borderRadius: '4px',
  },
}));

function Task() {
  const { id } = useParams();
  const [task, setTask] = useState({});
  const { authTokens } = useAuth();
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState('');

  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    async function getTask(taskId) {
      const result = await api.get(`/tasks/${taskId}`, {
        headers: {
          Authorization: authTokens,
        },
      });
      setTask(result.data);
    }

    getTask(id);
  }, []);

  async function handleDelete(taskId) {
    try {
      const result = await api.delete(`/tasks/${taskId}`, {
        headers: {
          Authorization: authTokens,
        },
      });

      if (result.status === 200) {
        history.push('/dashboard');
      }
    } catch (err) {
      setError(err.response.data.error);
      setIsError(true);
    }
  }

  async function changeStatus(taskId) {
    try {
      const result = await api.put(
        `/tasks/${taskId}`,
        {
          status: true,
        },
        {
          headers: {
            Authorization: authTokens,
          },
        }
      );

      if (result.status === 200) {
        setTask({ ...task, status: result.data });
      }
    } catch (err) {
      setError(err.response.data.error);
      setIsError(true);
    }
  }

  return (
    <div>
      <Card className={classes.card}>
        <div className={classes.grid}>
          <span className={classes.name}>
            <h2>{task.name}</h2>
          </span>
          <span className={classes.description}>{task.description}</span>
        </div>
        <div className={classes.actions}>
          {task.status ? (
            <Button
              onClick={() => {
                changeStatus(id);
              }}
              className={classes.completedBtn}
              disabled
            >
              Completed
            </Button>
          ) : (
            <Button
              onClick={() => {
                changeStatus(id);
              }}
              className={classes.completeBtn}
            >
              To do
            </Button>
          )}
        </div>
        <div className={classes.deleteBtn}>
          <IconButton
            onClick={() => {
              handleDelete(id);
            }}
            edge="end"
            aria-label="delete"
          >
            <Delete />
          </IconButton>
        </div>
      </Card>
      <div className={classes.backDiv}>
        <span className={classes.backSpan}>
          <BackButton />
        </span>
      </div>
    </div>
  );
}

export default Task;
