import { Context } from 'koa';
import {
  UpdateBookByIdParams,
  UpdateBookByIdBodyParams,
} from '../../schemes/books';
import Book from '../../db/models/Book.model';
import { ClientError } from '../../common/errors';

export default async (ctx: Context): Promise<void> => {
  const updateBookParams: UpdateBookByIdParams = ctx.params;
  const updateBookBodyParams: UpdateBookByIdBodyParams = ctx.request.body;
  const updatingBook = await Book.findByPk(updateBookParams.bookId, {
    include: { all: true },
  });

  if (!updatingBook) {
    throw new ClientError('Book not found', 400);
  }

  await updatingBook.update(updateBookBodyParams);

  ctx.body = { data: updatingBook };
};
