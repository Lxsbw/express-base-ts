/*
 * @Author: zhixiong.fu
 * @Date: 2020-12-24 16:26:07
 * @Last Modified by: zhixiong.fu
 * @Last Modified time: 2023-03-03 11:31:40
 */
import { Request, Response, NextFunction } from 'express';
import * as _ from 'lodash';
import { controller, get, post, put, del, tag, summary, description, parameter, response, ENUM_PARAM_IN } from 'express-joi-swagger-ts';
import * as joi from 'joi';
import {
  MobilePhoneQuery,
  MobilePhoneSaveIn,
  MobilePhoneSaveOut,
  MobilePhoneModifyIn,
  MobilePhoneDelIn,
  MobilePhoneQuery_SC,
  MobilePhoneSaveIn_SC,
  MobilePhoneSaveOut_SC,
  MobilePhoneModifyIn_SC,
  MobilePhoneDelIn_SC
} from '../schemas/request/mobile-phone';
// import {
//   mobilePhoneService,
//   IMobilePhoneService
// } from '../service/mobile-phone';
import { mobilePhoneService as mpService } from '../service/mobile-phone';
// import * as Linq from '../../../linqts';
import { Linq } from 'linq-to-ts';
// import { Linq } from 'linq-to-javascript';
import { List } from 'linqts';
import * as jslinq from 'jslinq';

@controller('/api/mobile-phone')
export class MobilePhoneController {
  constructor() {
    console.log('MobilePhoneController初始化');
    // mpService = mobilePhoneService;
    // this.inversify();
  }

  //   private mpService: IMobilePhoneService;

  /**
   * id查找
   */
  @get('/findone')
  @tag('MobilePhone')
  @summary('id查找')
  @description('id查找')
  @parameter('_id', joi.string().required().description('id'), ENUM_PARAM_IN.query)
  async findOne(req: Request, res: Response, next: NextFunction) {
    console.log('controller : ' + JSON.stringify(req.query._id));
    res.json(await mpService.findOne({ _id: req.query._id }));
  }

  /**
   * 查找
   */
  @get('/findall')
  @tag('MobilePhone')
  @summary('查找')
  @description('查找')
  @parameter('model_name', joi.string().description('手机型号'), ENUM_PARAM_IN.query)
  @parameter('_id', joi.string().description('id'), ENUM_PARAM_IN.query)
  async findAll(req: Request, res: Response, next: NextFunction) {
    res.json(
      await mpService.findAll({
        _id: req.query._id,
        model_name: req.query.model_name
      })
    );
  }

  /**
   * 添加手机
   */
  @post('/save')
  @tag('MobilePhone')
  @summary('添加手机')
  @description('添加手机')
  @parameter('MobilePhone', { type: 'object', required: true, items: { $ref: MobilePhoneSaveIn_SC } }, ENUM_PARAM_IN.body)
  async save(req: Request, res: Response, next: NextFunction) {
    console.log('controller : ' + JSON.stringify(req.body));

    const newMobiles = new MobilePhoneSaveIn();
    newMobiles.model_name = req.body.model_name;
    newMobiles.size = req.body.size;
    newMobiles.spec = req.body.spec;
    newMobiles.ram = req.body.ram;
    newMobiles.rom = req.body.rom;
    newMobiles.seria_number = req.body.seria_number;

    res.json(await mpService.save(newMobiles));
  }

  /**
   * 更新手机
   */
  @put('/update')
  @tag('MobilePhone')
  @summary('更新手机')
  @description('更新手机')
  @parameter('MobilePhoneUpd', { type: 'object', required: true, items: { $ref: MobilePhoneModifyIn_SC } }, ENUM_PARAM_IN.body)
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

    res.json(await mpService.update(newMobiles._id, newMobiles));
  }

  /**
   * 删除手机
   */
  @del('/delete')
  @tag('MobilePhone')
  @summary('删除手机')
  @description('删除手机')
  @parameter('MobilePhoneDel', { type: 'object', required: true, items: { $ref: MobilePhoneDelIn_SC } }, ENUM_PARAM_IN.body)
  async delete(req: Request, res: Response, next: NextFunction) {
    console.log('controller : ' + JSON.stringify(req.body._id));

    const delMobile = new MobilePhoneDelIn();
    delMobile._id = _.toString(req.body._id);

    res.json(await mpService.delete(delMobile));
  }

  /**
   * LinqToTS
   */
  @get('/linqtots')
  @tag('MobilePhone')
  @summary('LinqToTS')
  @description('LinqToTS')
  @parameter('_id', joi.string().description('id'), ENUM_PARAM_IN.query)
  async LinqToTS(req: Request, res: Response, next: NextFunction) {
    const persons = [
      { ID: 0, Age: 30, Name: 'A' },
      { ID: 1, Age: 25, Name: 'B' },
      { ID: 2, Age: 18, Name: 'C' },
      { ID: 1, Age: 30, Name: 'D' },
      { ID: 1, Age: 25, Name: 'E' },
      { ID: 2, Age: 15, Name: 'F' }
    ];
    const orderByID = new Linq<any>(persons).OrderBy(value => value.ID).ToArray();
    const thenByAge = new Linq<any>(persons)
      .OrderBy(value => value.ID)
      .ThenBy(value => value.Age)
      .ToArray();
    const thenByName = new Linq<any>(persons)
      .OrderBy(value => value.ID)
      .ThenBy(value => value.Age)
      .ThenByDescending(value => value.Name)
      .ToArray();

    console.log('orderByID:', orderByID);
    console.log('thenByAge:', thenByAge);
    console.log('thenByName:', thenByName);

    res.json({ thenByName });
  }

  /**
   * LinqTS
   */
  @get('/linqts')
  @tag('MobilePhone')
  @summary('LinqTS')
  @description('LinqTS')
  @parameter('_id', joi.string().description('id'), ENUM_PARAM_IN.query)
  async LinqTS(req: Request, res: Response, next: NextFunction) {
    const parameters = [
      { ID: 5, Rate: 0.0, Name: '正一郎' },
      { ID: 13, Rate: 0.1, Name: '清次郎' },
      { ID: 25, Rate: 0.0, Name: '誠三郎' },
      { ID: 42, Rate: 0.3, Name: '征史郎' }
    ];
    const results = new List<any>(parameters)
      .Select(value => {
        return { ID: value.ID, Name: value.Name };
      })
      .ToArray();
    res.json(results);
  }

  /**
   * LinqJs
   */
  @get('/linqjs')
  @tag('MobilePhone')
  @summary('LinqJs')
  @description('LinqJs')
  @parameter('_id', joi.string().description('id'), ENUM_PARAM_IN.query)
  async LinqJs(req: Request, res: Response, next: NextFunction) {
    const data = [
      { id: 1, name: 'one', category: 'fruits', countries: ['Italy', 'Austria'] },
      { id: 2, name: 'two', category: 'vegetables', countries: ['Italy', 'Germany'] },
      { id: 2, name: 'three', category: 'vegetables', countries: ['Germany'] },
      { id: 2, name: 'ta', category: 'vegetables', countries: ['Germany'] },
      { id: 4, name: 'four', category: 'fruits', countries: ['Japan'] },
      { id: 5, name: 'five', category: 'fruits', countries: ['Japan', 'Italy'] }
    ];
    const result = jslinq(data).singleOrDefault(x => x.name == 'one');
    res.json(result);
  }
}

export const mobilePhoneController = new MobilePhoneController();
