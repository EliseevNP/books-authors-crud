import { QueryInterface, DataTypes } from 'sequelize';
import { baseDictionaryFields } from '../../common/constants';

module.exports = {
  up: (queryInterface: QueryInterface) => queryInterface.createTable('users', {
    user_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    session_key: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roles: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    ...baseDictionaryFields,
  }),
  down: (queryInterface: QueryInterface) => queryInterface.dropTable('users'),
};
