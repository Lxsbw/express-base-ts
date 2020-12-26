/*
 * @Author: zhixiong.fu
 * @Date: 2020-12-26 09:46:01
 * @Last Modified by: zhixiong.fu
 * @Last Modified time: 2020-12-26 16:37:34
 */

import { Container } from 'inversify';
import {
  interfaces,
  TYPE
} from 'inversify-express-utils';
import { MobilePhoneController } from '../controller/mobile-phone';

/**
 * 映射controller，为swagger api doc准备
 */
export const ContainerInit = (): Container => {
  const container = new Container();

  // note that you *must* bind your controllers to Controller
  container
    .bind<interfaces.Controller>(TYPE.Controller)
    .to(MobilePhoneController)
    .inSingletonScope()
    .whenTargetNamed(MobilePhoneController.name);

  return container;
};
