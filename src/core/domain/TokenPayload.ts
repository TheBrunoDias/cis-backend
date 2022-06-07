import { Role } from '@prisma/client';
import { Scope } from './Scopes';

export type TokenPayload = {
  id: string;
  role: Role;
  username: string;
  scopes: Scope[];
};
