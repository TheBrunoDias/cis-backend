import { Entity } from '../core/domain/Entity';
import { phoneAndDocumentFormat, stringHourValidation } from '../application/utils/formatter';
import { SpecialtyInListProps } from './Specialty';

type ProfessionalProps = {
  enabled?: boolean;
  name: string;
  email: string;
  phone: string;
  professionalDocument: string;
  specialty: SpecialtyInListProps;
  monday: string[];
  tuesday: string[];
  wednesday: string[];
  thursday: string[];
  friday: string[];
  saturday: string[];
  sunday: string[];
};
export class Professional extends Entity<ProfessionalProps> {
  private constructor(props: ProfessionalProps, id?: string) {
    super(props, id);
  }

  static create(props: ProfessionalProps, id?: string) {
    props.monday.forEach((s) => stringHourValidation(s));
    props.tuesday.forEach((s) => stringHourValidation(s));
    props.wednesday.forEach((s) => stringHourValidation(s));
    props.thursday.forEach((s) => stringHourValidation(s));
    props.friday.forEach((s) => stringHourValidation(s));
    props.saturday.forEach((s) => stringHourValidation(s));
    props.sunday.forEach((s) => stringHourValidation(s));
    props.phone = phoneAndDocumentFormat(props.phone);
    props.professionalDocument = phoneAndDocumentFormat(props.professionalDocument);
    return new Professional(props, id);
  }
}

export type ProfessionalInListProps = {
  id: string;
  name: string;
};
