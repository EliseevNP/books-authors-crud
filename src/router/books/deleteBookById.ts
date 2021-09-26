import { Context } from 'koa';
import { DeleteBookByIdParams } from '../../schemes/books';
import Book from '../../db/models/Book.model';
import BookAuthor from '../../db/models/BookAuthor.model';
import sequelize from '../../db/sequelize';

export default async (ctx: Context): Promise<void> => {
  const deleteBookParams: DeleteBookByIdParams = ctx.params;

  let deletedRowsNumber = 0;

  const transaction = await sequelize.transaction();

  try {
    [deletedRowsNumber] = await Promise.all([
      Book.destroy({ where: { bookId: deleteBookParams.bookId }, transaction }),
      BookAuthor.destroy({ where: { bookId: deleteBookParams.bookId } }),
    ]);

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }

  ctx.body = { data: deletedRowsNumber };
};
