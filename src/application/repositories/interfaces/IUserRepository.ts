import { User } from '../../../entities/User';

export interface IUserRepository {
  list(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  create(user: User): Promise<User>;
  update(user: User): Promise<void>;
  delete(user: User): Promise<void>;
}
