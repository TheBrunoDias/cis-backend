import { prisma } from '../../../database/client';
import { Appointment } from '../../../entities/Appointment';
import { IAppointmentRepository } from './../interfaces/IAppointmentRepository';

export class AppointmentRepository implements IAppointmentRepository {
  private appointmentQuery = prisma.appointment;

  async list(props: {
    type?: 'CLINICA_ESCOLA' | 'CLINICA_POPULAR' | undefined;
    status?: 'PAID' | 'AWAITING_PAYMENT' | 'CANCELED' | undefined;
    dateInit?: Date | undefined;
    dateEnd?: Date | undefined;
    patientId?: string | undefined;
    professionalId?: string | undefined;
    internId?: string | undefined;
    appointmentPackId?: string | undefined;
  }): Promise<Appointment[]> {
    const appointments = await this.appointmentQuery.findMany({
      where: {
        type: props.type,
        status: props.status,
        dateTime: {
          gte: props.dateInit,
          lte: props.dateEnd,
        },
        patientId: props.patientId,
        professionalId: props.professionalId,
        interns: props.internId
          ? {
              every: {
                internId: props.internId,
              },
            }
          : undefined,
      },
      include: {
        interns: {
          select: {
            intern: true,
          },
        },
        professional: true,
        patient: true,
      },
    });

    return appointments.map((a) =>
      Appointment.create(
        {
          ...a,
          professional: a.professional
            ? {
                id: a.professional.id,
                name: a.professional.name,
              }
            : null,
          interns: a.interns ? a.interns.map((intern) => intern.intern) : null,
        },
        a.id
      )
    );
  }

  async findById(id: string): Promise<Appointment | null> {
    const appointment = await this.appointmentQuery.findUnique({
      where: { id },
      include: {
        interns: {
          select: {
            intern: true,
          },
        },
        professional: true,
        patient: true,
      },
    });

    if (appointment) {
      return Appointment.create(
        {
          ...appointment,
          professional: appointment.professional
            ? {
                id: appointment.professional.id,
                name: appointment.professional.name,
              }
            : null,
          interns: appointment.interns ? appointment.interns.map((intern) => intern.intern) : null,
        },
        appointment.id
      );
    }

    return null;
  }

  async create(appointment: Appointment): Promise<Appointment> {
    const { appointmentPackId, dateTime, description, interns, patient, price, professional, totalPaid, type, status } =
      appointment.props;

    const created = await this.appointmentQuery.create({
      data: {
        AppointmentPack: appointmentPackId
          ? {
              connect: {
                id: appointmentPackId,
              },
            }
          : undefined,
        dateTime,
        patient: {
          connect: {
            id: patient.id,
          },
        },
        price,
        totalPaid,
        type,
        description,
        status,
        professional: {
          connect: {
            id: professional?.id,
          },
        },
        interns: interns
          ? {
              createMany: {
                data: interns.map((i) => {
                  return {
                    internId: i.id,
                  };
                }),
              },
            }
          : undefined,
      },
      include: {
        interns: {
          select: {
            intern: true,
          },
        },
        professional: true,
        patient: true,
      },
    });

    return Appointment.create(
      {
        ...created,
        professional: created.professional
          ? {
              id: created.professional.id,
              name: created.professional.name,
            }
          : null,
        interns: created.interns ? created.interns.map((intern) => intern.intern) : null,
      },
      created.id
    );
  }

  async update(appointment: Appointment): Promise<void> {
    const { dateTime, description, interns, price, professional, totalPaid, status } = appointment.props;

    await prisma.internsInAppointment.deleteMany({
      where: {
        appointmentId: appointment.id,
      },
    });

    await this.appointmentQuery.update({
      where: { id: appointment.id },
      data: {
        dateTime,
        description,
        price,
        totalPaid,
        status,
        professional: professional
          ? {
              connect: {
                id: professional?.id,
              },
            }
          : undefined,
        interns: interns
          ? {
              createMany: {
                data: interns.map((i) => {
                  return {
                    internId: i.id,
                  };
                }),
                skipDuplicates: true,
              },
            }
          : undefined,
      },
    });
  }

  async delete(appointment: Appointment): Promise<void> {
    await this.appointmentQuery.delete({ where: { id: appointment.id } });
  }
}
