/*
 * @Description: 
 * @Version: 1.0
 * @Author: shenkai03
 * @Date: 2024-06-13 16:27:22
 * @LastEditors: shenkai03
 * @LastEditTime: 2024-06-14 10:55:23
 * @FilePath: /autoGrab/server/server.js
 * Copyright (C) 2024 shenkai03. All rights reserved.
 */
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
