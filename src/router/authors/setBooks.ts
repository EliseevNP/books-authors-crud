import { Context } from 'koa';
import { SetBooksParams } from '../../schemes/authors';
import Author from '../../db/models/Author.model';
import { ClientError } from '../../common/errors';
import sequelize from '../../db/sequelize';

export default async (ctx: Context): Promise<void> => {
  const setAuthorsParams: SetBooksParams = ctx.request.body;
  const updatingAuthor = await Author.findByPk(setAuthorsParams.authorId);

  if (!updatingAuthor) {
    throw new ClientError('Author not found', 400);
  }

  const transaction = await sequelize.transaction();

  try {
    await updatingAuthor.setBooks(setAuthorsParams.bookIds, transaction);
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }

  ctx.body = { data: updatingAuthor };
};
