const { Router } = require('express');
const UserController = require('./app/controllers/UserController');
const TaskController = require('./app/controllers/TaskController');
const SessionController = require('./app/controllers/SessionController');

const authMiddleware = require('./app/middlewares/auth');

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.post('/:user_id/tasks', TaskController.store);
routes.get('/:user_id/tasks', TaskController.index);
routes.get('/tasks/:task_id', TaskController.show);
routes.put('/tasks/:task_id', TaskController.update);
routes.delete('/tasks/:task_id', TaskController.destroy);

module.exports = routes;
