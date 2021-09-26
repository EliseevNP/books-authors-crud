/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable max-len */

import { QueryInterface } from 'sequelize';

export = {
  up: (queryInterface: QueryInterface) => queryInterface.bulkInsert('authors', [
    {
      name: 'Михаил',
      second_name: 'Булгаков',
      patronymic: 'Афанасьевич',
    },
    {
      name: 'Николай',
      second_name: 'Гоголь',
      patronymic: 'Васильевич',
    },
    {
      name: 'Илья',
      second_name: 'Ильф',
      patronymic: 'Арнольдович',
    },
    {
      name: 'Евгений',
      second_name: 'Петров',
      patronymic: 'Петрович',
    },
    {
      name: 'Федор',
      second_name: 'Достоевский',
      patronymic: 'Михайлович',
    },
    {
      name: 'Лев',
      second_name: 'Толстой',
      patronymic: 'Николаевич',
    },
  ]),
  down: async (queryInterface: QueryInterface) => {
    const {
      sequence_name: sequenceName,
    } = await queryInterface.sequelize.query(
      "SELECT pg_get_serial_sequence('authors', 'author_id') AS sequence_name",
      { plain: true },
    );

    if (sequenceName) {
      await queryInterface.sequelize.query(
        `ALTER SEQUENCE ${sequenceName} RESTART WITH 1`,
      );
    }

    await queryInterface.bulkDelete('authors', {});
  },
};
