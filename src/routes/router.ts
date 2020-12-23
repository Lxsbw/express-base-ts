import express from 'express';
import { Request, Response, Router } from 'express';

const router: Router = express.Router();

router.get('/', (req: Request, res: Response): void => {
  const title = 'World ss';
  res.send('Hello, Express TypeScript' + title);
});

router.get('/hello', (req: Request, res: Response): void => {
  const title = 'World';
  res.send('Hello, world' + title);
});

export { router };
