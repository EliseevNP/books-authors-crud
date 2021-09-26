import { Sequelize } from 'sequelize-typescript';
import { dbConfig } from '../common/constants';

// init sequelize ORM and test connection
const sequelize = new Sequelize({
  ...dbConfig,
  logging: false,
  models: [`${__dirname}/**/*.model.{ts,js}`],
});

sequelize
  .authenticate()
  // eslint-disable-next-line no-console
  .then(() => console.log('Database connection has been established successfully'))
  // eslint-disable-next-line no-console
  .catch((error) => console.error('Unable to connect to the database:', error));

export default sequelize;
