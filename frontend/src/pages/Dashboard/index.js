import React, { useEffect, useState } from 'react';

import {
  Card,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  IconButton,
} from '@material-ui/core';
import { Delete, Done, Add } from '@material-ui/icons';

import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/auth';
import Error from '../../components/Error';

const useStyles = makeStyles((theme) => ({
  list: {
    backgroundColor: theme.palette.background.paper,
  },
  card: {
    paddingTop: '15px',
    marginTop: '100px',
    marginLeft: '30%',
    width: '670px',
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  item: {
    cursor: 'pointer',
    transition: '0.3s',
    '&:hover': {
      backgroundColor: '#ccc',
    },
  },
  error: {
    position: 'relative',
    paddingLeft: '41%',
    textAlign: 'center',
    marginBottom: '15px',
  },
  grid: {
    marginLeft: '15%',
    marginBottom: '50px',
  },
  gridDiv: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState('');

  const { authTokens } = useAuth();
  const classes = useStyles();
  const history = useHistory();

  async function handleTasks() {
    const userId = localStorage.getItem('userId');

    const result = await api.get(`/${userId}/tasks`, {
      headers: {
        Authorization: authTokens,
      },
    });

    setTasks(result.data);
  }
  useEffect(() => {
    handleTasks();
  }, []);

  function generate(element) {
    return tasks.map((task) =>
      React.cloneElement(element, {
        key: task.id,
        id: task.id,
        name: task.name,
        description: task.description,
        status: task.status,
      })
    );
  }

  async function handleDelete(id) {
    try {
      await api.delete(`/tasks/${id}/`, {
        headers: {
          Authorization: authTokens,
        },
      });

      handleTasks();
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

      handleTasks();
    } catch (err) {
      setError(err.response.data.error);
      setIsError(true);
    }
  }

  function goToTask(id) {
    history.push(`/tasks/${id}`);
  }

  function goToAddTask() {
    history.push('/tasks/add');
  }

  const ListBody = ({ id, name, status }) => (
    <ListItem
      className={classes.item}
      onClick={() => {
        goToTask(id);
      }}
    >
      <ListItemText primary={name} />
      <ListItemSecondaryAction>
        {status ? (
          'Completed'
        ) : (
          <IconButton
            onClick={() => {
              changeStatus(id);
            }}
            edge="end"
            aria-label="done"
          >
            <Done />
          </IconButton>
        )}
        <IconButton
          onClick={() => {
            handleDelete(id);
          }}
          edge="end"
          aria-label="delete"
        >
          <Delete />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );

  return (
    <>
      <Card className={classes.card}>
        {isError && (
          <span className={classes.error}>
            <Error error={error} />
          </span>
        )}
        <Grid item xs={12} md={8} className={classes.grid}>
          <div className={classes.gridDiv}>
            <Typography variant="h6" className={classes.title}>
              Your Tasks
            </Typography>
            <IconButton
              onClick={() => {
                goToAddTask();
              }}
              edge="end"
              aria-label="add"
            >
              <Add />
            </IconButton>
          </div>
          <div className={classes.list}>
            <List>{generate(<ListBody />)}</List>
          </div>
        </Grid>
      </Card>
    </>
  );
}

export default Dashboard;
