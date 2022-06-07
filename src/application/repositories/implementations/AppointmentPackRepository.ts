import { prisma } from '../../../database/client';
import { AppointmentPack } from '../../../entities/AppointmentPack';
import { IAppointmentPackRepository } from '../interfaces/IAppointmentPackRepository';

export class AppointmentPackRepository implements IAppointmentPackRepository {
  private appointmentPackQuery = prisma.appointmentPack;

  async findById(id: string): Promise<AppointmentPack | null> {
    const pack = await this.appointmentPackQuery.findUnique({
      where: { id },
      include: {
        appointments: { include: { patient: true } },
      },
    });

    if (pack) {
      return AppointmentPack.create(pack, pack.id);
    }

    return null;
  }

  async create(appointmentPack: AppointmentPack): Promise<AppointmentPack> {
    const created = await this.appointmentPackQuery.create({
      data: {
        servicePack: {
          connect: {
            id: appointmentPack.props.servicePackId,
          },
        },
      },
      include: {
        appointments: { include: { patient: true } },
      },
    });

    return AppointmentPack.create(created, created.id);
    throw new Error('Method not implemented.');
  }

  async delete(appointmentPack: AppointmentPack): Promise<void> {
    await this.appointmentPackQuery.delete({ where: { id: appointmentPack.id } });
  }
}
