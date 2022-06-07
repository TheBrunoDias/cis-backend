import { prisma } from '../../../database/client';
import { Specialty } from '../../../entities/Specialty';
import { ISpecialtyRepository } from './../interfaces/ISpecialtyRepository';

export class SpecialtyRepository implements ISpecialtyRepository {
  private specialtyQuery = prisma.specialty;

  async list(): Promise<Specialty[]> {
    const specialties = await this.specialtyQuery.findMany();

    return specialties.map((s) => Specialty.create(s, s.id));
  }

  async findById(id: string): Promise<Specialty | null> {
    const specialty = await this.specialtyQuery.findUnique({ where: { id } });

    if (specialty) {
      return Specialty.create(specialty, specialty.id);
    }

    return null;
  }

  async create(specialty: Specialty): Promise<Specialty> {
    const created = await this.specialtyQuery.create({
      data: {
        name: specialty.props.name,
        healthInsurencePrice: specialty.props.healthInsurencePrice,
        privatePrice: specialty.props.privatePrice,
        color: specialty.props.color,
        description: specialty.props.description,
      },
    });

    return Specialty.create(created, created.id);
  }

  async update(specialty: Specialty): Promise<void> {
    await this.specialtyQuery.update({
      where: { id: specialty.id },
      data: {
        healthInsurencePrice: specialty.props.healthInsurencePrice,
        privatePrice: specialty.props.privatePrice,
        color: specialty.props.color,
        description: specialty.props.description,
        enabled: specialty.props.enabled,
      },
    });
  }

  async delete(specialty: Specialty): Promise<void> {
    await this.specialtyQuery.delete({ where: { id: specialty.id } });
  }
}
