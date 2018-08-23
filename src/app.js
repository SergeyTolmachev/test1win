const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const koaStatic = require('koa-static-server');
const router = require('./routes/router');
const database = require('./models/Database');


const app = new Koa();

app.use(bodyParser());
app.use(koaStatic({ rootDir: 'public/images', rootPath: '/images' }));


app.use(router.routes());
app.use(router.allowedMethods());

app.use(async (ctx) => {
  ctx.body = 'Отсутствует данный метод';
});

app.listen(3000, () => {
  console.log('Сервер успешно работает');
});
