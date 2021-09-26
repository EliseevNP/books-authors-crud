import { QueryInterface, DataTypes } from 'sequelize';
import { baseDictionaryFields } from '../../common/constants';

module.exports = {
  up: (queryInterface: QueryInterface) => queryInterface.createTable('authors', {
    author_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    second_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    patronymic: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ...baseDictionaryFields,
  }),
  down: (queryInterface: QueryInterface) => queryInterface.dropTable('authors'),
};
