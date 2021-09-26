import { Transaction } from 'sequelize';
import {
  Table,
  Column,
  DataType,
  AllowNull,
  PrimaryKey,
  AutoIncrement,
  BelongsToMany,
} from 'sequelize-typescript';
import BaseModel from './Base.model';
import Book from './Book.model';
import BookAuthor from './BookAuthor.model';

@Table({ tableName: 'authors' })
export default class Author extends BaseModel {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  public authorId!: number;

  @AllowNull(true)
  @Column(DataType.STRING)
  public name!: string | null;

  @AllowNull(true)
  @Column(DataType.STRING)
  public secondName!: string | null;

  @AllowNull(true)
  @Column(DataType.STRING)
  public patronymic!: string | null;

  @BelongsToMany(() => Book, () => BookAuthor)
  public books!: Array<Book & { BookAuthor: BookAuthor }>;

  async setBooks(bookIds: number[], transaction: Transaction): Promise<void> {
    await BookAuthor.destroy({
      where: { authorId: this.authorId },
      transaction,
    });

    await BookAuthor.bulkCreate(
      bookIds.map((bookId) => ({
        authorId: this.authorId,
        bookId,
      })),
      { transaction },
    );

    await this.reload({
      include: { association: 'books' },
      transaction,
    });
  }
}
