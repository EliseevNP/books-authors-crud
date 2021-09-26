import { Context } from 'koa';
import { GetAuthorsListParams } from '../../schemes/authors';
import Author from '../../db/models/Author.model';

export default async (ctx: Context): Promise<void> => {
  const getAuthorListParams: GetAuthorsListParams = ctx.query;
  const totalItems = await Author.count({
    distinct: true,
    col: Author.primaryKeyAttribute,
  });
  const authorsList = await Author.findAll({
    limit: getAuthorListParams.pageSize,
    offset: (getAuthorListParams.page - 1) * getAuthorListParams.pageSize,
    include: { all: true },
  });

  ctx.body = {
    data: {
      list: authorsList,
      pagination: {
        page: getAuthorListParams.page,
        pageSize: getAuthorListParams.pageSize,
        totalItems,
        totalPages: Math.ceil(totalItems / getAuthorListParams.pageSize),
      },
    },
  };
};
