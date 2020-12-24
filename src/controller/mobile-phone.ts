/*
 * @Author: zhixiong.fu
 * @Date: 2020-12-24 16:26:07
 * @Last Modified by: zhixiong.fu
 * @Last Modified time: 2020-12-24 17:02:12
 */

import { Request, Response, NextFunction } from 'express';

/**
 * 添加手机
 * @route POST /api/mobile-phone/create
 * @group MobilePhone - Operations about mobile phone
 * @param {MobilePhone.model} MobilePhone.body.required - 手机信息
 * @returns {object} 200 - mobile phone _id
 * @returns {Error} default - Unexpected error
 */
export const create = (req: Request, res: Response, next: NextFunction) => {
  console.log('controller : ' + JSON.stringify(req.body));

  res.json({ state: 'Success', mess: 'hello ts' });
};
