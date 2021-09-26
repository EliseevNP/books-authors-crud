import Koa from 'koa';

export default async (
  ctx: Koa.Context,
  next: () => Promise<unknown>,
): Promise<void> => {
  try {
    await next();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('err', JSON.stringify(err, null, 2));

    if (err.name === 'ClientError') {
      ctx.status = err.status;
      ctx.body = {
        status: err.status || 400,
        message: err.message || 'Bad Request',
        data: err.data || {},
      };
      return;
    }

    ctx.body = {
      status: err.status || 500,
      message: 'Internal Server Error',
    };
  }
};
