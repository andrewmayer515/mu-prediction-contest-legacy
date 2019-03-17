import Koa from 'koa';
import KoaRouter from 'koa-router';
import { results } from '..';

const app = new Koa();
const router = new KoaRouter();

router.post('/results', async ctx => {
  await results();
  ctx.body = {
    results: [],
  };
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => console.log('--- RUNNING ON LOCALHOST:3000 ---')); // eslint-disable-line no-console
