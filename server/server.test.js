/*
 * @Description: 
 * @Version: 1.0
 * @Author: shenkai03
 * @Date: 2024-06-13 21:53:00
 * @LastEditors: shenkai03
 * @LastEditTime: 2024-06-14 10:35:04
 * @FilePath: /autoGrab/server/server.test.js
 * Copyright (C) 2024 shenkai03. All rights reserved.
 */
const request = require('supertest');
const Koa = require('koa');
const Router = require('@koa/router');
const multer = require('@koa/multer');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new Router();
const upload = multer();

app.use(cors());
app.use(bodyParser());

// Handle upload file by multer middleware
router.post('/api/vehicle', upload.single('logbook'), async (ctx) => {
  const { make, model, badge } = ctx.request.body;
  const logbook = ctx.file;

  if (!logbook) {
    ctx.status = 400;
    ctx.body = { error: 'Logbook file is required.' };
    return;
  }

  // Reading from buffer
  const logbookContent = logbook.buffer.toString('utf8');

  ctx.body = {
    make,
    model,
    badge,
    logbook: logbookContent,
  };
});

app.use(router.routes());
app.use(router.allowedMethods());

// Start the server
const server = app.listen(3000);

afterAll(() => {
  server.close();
});

describe('POST /api/vehicle', () => {
  it('should return vehicle selection and logbook content', async () => {
    const res = await request(server)
      .post('/api/vehicle')
      .field('make', 'ford')
      .field('model', 'Ranger')
      .field('badge', 'Raptor')
      .attach('logbook', Buffer.from('This is a logbook content'), 'logbook.txt');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      make: 'ford',
      model: 'Ranger',
      badge: 'Raptor',
      logbook: 'This is a logbook content',
    });
  });

  it('should return 400 if logbook file is not provided', async () => {
    const res = await request(server)
      .post('/api/vehicle')
      .field('make', 'ford')
      .field('model', 'Ranger')
      .field('badge', 'Raptor');

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'Logbook file is required.' });
  });
});
