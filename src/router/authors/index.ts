import Router from 'koa-router';
import getAuthorsList from './getAuthorsList';
import getAuthorById from './getAuthorById';
import createAuthor from './createAuthor';
import setBooks from './setBooks';
import deleteAuthorById from './deleteAuthorById';
import updateAuthorById from './updateAuthorById';
import middlewares from '../../middlewares';
import schemes from '../../schemes';
import { UserRole } from '../../common/enums';

const router = new Router({ prefix: '/authors' });

router.get(
  '/list',
  middlewares.validate(schemes.authors.getAuthorsList),
  getAuthorsList,
);

router.get(
  '/:authorId',
  middlewares.validate(schemes.authors.getAuthorById),
  getAuthorById,
);

router.post(
  '/',
  middlewares.auth([UserRole.ADMIN]),
  middlewares.validate(schemes.authors.createAuthor),
  createAuthor,
);

router.post(
  '/set/books',
  middlewares.auth([UserRole.ADMIN]),
  middlewares.validate(schemes.authors.setBooks),
  setBooks,
);

router.delete(
  '/:authorId',
  middlewares.auth([UserRole.ADMIN]),
  middlewares.validate(schemes.authors.deleteAuthorById),
  deleteAuthorById,
);

router.patch(
  '/:authorId',
  middlewares.auth([UserRole.ADMIN]),
  middlewares.validate(schemes.authors.updateAuthorById),
  updateAuthorById,
);

export default router;
