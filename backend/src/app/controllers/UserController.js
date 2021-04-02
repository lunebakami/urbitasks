const Yup = require('yup');
const User = require('../models/User');

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    try {
      const { id, name, email } = await User.create(req.body);

      return res.json({
        id,
        name,
        email,
      });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  async show(req, res) {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(400).json({ error: "User doesn't exists" });
    }

    return res.json({
      name: user.name,
      email: user.email,
    });
  }
}

module.exports = new UserController();
