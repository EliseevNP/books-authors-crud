/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable max-len */

import { QueryInterface } from 'sequelize';
import { UserRole } from '../../common/enums';

export = {
  up: (queryInterface: QueryInterface) => queryInterface.bulkInsert('users', [
    {
      username: 'MIHAIL_RYBKIN',
      session_key: 'MIHAIL_RYBKIN_SESSION_KEY',
      roles: [UserRole.ADMIN],
    },
    {
      username: 'NIKITA_ELISEEV',
      session_key: 'NIKITA_ELISEEV_SESSION_KEY',
    },
  ]),
  down: async (queryInterface: QueryInterface) => {
    const {
      sequence_name: sequenceName,
    } = await queryInterface.sequelize.query(
      "SELECT pg_get_serial_sequence('users', 'user_id') AS sequence_name",
      { plain: true },
    );

    if (sequenceName) {
      await queryInterface.sequelize.query(
        `ALTER SEQUENCE ${sequenceName} RESTART WITH 1`,
      );
    }

    await queryInterface.bulkDelete('users', {});
  },
};
