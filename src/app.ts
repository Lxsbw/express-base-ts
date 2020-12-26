import express from 'express';
import bodyParser from 'body-parser';
import * as path from 'path';
import * as swagger from 'swagger-express-ts';
import * as mongoose from 'mongoose';
import logger from 'morgan';
import { NextFunction, Request, Response } from 'express'; // express 申明文件定义的类型
import { InversifyExpressServer } from 'inversify-express-utils';
import { ContainerInit } from './handle/inversify';
import { appRouters } from './routes/router'; // 路由
import { sysConfig, getMongoUrl } from './config/config.default'; // 配置

class App {
  // ref to Express instance
  public app: express.Application;

  constructor() {
    console.log('app初始化');

    // this.app = express();
    this.app = this.swaggerInit();
    this.routes();
    this.mongo();
    this.launchConf();
  }

  private swaggerInit(): express.Application {
    // create server
    const server = new InversifyExpressServer(ContainerInit());

    server.setConfig((app: any) => {
      app.use(
        '/api-docs/swagger',
        express.static(path.join(__dirname, 'swagger'))
      );
      app.use(
        '/api-docs/swagger/assets',
        express.static(path.join(__dirname, '../node_modules/swagger-ui-dist'))
      );
      app.use(
        swagger.express({
          definition: {
            info: {
              description: 'This is a sample server',
              title: 'Swagger',
              version: '1.0.0'
            },
            // host: 'localhost:3000',
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

      // middleware
      this.middleware(app);
    });

    return server.build();
  }

  private middleware(middapp: express.Application): void {
    // this.app.use(express.json());

    middapp.use(bodyParser.json());
    middapp.use(bodyParser.urlencoded({ extended: true }));
    middapp.use(logger('dev'));
  }

  private routes(): void {
    this.app.use(appRouters);
  }

  private mongo(): void {
    // const db: IDBContext = await app.applicationContext.getAsync('DBContext');
    // // const db = new DBContext(app.config.sequelize, app.config.env);
    // db.init();
    console.log(getMongoUrl());
    mongoose
      .connect(getMongoUrl(), {
        useCreateIndex: true,
        poolSize: 5, // 连接池中维护的连接数
        useNewUrlParser: true,
        autoIndex: false
        // useUnifiedTopology: true
        // keepAlive: 120,
      })
      .then((open) => {
        console.log('📚  mongodb is launching...');
      })
      .catch((err) => {
        console.error.bind(console, `connection error:${err}`);
      });
  }

  private launchConf() {
    console.log('====================================');
    console.log('🚀  Your awesome APP is launching...');
    console.log('====================================');

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
      //   console.log(
      //     'App is running at http://localhost:%d in %s mode',
      //     sysConfig.port, // this.app.get('port'),
      //     this.app.get('env')
      //   );
      //   console.log('Press CTRL-C to stop\n');

      console.log('====================================');
      console.log(`✅  http://${sysConfig.host}:${sysConfig.port}`);
      console.log(
        `✅  http://${sysConfig.host}:${sysConfig.port}/api-docs/swagger`
      );
      console.log(`✅  Your awesome APP launched ${this.app.get('env')}`);
      console.log('====================================');
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
