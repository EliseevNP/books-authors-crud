import { Context } from 'koa';
import { DeleteAuthorByIdParams } from '../../schemes/authors';
import Author from '../../db/models/Author.model';
import BookAuthor from '../../db/models/BookAuthor.model';
import sequelize from '../../db/sequelize';

export default async (ctx: Context): Promise<void> => {
  const deleteAuthorParams: DeleteAuthorByIdParams = ctx.params;

  let deletedRowsNumber = 0;

  const transaction = await sequelize.transaction();

  try {
    [deletedRowsNumber] = await Promise.all([
      Author.destroy({
        where: { authorId: deleteAuthorParams.authorId },
        transaction,
      }),
      BookAuthor.destroy({ where: { authorId: deleteAuthorParams.authorId } }),
    ]);

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }

  ctx.body = { data: deletedRowsNumber };
};
