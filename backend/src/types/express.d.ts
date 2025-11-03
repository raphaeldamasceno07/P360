// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as express from 'express';
import type { UserEntity } from '../db/entities/user.entity';

declare global {
  namespace Express {
    interface Request {
      user?: UserEntity;
    }
  }
}
