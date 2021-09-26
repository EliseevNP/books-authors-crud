import {
  Table,
  Model,
  Column,
  AllowNull,
  DataType,
} from 'sequelize-typescript';

@Table({
  underscored: true,
  timestamps: true,
  paranoid: true,
})
export default class BaseModel<
  Attributes = unknown,
  CreationAttributes = unknown,
> extends Model<Attributes, CreationAttributes> {
  @AllowNull(false)
  @Column(DataType.DATE)
  public createdAt!: Date;

  @AllowNull(false)
  @Column(DataType.DATE)
  public updatedAt!: Date;

  @AllowNull(true)
  @Column(DataType.DATE)
  public deletedAt!: Date | null;
}
