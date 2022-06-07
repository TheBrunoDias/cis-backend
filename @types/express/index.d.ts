import { TokenPayload } from '../../src/core/domain/TokenPayload';

declare global {
  namespace Express {
    interface Request {
      user: TokenPayload;
    }
  }
}
