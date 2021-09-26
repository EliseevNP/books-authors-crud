import { Context } from 'koa';
import {
  UpdateAuthorByIdParams,
  UpdateAuthorByIdBodyParams,
} from '../../schemes/authors';
import Author from '../../db/models/Author.model';
import { ClientError } from '../../common/errors';

export default async (ctx: Context): Promise<void> => {
  const updateAuthorParams: UpdateAuthorByIdParams = ctx.params;
  const updateAuthorBodyParams: UpdateAuthorByIdBodyParams = ctx.request.body;
  const updatingAuthor = await Author.findByPk(updateAuthorParams.authorId, {
    include: { all: true },
  });

  if (!updatingAuthor) {
    throw new ClientError('Author not found', 400);
  }

  await updatingAuthor.update(updateAuthorBodyParams);

  ctx.body = { data: updatingAuthor };
};
