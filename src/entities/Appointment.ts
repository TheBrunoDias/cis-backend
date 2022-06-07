import { Entity } from '../core/domain/Entity';
import { InternListProps } from './Intern';
import { PatientListProps } from './Patient';
import { ProfessionalInListProps } from './Professional';

type AppointmentProps = {
  type: 'CLINICA_ESCOLA' | 'CLINICA_POPULAR';
  status?: 'PAID' | 'AWAITING_PAYMENT' | 'CANCELED';
  patient: PatientListProps;
  dateTime: Date;
  description: string | null;
  price: number;
  totalPaid: number;
  professional: ProfessionalInListProps | null;
  interns: InternListProps[] | null;
  appointmentPackId: string | null;
};

export class Appointment extends Entity<AppointmentProps> {
  private constructor(props: AppointmentProps, id?: string) {
    super(props, id);
  }

  static create(props: AppointmentProps, id?: string) {
    var appointment = new Appointment(props, id);

    return appointment;
  }
}

export type AppointmentListProps = {
  id: string;
  patient: PatientListProps;
  dateTime: Date;
};
