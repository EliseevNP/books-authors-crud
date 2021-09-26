import {
  Table,
  Column,
  DataType,
  AllowNull,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';
import BaseModel from './Base.model';
import { UserRole } from '../../common/enums';

@Table({ tableName: 'users' })
export default class User extends BaseModel {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  public userId!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  public username!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  public sessionKey!: string;

  @AllowNull(true)
  @Column(DataType.ARRAY(DataType.STRING))
  public roles!: UserRole[] | null;
}
