import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: (queryInterface: QueryInterface) => queryInterface.createTable('books_authors', {
    book_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    author_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  }),
  down: (queryInterface: QueryInterface) => queryInterface.dropTable('books_authors'),
};
