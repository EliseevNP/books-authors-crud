import './db/sequelize';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import router from './router';
import middlewares from './middlewares';
import { appConfig } from './common/constants';

// start application
const app = new Koa();

app.use(bodyParser());
app.use(middlewares.error);
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(appConfig.port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port: ${appConfig.port}`);
});
