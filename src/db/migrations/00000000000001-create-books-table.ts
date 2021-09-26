import { QueryInterface, DataTypes } from 'sequelize';
import { baseDictionaryFields } from '../../common/constants';

module.exports = {
  up: (queryInterface: QueryInterface) => queryInterface.createTable('books', {
    book_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    annotation: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    ...baseDictionaryFields,
  }),
  down: (queryInterface: QueryInterface) => queryInterface.dropTable('books'),
};
