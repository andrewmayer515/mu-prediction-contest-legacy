import Koa from 'koa';
import KoaRouter from 'koa-router';
import koaBody from 'koa-body';
import { results } from '..';

const app = new Koa();
const router = new KoaRouter();

app.use(router.routes()).use(router.allowedMethods());

router.post('/results', koaBody(), async ctx => {
  const response = await results(ctx);
  ctx.body = {
    results: response,
  };
  ctx.status = 200;
});

app.listen(3000, () => console.log('--- RUNNING ON LOCALHOST:3000 ---')); // eslint-disable-line no-console
