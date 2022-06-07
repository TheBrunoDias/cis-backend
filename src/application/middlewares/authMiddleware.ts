import { NextFunction, Request, Response } from 'express';
import { TokenPayload } from '../../core/domain/TokenPayload';
import { decodedToken } from '../utils/jwtUtil';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorization = req.headers['authorization'];
    if (!authorization) throw new Error('Não Autorizado');

    const [bearer, token] = authorization.split(' ');

    if (bearer !== 'Bearer' || !token) throw new Error('Não Autorizado');

    const payload = decodedToken(token);

    if (!payload) throw new Error('Não Autorizado');

    req.user = payload as TokenPayload;

    return next();
  } catch (error) {
    res.status(403).json({
      error: {
        message: error.message,
      },
    });
  }
};
