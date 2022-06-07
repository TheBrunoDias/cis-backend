import { Entity } from '../core/domain/Entity';
import { SpecialtyInListProps } from './Specialty';

type ServicePackProps = {
  enabled?: boolean;
  name: string;
  specialty: SpecialtyInListProps;
  quantity: number;
  pricePerAppointment: number;
};

export class ServicePack extends Entity<ServicePackProps> {
  private constructor(props: ServicePackProps, id?: string) {
    super(props, id);
  }

  static create(props: ServicePackProps, id?: string) {
    var servicePack = new ServicePack(props, id);

    return servicePack;
  }
}
