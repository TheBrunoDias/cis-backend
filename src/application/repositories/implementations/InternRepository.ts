import { prisma } from '../../../database/client';
import { Intern } from '../../../entities/Intern';
import { IInternRepository } from '../interfaces/IInternRepository';

export class InternRepository implements IInternRepository {
  private internQuery = prisma.intern;

  async list(props: {
    name?: string | undefined;
    studentId?: string | undefined;
    email?: string | undefined;
    phone?: string | undefined;
    specialtyId?: string | undefined;
  }): Promise<Intern[]> {
    const interns = await this.internQuery.findMany({
      where: {
        OR: [
          {
            name: {
              contains: props.name,
              mode: 'insensitive',
            },
          },
          {
            studentId: props.specialtyId,
          },
          {
            email: props.email,
          },
          {
            phone: props.phone,
          },
          {
            specialtyId: props.specialtyId,
          },
        ],
      },
      include: { specialty: true },
    });

    return interns.map((i) => Intern.create(i, i.id));
  }

  async findById(id: string): Promise<Intern | null> {
    const intern = await this.internQuery.findUnique({ where: { id }, include: { specialty: true } });

    if (intern) {
      return Intern.create(intern, intern?.id);
    }
    return null;
  }

  async create(intern: Intern): Promise<Intern> {
    const { email, friday, monday, name, phone, saturday, specialty, studentId, sunday, thursday, tuesday, wednesday } =
      intern.props;
    const created = await this.internQuery.create({
      data: {
        email,
        friday,
        monday,
        name,
        phone,
        saturday,
        studentId,
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
      include: {
        specialty: true,
      },
    });

    return Intern.create(created, created.id);
  }

  async update(intern: Intern): Promise<void> {
    const {
      email,
      friday,
      monday,
      phone,
      saturday,
      sunday,
      thursday,
      tuesday,
      wednesday,
      enabled,
      name,
      specialty,
      studentId,
    } = intern.props;
    await this.internQuery.update({
      where: { id: intern.id },
      data: {
        email,
        friday,
        monday,
        name,
        phone,
        saturday,
        studentId,
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
    });
  }

  async delete(intern: Intern): Promise<void> {
    await this.internQuery.delete({ where: { id: intern.id } });
  }
}
