/* eslint-disable max-len */
const path = require('path');
const http = require('http');
const Koa = require('koa');
const koaStatic = require('koa-static');
const koaBody = require('koa-body');
const Router = require('koa-router');
const WS = require('ws');
const { Chat } = require('./src/Chat');

const chat = new Chat();

const app = new Koa();

app.use(async (ctx, next) => {
  // Так как frontend на ходится на сервере, то CORS не нужен.
  // ctx.response.set('Access-Control-Allow-Origin', '*');
  await next();
});

const dirPublic = path.join(__dirname, 'public');
app.use(koaStatic(dirPublic));

// Чтобы router выдавал тело запроса (ctx.request.body).
app.use(koaBody());

const router = new Router();

app.use(router.routes());
app.use(router.allowedMethods());

// '/users' фронтендом не использовалось
router.get('/users', async (ctx) => {
  console.log('URL', ctx.request.url);
  ctx.response.body = JSON.stringify(chat.getUserNames());
});

router.post('/login', async (ctx) => {
  console.log('URL', ctx.request.url);
  console.log('ctx.request.body', ctx.request.body);
  ctx.response.body = JSON.stringify(chat.login(ctx.request.body));
});

const PORT = process.env.PORT || 3000;
const server = http.createServer(app.callback());
// eslint-disable-next-line no-console
server.listen(PORT, () => console.log(`Koa server has been started on port ${PORT} ...`));

// Подключаем WS сервер.
const wsServer = new WS.Server({ server });

wsServer.on('connection', (ws, req) => {
  // eslint-disable-next-line no-console
  console.log('---------------------------------------------------------------------------\nnew connection');

  ws.on('message', (msg) => {
    try {
      const message = JSON.parse(msg);
      switch (message.type) {
        case 'connected':
          message.userNames = chat.getUserNames();
          chat.sockets.set(req.socket, message.userName);
          break;
        case 'message':
          // eslint-disable-next-line no-console
          console.log(`User ${message.userName} sent a message`);
          break;
        // eslint-disable-next-line no-console
        default: console.log(`Unknown message type ${message.type}`);
      }

      [...wsServer.clients]
        .filter((client) => client.readyState === WS.OPEN)
        // отфильтровать клиента, от которого пришло сообщение (убрать его из списка клиентов,
        // которые получат сообщение (в данной реализации чата это не нужно))
        // .filter((client) => client._socket !== req.socket)
        .forEach((client) => {
          client.send(JSON.stringify(message));
        });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  });

  ws.on('close', () => {
    const clients = [...wsServer.clients];
    chat.sockets.forEach(((value, key) => {
      // eslint-disable-next-line no-underscore-dangle
      const result = clients.find((client) => key === client._socket);
      if (!result) {
        // Убрать юзера и клиент
        chat.removeUser(key);
        clients.forEach((client) => {
          client.send(JSON.stringify({
            type: 'disconnected',
            userName: value,
            userNames: chat.getUserNames(),
          }));
        });
      }
    }));
  });
});
