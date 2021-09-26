import { Context } from 'koa';
import { GetBookByIdParams } from '../../schemes/books';
import Book from '../../db/models/Book.model';

export default async (ctx: Context): Promise<void> => {
  const getBookByIdParams: GetBookByIdParams = ctx.params;
  const book = await Book.findByPk(getBookByIdParams.bookId, {
    include: { all: true },
  });

  ctx.body = { data: book };
};
