import jwt from 'jsonwebtoken';
import { TokenPayload } from '../../core/domain/TokenPayload';

const SECRET = `${process.env.JWT_SECRET}`;
const EXPIRES_IN = '4h';

const signToken = (payload: TokenPayload) => {
  const token = jwt.sign(payload, SECRET, { expiresIn: EXPIRES_IN });
  return token;
};

const decodedToken = (token: string) => {
  const verify = jwt.verify(token, SECRET);
  return verify;
};

export { signToken, decodedToken };
