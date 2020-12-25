/*
 * @Author: zhixiong.fu
 * @Date: 2020-12-24 15:46:35
 * @Last Modified by: zhixiong.fu
 * @Last Modified time: 2020-12-25 14:19:00
 */

import { Request, Response, Router } from 'express';
import * as MobilePhone from '../controller/mobile-phone';

class AppRouter {
  public appRouter: Router;

  public constructor() {
    this.appRouter = Router();
    this.init();
  }

  private init() {
    this.appRouter.get('/', (req: Request, res: Response): void => {
      res.send('Hello, Express TypeScript');
    });

    const mobile = new MobilePhone.MobilePhoneController();
    this.appRouter.post('/api/mobile-phone/create', mobile.create);
  }
}

export const appRouters = new AppRouter().appRouter;
