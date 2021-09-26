import { Context } from 'koa';
import { GetAuthorByIdParams } from '../../schemes/authors';
import Author from '../../db/models/Author.model';

export default async (ctx: Context): Promise<void> => {
  const getAuthorById: GetAuthorByIdParams = ctx.params;
  const author = await Author.findByPk(getAuthorById.authorId, {
    include: { all: true },
  });

  ctx.body = { data: author };
};
