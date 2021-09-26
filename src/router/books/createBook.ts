import { Context } from 'koa';
import { CreateBookParams } from '../../schemes/books';
import Book from '../../db/models/Book.model';

export default async (ctx: Context): Promise<void> => {
  const createBookParams: CreateBookParams = ctx.request.body;
  const createdBook = await Book.create(createBookParams);

  ctx.body = { data: createdBook };
};
