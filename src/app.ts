import * as express from 'express';
// import * as fs from 'fs';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
// import { connect as MongoConnect } from 'mongoose';
import * as logger from 'morgan';
import { appRouters } from './routes/router'; // 路由
import { sysConfig, getMongoUrl } from './config/config.default'; // 配置
import { ControllerMap } from './handle/expressSwagger';
import { ExpressSwaggerRouter } from 'express-joi-swagger-ts';

class App {
  // ref to Express instance
  public app: express.Application;

  constructor() {
    console.log('app初始化');

    this.app = express();
    this.middleware();
    this.swaggerInit();
    this.routes();
    this.mongo();
    this.launchConf();
  }

  private swaggerInit(): void {
    const router = new ExpressSwaggerRouter({
      swagger: '2.0',
      info: {
        description:
          'This is a sample server Express server.  You can find out more about     Swagger at [http://swagger.io](http://swagger.io) or on [irc.freenode.net, #swagger](http://swagger.io/irc/).      For this sample, you can use the api key `special-key` to test the authorization     filters.',
        title: 'Express TypeScript Swagger',
        version: '1.0.0',
        concat: {
          email: 'lxsbw@outlook.com'
        },
        // 开源协议
        license: {
          name: 'Apache 2.0',
          url: 'http://www.apache.org/licenses/LICENSE-2.0.html'
        }
      },
      // host: `${sysConfig.host}:${sysConfig.port}`,
      basePath: '',
      schemes: ['http', 'https'],
      paths: {},
      definitions: {},
      securityDefinitions: {
        JWT: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization'
          // description: ''
        }
      }
    });
    ControllerMap(router);
    router.setSwaggerFile('swagger.json');
    router.loadSwaggerUI('/api-docs/swagger');
    console.log('swagger:' + JSON.stringify(router.getSwaggerFile()));
    // fs.writeFileSync('./swagger.json', JSON.stringify(router.getSwaggerFile()));
    this.app.use(router.getRouter());
  }

  private middleware(): void {
    // this.app.use(express.json());

    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));

    this.app.use(logger('dev'));
  }

  private routes(): void {
    this.app.use(appRouters);
  }

  private mongo(): void {
    console.log(getMongoUrl());
    mongoose
      .connect(getMongoUrl(), {
        useCreateIndex: true,
        // poolSize: 5, // 连接池中维护的连接数
        useNewUrlParser: true,
        autoIndex: false,
        useUnifiedTopology: true
        // keepAlive: 120,
      })
      .then(open => {
        console.log('📚  mongodb is launching...');
      })
      .catch(err => {
        console.error.bind(console, `connection error:${err}`);
      });
  }

  private launchConf() {
    console.log('====================================');
    console.log('🚀  Your awesome APP is launching...');
    console.log('====================================');

    // error handler
    // this.app.use(function (
    //   err: Error,
    //   req: Request,
    //   res: Response,
    //   next: NextFunction
    // ) {
    //   return res.sendStatus(500);
    // });

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
      console.log(`✅  http://${sysConfig.host}:${sysConfig.port}/api-docs/swagger`);
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
