import { Entity } from '../core/domain/Entity';
import { AppointmentListProps } from './Appointment';
import { ServicePack } from './ServicePack';

type AppointmentPackProps = {
  servicePackId: string;
  appointments: AppointmentListProps[];
};

export class AppointmentPack extends Entity<AppointmentPackProps> {
  private constructor(props: AppointmentPackProps, id?: string) {
    super(props, id);
  }

  static create(props: AppointmentPackProps, id?: string) {
    var appointmentPack = new AppointmentPack(props, id);

    return appointmentPack;
  }
}
