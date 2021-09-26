import Router from 'koa-router';
import authors from './authors';
import books from './books';

const router = new Router({ prefix: '/api' });

router.use(authors.routes(), authors.allowedMethods());
router.use(books.routes(), books.allowedMethods());

export default router;
