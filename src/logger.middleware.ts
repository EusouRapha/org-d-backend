import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(
      `HTTP Request - Method: ${req.method}, URL: ${req.url}, Body: ${JSON.stringify(req.body)}`,
    );
    next();
  }
}
