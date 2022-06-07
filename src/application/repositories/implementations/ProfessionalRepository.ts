import { prisma } from '../../../database/client';
import { Professional } from '../../../entities/Professional';
import { IProfessionalRepository } from '../interfaces/IProfessionalRepository';

export class ProfessionalRepository implements IProfessionalRepository {
  private professionalQuery = prisma.professional;

  async list(props: {
    name?: string | undefined;
    specialtyId?: string | undefined;
    email?: string | undefined;
    phone?: string | undefined;
  }): Promise<Professional[]> {
    const professionals = await this.professionalQuery.findMany({
      where: {
        OR: [
          {
            name: {
              contains: props.name,
              mode: 'insensitive',
            },
          },
          {
            specialtyId: props.specialtyId,
          },
          {
            email: props.email,
          },
          {
            phone: props.phone,
          },
        ],
      },
      include: {
        specialty: true,
      },
    });

    return professionals.map((p) =>
      Professional.create(
        {
          ...p,
          specialty: p.specialty,
        },
        p.id
      )
    );
  }

  async findById(id: string): Promise<Professional | null> {
    const professional = await this.professionalQuery.findUnique({ where: { id }, include: { specialty: true } });

    if (professional) {
      return Professional.create(professional, professional.id);
    }

    return null;
  }

  async create(professional: Professional): Promise<Professional> {
    const {
      email,
      name,
      friday,
      professionalDocument,
      monday,
      phone,
      saturday,
      specialty,
      sunday,
      thursday,
      tuesday,
      wednesday,
    } = professional.props;

    const created = await this.professionalQuery.create({
      data: {
        email,
        professionalDocument,
        name,
        friday,
        monday,
        phone,
        saturday,
        sunday,
        thursday,
        tuesday,
        wednesday,
        specialty: {
          connect: {
            id: specialty.id,
          },
        },
      },
      include: { specialty: true },
    });

    return Professional.create(created, created.id);
  }

  async update(professional: Professional): Promise<void> {
    const { email, name, friday, professionalDocument, monday, phone, saturday, sunday, thursday, tuesday, wednesday } =
      professional.props;
    await this.professionalQuery.update({
      where: { id: professional.id },
      data: {
        email,
        name,
        friday,
        professionalDocument,
        monday,
        phone,
        saturday,
        sunday,
        thursday,
        tuesday,
        wednesday,
      },
    });
  }

  async delete(professional: Professional): Promise<void> {
    await this.professionalQuery.delete({ where: { id: professional.id } });
  }
}
