import { DataTypes, fn } from 'sequelize';
import dotenv from 'dotenv';

const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';
dotenv.config({ path: envFile });

const {
  MS_CFG_POSTGRES_DB,
  MS_CFG_POSTGRES_USER,
  MS_CFG_POSTGRES_PASSWORD,
  MS_CFG_POSTGRES_HOST,
  MS_CFG_POSTGRES_PORT,
  MS_CFG_PORT,
} = process.env;

export const dbConfig = {
  dialect: 'postgres' as const,
  username: MS_CFG_POSTGRES_USER || ('postgres' as const),
  password: MS_CFG_POSTGRES_PASSWORD || ('postgres' as const),
  database: MS_CFG_POSTGRES_DB || ('postgres' as const),
  host: MS_CFG_POSTGRES_HOST || ('localhost' as const),
  port: MS_CFG_POSTGRES_PORT ? parseInt(MS_CFG_POSTGRES_PORT) : (5432 as const),
};

export const baseDictionaryFields = {
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: fn('NOW'),
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: fn('NOW'),
  },
  deleted_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
};

export const appConfig = {
  port: MS_CFG_PORT || 3000,
};
