import express from 'express';
import { NextFunction, Request, Response } from 'express'; // express 申明文件定义的类型
import { appRouters } from './routes/router'; // 路由
import { sysConfig } from './config/config.default'; // 配置

class App {
  // ref to Express instance
  public app: express.Application;

  constructor() {
    console.log('app初始化');

    this.app = express();
    this.middleware();
    this.routes();
    this.launchConf();
  }

  private middleware(): void {
    this.app.use(express.json());
  }

  /**
   * Primary app routes.
   */
  private routes(): void {
    this.app.use(appRouters);
  }

  private launchConf() {
    // this.app.use(errorHandler());
    // error handler
    this.app.use(function (
      err: Error,
      req: Request,
      res: Response,
      next: NextFunction
    ) {
      return res.sendStatus(500);
    });

    /**
     * Start Express server.
     */
    this.app.listen(sysConfig.port /*this.app.get('port')*/, () => {
      console.log(
        '  App is running at http://localhost:%d in %s mode',
        sysConfig.port, // this.app.get('port'),
        this.app.get('env')
      );
      console.log('  Press CTRL-C to stop\n');
    });
  }
}

export default new App().app;

// // const app = express();
// const app: Application = express();

// app.use(router);

// // error handler
// app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
//   return res.sendStatus(500);
// });

// app.listen(sysConfig.port, () => {
//   console.log(
//     `HTTP Server starting on http://${sysConfig.host}:${sysConfig.port}`
//   );
// });
