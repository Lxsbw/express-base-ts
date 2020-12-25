/*
 * @Author: zhixiong.fu
 * @Date: 2020-12-24 16:26:07
 * @Last Modified by: zhixiong.fu
 * @Last Modified time: 2020-12-25 16:34:51
 */
import 'reflect-metadata';
import * as express from 'express';
import { inject, injectable } from 'inversify';
import {
  controller,
  httpGet,
  httpPost,
  interfaces
} from 'inversify-express-utils';
import 'reflect-metadata';
import {
  ApiOperationGet,
  ApiOperationPost,
  ApiPath,
  SwaggerDefinitionConstant
} from 'swagger-express-ts';
import { CarModel } from '../models/car-model';
import { MobileModel } from '../models/mobile-model';
// import { CarsService } from './cars.service';

@ApiPath({
  path: '/mobilephone',
  name: 'MobilePhones',
  security: { apiKeyHeader: [] }
})
@controller('/mobilephone')
@injectable()
export class MobilePhoneController implements interfaces.Controller {
  /**
   * 添加手机
   */
  @ApiOperationPost({
    path: '/create',
    description: '添加手机',
    summary: 'Post new version',
    parameters: {
      body: {
        description: 'New version',
        required: true,
        model: 'Car'
      }
      //   query: {
      //     _id: {
      //       required: true,
      //       type: SwaggerDefinitionConstant.Parameter.Type.STRING
      //     }
      //   }
    },
    responses: {
      200: { description: 'Success' },
      400: { description: 'Parameters fail' }
    }
  })
  @httpPost('/create')
  public create(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    console.log('controller : ' + JSON.stringify(req.body));

    res.json({ state: 'Success', mess: 'hello ts' });
  }
}
