import { prisma } from '../../../database/client';
import { Room } from '../../../entities/Room';
import { IRoomRepository } from '../interfaces/IRoomRepository';

export class RoomRepository implements IRoomRepository {
  private roomQuery = prisma.room;

  async list(): Promise<Room[]> {
    const query = await this.roomQuery.findMany({
      include: {
        specialties: {
          select: {
            specialty: true,
          },
        },
      },
    });

    return query.map((q) =>
      Room.create(
        {
          ...q,
          specialties: q.specialties.map((s) => s.specialty),
        },
        q.id
      )
    );
  }

  async findById(id: string): Promise<Room | null> {
    const room = await this.roomQuery.findUnique({
      where: { id },
      include: { specialties: { select: { specialty: true } } },
    });

    if (room) {
      return Room.create(
        {
          ...room,
          specialties: room.specialties.map((s) => s.specialty),
        },
        room.id
      );
    }

    return null;
  }

  async create(room: Room): Promise<Room> {
    const created = await this.roomQuery.create({
      data: {
        name: room.props.name,
        description: room.props.description,
        specialties: {
          createMany: {
            data: room.props.specialties.map((s) => {
              return {
                specialtyId: s.id,
              };
            }),
          },
        },
      },
      include: {
        specialties: {
          select: {
            specialty: true,
          },
        },
      },
    });

    return Room.create(
      {
        ...created,
        specialties: created.specialties.map((s) => s.specialty),
      },
      created.id
    );
  }

  async update(room: Room): Promise<void> {
    await this.roomQuery.update({
      where: { id: room.id },
      data: {
        description: room.props.description,
        enabled: room.props.enabled,
        name: room.props.name,
      },
    });
  }

  async delete(room: Room): Promise<void> {
    await this.roomQuery.delete({ where: { id: room.id } });
  }
}
