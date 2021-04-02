const Sequelize = require("sequelize");
const User = require("../app/models/User");
const Task = require("../app/models/Task");

const databaseConfig = require("../config/database");

const models = [User, Task];

class Database {
  constructor() {
    this.init();
  }

  async init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

module.exports = new Database();
