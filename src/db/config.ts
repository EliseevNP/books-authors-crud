import { dbConfig } from '../common/constants';

module.exports = {
  ...dbConfig,
  seederStorage: 'sequelize',
  migrationStorage: 'sequelize',
  seederStorageTableName: 'BooksAuthorsCrudServiceSeeds',
  migrationStorageTableName: 'BooksAuthorsCrudServiceMigrations',
  logging: false,
  minifyAliases: true,
  define: {
    freezeTableName: true,
  },
  sync: false,
};
