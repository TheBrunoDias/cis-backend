import { prisma } from '../../../database/client';
import { ServicePack } from '../../../entities/ServicePack';
import { IServicePackRepository } from './../interfaces/IServicePackRepository';

export class ServicePackRepository implements IServicePackRepository {
  private servicePackQuery = prisma.servicePack;

  async list(): Promise<ServicePack[]> {
    const services = await this.servicePackQuery.findMany({
      include: {
        specialty: true,
      },
    });

    return services.map((s) =>
      ServicePack.create(
        {
          ...s,
          specialty: s.specialty,
        },
        s.id
      )
    );
  }
  async findById(id: string): Promise<ServicePack | null> {
    const service = await this.servicePackQuery.findUnique({ where: { id }, include: { specialty: true } });

    if (service) {
      return ServicePack.create(
        {
          ...service,
          specialty: service.specialty,
        },
        service.id
      );
    }

    return null;
  }
  async create(servicePack: ServicePack): Promise<ServicePack> {
    const service = await this.servicePackQuery.create({
      data: {
        name: servicePack.props.name,
        quantity: servicePack.props.quantity,
        pricePerAppointment: servicePack.props.pricePerAppointment,
        specialty: {
          connect: {
            id: servicePack.props.specialty.id,
          },
        },
      },
      include: {
        specialty: true,
      },
    });

    return ServicePack.create(
      {
        ...service,
        specialty: service.specialty,
      },
      service.id
    );
  }
  async update(servicePack: ServicePack): Promise<void> {
    await this.servicePackQuery.update({
      where: { id: servicePack.id },
      data: {
        quantity: servicePack.props.quantity,
        pricePerAppointment: servicePack.props.pricePerAppointment,
      },
    });
  }
  async delete(servicePack: ServicePack): Promise<void> {
    await this.servicePackQuery.delete({ where: { id: servicePack.id } });
  }
}
