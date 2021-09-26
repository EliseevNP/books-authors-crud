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
import Author from './Author.model';
import BookAuthor from './BookAuthor.model';

@Table({ tableName: 'books' })
export default class Book extends BaseModel {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  public bookId!: number;

  @AllowNull(true)
  @Column(DataType.STRING)
  public title!: string | null;

  @AllowNull(true)
  @Column(DataType.TEXT)
  public annotation!: string | null;

  @BelongsToMany(() => Author, () => BookAuthor)
  public authors!: Array<Author & { BookAuthor: BookAuthor }>;

  async setAuthors(
    authorIds: number[],
    transaction: Transaction,
  ): Promise<void> {
    await BookAuthor.destroy({
      where: { bookId: this.bookId },
      transaction,
    });

    await BookAuthor.bulkCreate(
      authorIds.map((authorId) => ({
        bookId: this.bookId,
        authorId,
      })),
      { transaction },
    );

    await this.reload({
      include: { association: 'authors' },
      transaction,
    });
  }
}
