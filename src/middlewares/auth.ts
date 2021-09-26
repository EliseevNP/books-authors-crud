import Koa from 'koa';
import { UserRole } from '../common/enums';
import User from '../db/models/User.model';

export default (roles: UserRole[]) => async (
  ctx: Koa.Context,
  next: () => Promise<unknown>,
): Promise<void> => {
  if (roles.length) {
    const sessionKey = ctx.header['x-api-key'];

    if (!sessionKey) {
      ctx.status = 401;
      return;
    }

    const user = await User.findOne({ where: { sessionKey } });

    if (!user || roles.some((role) => !user.roles?.includes(role))) {
      ctx.status = 401;
      return;
    }
  }

  await next();
};
