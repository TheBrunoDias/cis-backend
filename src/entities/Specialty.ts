import { Entity } from '../core/domain/Entity';

type SpecialtyProps = {
  enabled?: boolean;
  name: string;
  healthInsurencePrice: number;
  privatePrice: number;
  description: string | null;
  color?: string;
};

export class Specialty extends Entity<SpecialtyProps> {
  private constructor(props: SpecialtyProps, id?: string) {
    super(props, id);
  }

  static create(props: SpecialtyProps, id?: string) {
    const specialty = new Specialty(props, id);

    return specialty;
  }
}

export type SpecialtyInListProps = {
  id: string;
  name: string;
  color: string;
};
