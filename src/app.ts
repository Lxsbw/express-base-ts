import express from 'express';
import { NextFunction, Request, Response } from 'express'; // express 申明文件定义的类型
import bodyParser from 'body-parser';
import { appRouters } from './routes/router'; // 路由
import { sysConfig } from './config/config.default'; // 配置
import path from 'path';
import { Container } from 'inversify';
import {
  interfaces,
  InversifyExpressServer,
  TYPE
} from 'inversify-express-utils';
import { CarsController } from './controller/cars';
import { MobilePhoneController } from './controller/mobilephone';
import 'reflect-metadata';
import * as swagger from 'swagger-express-ts';

class App {
  // ref to Express instance
  public app: express.Application;

  constructor() {
    console.log('app初始化');

    // this.app = express();
    this.app = this.middleware();
    this.routes();
    this.launchConf();
  }

  private middleware(): express.Application {
    // this.app.use(express.json());

    const container = new Container();

    // note that you *must* bind your controllers to Controller
    container
      .bind<interfaces.Controller>(TYPE.Controller)
      .to(CarsController)
      .inSingletonScope()
      .whenTargetNamed(CarsController.name);
    container
      .bind<interfaces.Controller>(TYPE.Controller)
      .to(MobilePhoneController)
      .inSingletonScope()
      .whenTargetNamed(MobilePhoneController.name);

    // create server
    const server = new InversifyExpressServer(container);

    server.setConfig((app: any) => {
      app.use(
        '/api-docs/swagger',
        express.static(path.join(__dirname, 'swagger'))
      );
      app.use(
        '/api-docs/swagger/assets',
        express.static(path.join(__dirname, '../node_modules/swagger-ui-dist'))
        // express.static('../node_modules/swagger-ui-dist')
      );
      app.use(bodyParser.json());
      app.use(
        swagger.express({
          definition: {
            info: {
              description: 'This is a sample server',
              title: 'Swagger',
              version: '1.0.0'
            },
            host: 'localhost:3000',
            basePath: '/',
            produces: ['application/json', 'application/xml'],
            schemes: ['http', 'https'],
            securityDefinitions: {
              JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization'
                // description: ''
              }
            },
            // externalDocs: {
            //   url: 'My url'
            // },
            responses: {
              500: {}
            }
          }
        })
      );
    });
    return server.build();

    // // swagger
    // this.app.use(express.static(path.join(__dirname, 'public')));
    // this.app.use(
    //   '/api-docs/swagger',
    //   express.static(path.join(__dirname, 'swagger'))
    // );
    // this.app.use(
    //   '/api-docs/swagger/assets',
    //   express.static(path.join(__dirname, '../node_modules/swagger-ui-dist'))
    //   // express.static('../node_modules/swagger-ui-dist')
    // );
    // this.app.use(bodyParser.json());
    // this.app.use(bodyParser.urlencoded({ extended: true }));
    // this.app.use(
    //   swagger.express({
    //     definition: {
    //       info: {
    //         title: 'My api',
    //         version: '1.0'
    //       },
    //       externalDocs: {
    //         url: 'My url'
    //         // url: '/api-docs/swagger.json'
    //       }
    //       // Models can be defined here
    //     }
    //   })
    // );
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
        'App is running at http://localhost:%d in %s mode',
        sysConfig.port, // this.app.get('port'),
        this.app.get('env')
      );
      console.log('Press CTRL-C to stop\n');
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
