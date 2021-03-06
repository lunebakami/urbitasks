require('dotenv/config');

module.exports = {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  dialectOptions: {
    ssl: {
      require: process.env.SSL,
      rejectUnauthorized: false,
    },
  },
  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true,
  },
};
