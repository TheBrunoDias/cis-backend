import { prisma } from '../../../database/client';
import { User } from '../../../entities/User';
import { IUserRepository } from '../interfaces/IUserRepository';

export class UserRepository implements IUserRepository {
  private userQuery = prisma.user;

  async list(): Promise<User[]> {
    const users = await this.userQuery.findMany();

    return users.map((u) => User.create(u, u.id));
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.userQuery.findUnique({ where: { id } });

    if (user) {
      return User.create(user, user.id);
    }
    return null;
  }

  async create(user: User): Promise<User> {
    const created = await this.userQuery.create({
      data: {
        username: user.props.username,
        password: user.props.password,
        role: user.props.role,
      },
    });

    return User.create(created, created.id);
  }

  async update(user: User): Promise<void> {
    await this.userQuery.update({
      where: { id: user.id },
      data: {
        password: user.props.password,
        enabled: user.props.enabled,
      },
    });
  }

  async delete(user: User): Promise<void> {
    await this.userQuery.delete({ where: { id: user.id } });
  }
}
