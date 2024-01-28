// require('crypto').randomBytes(64).toString('hex')
import * as process from 'process';

export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'secretKey',
};
