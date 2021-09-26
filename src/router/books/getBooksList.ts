import { Context } from 'koa';
import { GetBooksListParams } from '../../schemes/books';
import Book from '../../db/models/Book.model';

export default async (ctx: Context): Promise<void> => {
  const getBookListParams: GetBooksListParams = ctx.query;
  const totalItems = await Book.count({
    distinct: true,
    col: Book.primaryKeyAttribute,
  });
  const booksList = await Book.findAll({
    limit: getBookListParams.pageSize,
    offset: (getBookListParams.page - 1) * getBookListParams.pageSize,
    include: { all: true },
  });

  ctx.body = {
    data: {
      list: booksList,
      pagination: {
        page: getBookListParams.page,
        pageSize: getBookListParams.pageSize,
        totalItems,
        totalPages: Math.ceil(totalItems / getBookListParams.pageSize),
      },
    },
  };
};
