import {HttpException, HttpStatus, Injectable, NestMiddleware} from '@nestjs/common';
import {NextFunction, Request, Response} from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // some logic
    // if (!req.body.email) {
    //   throw new HttpException('Email is empty', HttpStatus.BAD_REQUEST)
    // }
    next();
  }
}
