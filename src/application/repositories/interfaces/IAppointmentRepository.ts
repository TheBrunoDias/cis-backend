import { Appointment } from './../../../entities/Appointment';

type AppointmentFilterProps = {
  type?: 'CLINICA_ESCOLA' | 'CLINICA_POPULAR';
  status?: 'PAID' | 'AWAITING_PAYMENT' | 'CANCELED';
  dateInit?: Date;
  dateEnd?: Date;
  patientId?: string;
  professionalId?: string;
  internId?: string;
  appointmentPackId?: string;
};

export interface IAppointmentRepository {
  list(props: AppointmentFilterProps): Promise<Appointment[]>;
  findById(id: string): Promise<Appointment | null>;
  create(appointment: Appointment): Promise<Appointment>;
  update(appointment: Appointment): Promise<void>;
  delete(appointment: Appointment): Promise<void>;
}
