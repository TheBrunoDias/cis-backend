import { AppointmentPack } from '../../../entities/AppointmentPack';

export interface IAppointmentPackRepository {
  findById(id: string): Promise<AppointmentPack | null>;
  create(appointmentPack: AppointmentPack): Promise<AppointmentPack>;
  delete(appointmentPack: AppointmentPack): Promise<void>;
}
