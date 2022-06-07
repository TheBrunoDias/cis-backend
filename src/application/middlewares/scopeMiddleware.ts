import { NextFunction, Request, Response } from 'express';
import { Scope } from '../../core/domain/Scopes';

export const scopeMiddleware = (scope: Scope) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const { scopes } = req.user;

      if (!scopes || scopes.length === 0) throw new Error('Você Não tem permissão');

      const find = scopes.find((s) => s === scope);

      if (!find) throw new Error('Você Não tem permissão');

      return next();
    } catch (error) {
      return res.status(403).json({
        error: {
          message: error.message,
        },
      });
    }
  };
};
