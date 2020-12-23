import express from 'express';
import { Application, NextFunction, Request, Response } from 'express'; // express 申明文件定义的类型
import { router } from './routes/router'; // 路由
import { sysConfig } from './config/config.default'; // 配置

// const app = express();
const app: Application = express();

app.use(router);

// error handler
app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
  return res.sendStatus(500);
});

app.listen(sysConfig.port, () => {
  console.log(
    `HTTP Server starting on http://${sysConfig.host}:${sysConfig.port}`
  );
});
