/*
 * @Author: zhixiong.fu
 * @Date: 2020-12-24 16:26:07
 * @Last Modified by: zhixiong.fu
 * @Last Modified time: 2020-12-26 16:39:03
 */
import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import { injectable } from 'inversify';
import * as _ from 'lodash';
import {
  controller,
  httpGet,
  httpPost,
  httpPut,
  httpDelete,
  interfaces
} from 'inversify-express-utils';
import {
  ApiPath,
  ApiOperationGet,
  ApiOperationPost,
  ApiOperationPut,
  ApiOperationDelete,
  SwaggerDefinitionConstant
} from 'swagger-express-ts';
import {
  MobilePhoneQuery,
  MobilePhoneSaveIn,
  MobilePhoneSaveOut,
  MobilePhoneModifyIn,
  MobilePhoneDelIn
} from '../schemas/request/mobile-phone';
import {
  mobilePhoneService,
  IMobilePhoneService
} from '../service/mobile-phone';

@ApiPath({
  path: '/api/mobile-phone',
  name: 'MobilePhoneController',
  security: { apiKeyHeader: [] }
})
@controller('/api/mobile-phone')
@injectable()
export class MobilePhoneController implements interfaces.Controller {
  constructor() {
    console.log('MobilePhoneController初始化');
    this.mpService = mobilePhoneService;
    this.inversify();
  }

  private mpService: IMobilePhoneService;

  /**
   * id查找
   */

  @ApiOperationGet({
    path: '/findone',
    description: 'id查找',
    summary: 'get one mobile phone',
    parameters: {
      query: {
        _id: {
          required: true,
          default: 111,
          type: SwaggerDefinitionConstant.Parameter.Type.STRING
        }
      }
    },
    responses: {
      200: {
        model: 'MobilePhoneQuery'
      }
    }
  })
  @httpGet('/findone')
  async findOne(req: Request, res: Response, next: NextFunction) {
    console.log('controller : ' + JSON.stringify(req.query._id));
    res.json(await this.mpService.findOne({ _id: req.query._id }));
  }

  /**
   * 查找
   */

  @ApiOperationGet({
    path: '/findall',
    description: '查找',
    summary: 'get mobile phone',
    parameters: {
      query: {
        _id: {
          type: SwaggerDefinitionConstant.Parameter.Type.STRING
        },
        model_name: {
          type: SwaggerDefinitionConstant.Parameter.Type.STRING
        }
      }
    },
    responses: {
      200: {
        type: SwaggerDefinitionConstant.Response.Type.ARRAY,
        model: 'MobilePhoneQuery'
      }
    }
  })
  @httpGet('/findall')
  async findAll(req: Request, res: Response, next: NextFunction) {
    res.json(
      await this.mpService.findAll({
        _id: req.query._id,
        model_name: req.query.model_name
      })
    );
  }

  /**
   * 添加手机
   */
  @ApiOperationPost({
    path: '/save',
    description: '添加手机',
    summary: 'Post new mobile phone',
    parameters: {
      body: {
        description: '手机信息',
        required: true,
        model: 'MobilePhoneSaveIn'
      }
    },
    responses: {
      200: { model: 'MobilePhoneSaveOut' }
    }
  })
  @httpPost('/save')
  async save(req: Request, res: Response, next: NextFunction) {
    console.log('controller : ' + JSON.stringify(req.body));

    const newMobiles = new MobilePhoneSaveIn();
    newMobiles.model_name = req.body.model_name;
    newMobiles.size = req.body.size;
    newMobiles.spec = req.body.spec;
    newMobiles.ram = req.body.ram;
    newMobiles.rom = req.body.rom;
    newMobiles.seria_number = req.body.seria_number;

    res.json(await this.mpService.save(newMobiles));
  }

  /**
   * 更新手机
   */
  @ApiOperationPut({
    path: '/update',
    description: '更新手机',
    summary: 'modify mobile phone',
    parameters: {
      body: {
        description: '手机信息',
        required: true,
        model: 'MobilePhoneModifyIn'
      }
    },
    responses: {
      200: { description: 'mongoose message' }
    }
  })
  @httpPut('/update')
  async update(req: Request, res: Response, next: NextFunction) {
    console.log('controller : ' + JSON.stringify(req.body));

    const newMobiles = new MobilePhoneModifyIn();
    newMobiles._id = req.body._id;
    newMobiles.model_name = req.body.model_name;
    newMobiles.size = req.body.size;
    newMobiles.spec = req.body.spec;
    newMobiles.ram = req.body.ram;
    newMobiles.rom = req.body.rom;
    newMobiles.seria_number = req.body.seria_number;

    res.json(await this.mpService.update(newMobiles._id, newMobiles));
  }

  /**
   * 删除手机
   */
  @ApiOperationDelete({
    path: '/delete',
    description: '删除手机',
    summary: 'delete mobile phone',
    parameters: {
      query: {
        _id: {
          type: SwaggerDefinitionConstant.Parameter.Type.STRING,
          required: true
        }
      }
      //   body: {
      //     type: SwaggerDefinitionConstant.Parameter.Type.OBJECT,
      //     description: '手机信息',
      //     required: true,
      //     model: 'MobilePhoneDelIn'
      //   }
    },
    responses: {
      200: { description: 'mongoose message' }
    }
  })
  @httpDelete('/delete')
  async delete(req: Request, res: Response, next: NextFunction) {
    console.log('controller : ' + JSON.stringify(req.query._id));

    const delMobile = new MobilePhoneDelIn();
    // delMobile._id = req.body._id;
    delMobile._id = _.toString(req.query._id);

    res.json(await this.mpService.delete(delMobile));
  }

  private inversify(): void {
    const result = new MobilePhoneQuery();
    result.rom = 6;

    const newMobileIn = new MobilePhoneSaveIn();
    newMobileIn.rom = 6;

    const newMobileOut = new MobilePhoneSaveOut();
    newMobileOut.rom = 6;

    const modMobile = new MobilePhoneModifyIn();
    modMobile.rom = 6;

    const delMobile = new MobilePhoneDelIn();
    delMobile._id = '111';
  }
}

export const mobilePhoneController = new MobilePhoneController();
