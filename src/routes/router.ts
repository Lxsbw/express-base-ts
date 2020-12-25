/*
 * @Author: zhixiong.fu
 * @Date: 2020-12-24 15:46:35
 * @Last Modified by: zhixiong.fu
 * @Last Modified time: 2020-12-25 14:19:00
 */

import { Request, Response, Router } from 'express';
import * as cars from '../controller/cars';
import * as MobilePhone from '../controller/mobilephone';

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

    const carsObj = new cars.CarsController();
    this.appRouter.post('/cars', carsObj.postCar);

    const mobile = new MobilePhone.MobilePhoneController();
    this.appRouter.post('/mobilephone/create', mobile.create);
  }
}

export const appRouters = new AppRouter().appRouter;
