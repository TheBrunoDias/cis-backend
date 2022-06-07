import { Entity } from '../core/domain/Entity';

type UserProps = {
  enabled?: boolean;
  username: string;
  password: string;
  role: 'ADMIN' | 'SECRETARY' | 'TECHNICAL_MANAGER' | 'INTERN';
};

export class User extends Entity<UserProps> {
  private constructor(props: UserProps, id?: string) {
    super(props, id);
  }

  static create(props: UserProps, id?: string) {
    const user = new User(props, id);

    return user;
  }
}
