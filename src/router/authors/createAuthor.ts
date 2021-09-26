import { Context } from 'koa';
import { CreateAuthorParams } from '../../schemes/authors';
import Author from '../../db/models/Author.model';

export default async (ctx: Context): Promise<void> => {
  const createAuthorParams: CreateAuthorParams = ctx.request.body;
  const createdAuthor = await Author.create(createAuthorParams);

  ctx.body = { data: createdAuthor };
};
