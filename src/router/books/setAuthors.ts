import { Context } from 'koa';
import { SetAuthorsParams } from '../../schemes/books';
import Book from '../../db/models/Book.model';
import { ClientError } from '../../common/errors';
import sequelize from '../../db/sequelize';

export default async (ctx: Context): Promise<void> => {
  const setAuthorsParams: SetAuthorsParams = ctx.request.body;
  const updatingBook = await Book.findByPk(setAuthorsParams.bookId);

  if (!updatingBook) {
    throw new ClientError('Book not found', 400);
  }

  const transaction = await sequelize.transaction();

  try {
    await updatingBook.setAuthors(setAuthorsParams.authorIds, transaction);
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }

  ctx.body = { data: updatingBook };
};
