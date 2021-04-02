const Yup = require("yup");
const Task = require("../models/Task");

class TaskController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation fails!" });
    }

    const user_id = Number(req.params.user_id);

    if (!user_id) {
      return res.status(400).json({ error: "Validation fails!" });
    }

    const task = {
      name: req.body.name,
      description: req.body.description,
      status: false,
      user_id,
    };

    const taskExists = await Task.findOne({
      where: { name: task.name },
    });

    if (taskExists) {
      return res.status(400).json({ error: "Task already exists." });
    }

    try {
      const { id, name, description, status } = await Task.create(task);

      return res.json({
        id,
        name,
        description,
        status,
      });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  async index(req, res) {
    const { user_id } = req.params;

    const tasks = await Task.findAll({
      where: { user_id },
      order: [["updated_at", "DESC"]],
    });

    return res.json(tasks);
  }

  async show(req, res) {
    const { task_id } = req.params;

    const task = await Task.findByPk(task_id);

    if (!task) {
      return res.status(400).json({ error: "Task doesn't exists" });
    }

    return res.json({
      name: task.name,
      description: task.description,
      status: task.status,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      description: Yup.string(),
      status: Yup.boolean(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation fails!" });
    }

    const task_id = Number(req.params.task_id);

    if (!task_id) {
      return res.status(400).json({ error: "Validation fails!" });
    }

    const { name, description, status } = req.body;

    const editedTask = {
      name,
      description,
      status,
    };

    const task = await Task.findByPk(task_id);

    if (!task) {
      return res.status(400).json({ error: "Task doesn't exists." });
    }

    try {
      task.update({ ...editedTask });

      return res.json({
        name,
        description,
        status,
      });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  async destroy(req, res) {
    const { task_id } = req.params;

    const task = await Task.findByPk(task_id);

    if (!task) {
      return res.status(400).json({ error: "Task doesn't exists" });
    }

    try {
      await task.destroy();

      return res.json({
        success: "Task successfuly deleted!",
      });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
}

module.exports = new TaskController();
