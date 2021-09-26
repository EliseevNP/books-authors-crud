import {
  Table,
  Column,
  DataType,
  ForeignKey,
  Model,
} from 'sequelize-typescript';
import Book from './Book.model';
import Author from './Author.model';

@Table({
  tableName: 'books_authors',
  underscored: true,
  timestamps: false,
  paranoid: false,
})
export default class BookAuthor extends Model {
  @ForeignKey(() => Book)
  @Column(DataType.INTEGER)
  bookId!: number;

  @ForeignKey(() => Author)
  @Column(DataType.INTEGER)
  authorId!: number;
}
