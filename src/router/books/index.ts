import Router from 'koa-router';
import getBooksList from './getBooksList';
import getBookById from './getBookById';
import createBook from './createBook';
import setAuthors from './setAuthors';
import deleteBookById from './deleteBookById';
import updateBookById from './updateBookById';
import middlewares from '../../middlewares';
import schemes from '../../schemes';
import { UserRole } from '../../common/enums';

const router = new Router({ prefix: '/books' });

router.get(
  '/list',
  middlewares.validate(schemes.books.getBooksList),
  getBooksList,
);

router.get(
  '/:bookId',
  middlewares.validate(schemes.books.getBookById),
  getBookById,
);

router.post(
  '/',
  middlewares.auth([UserRole.ADMIN]),
  middlewares.validate(schemes.books.createBook),
  createBook,
);

router.post(
  '/set/authors',
  middlewares.auth([UserRole.ADMIN]),
  middlewares.validate(schemes.books.setAuthors),
  setAuthors,
);

router.delete(
  '/:bookId',
  middlewares.auth([UserRole.ADMIN]),
  middlewares.validate(schemes.books.deleteBookById),
  deleteBookById,
);

router.patch(
  '/:bookId',
  middlewares.auth([UserRole.ADMIN]),
  middlewares.validate(schemes.books.updateBookById),
  updateBookById,
);

export default router;
