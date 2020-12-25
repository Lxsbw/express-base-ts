/*
 * @Author: zhixiong.fu
 * @Date: 2020-12-24 16:26:07
 * @Last Modified by: zhixiong.fu
 * @Last Modified time: 2020-12-25 16:34:51
 */
import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import { injectable } from 'inversify';
import {
  controller,
  httpGet,
  httpPost,
  interfaces
} from 'inversify-express-utils';
import { ApiOperationGet, ApiOperationPost, ApiPath } from 'swagger-express-ts';
import { MobilePhone } from '../models/mobile-phone';

@ApiPath({
  path: '/api/mobile-phone',
  name: 'MobilePhoneController',
  security: { apiKeyHeader: [] }
})
@controller('/api/mobile-phone')
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
        description: '手机信息',
        required: true,
        model: 'MobilePhone'
      }
      //   query: {
      //     _id: {
      //       required: true,
      //       default: 111,
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
  public create(req: Request, res: Response, next: NextFunction) {
    console.log('controller : ' + JSON.stringify(req.body));

    const newMobile = new MobilePhone();

    res.json({ state: 'Success', mess: 'hello ts' });
  }
}
