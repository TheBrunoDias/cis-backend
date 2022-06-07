import { Entity } from '../core/domain/Entity';
import { phoneAndDocumentFormat, stringHourValidation } from '../application/utils/formatter';
import { SpecialtyInListProps } from './Specialty';

type InternProps = {
  enabled?: boolean;
  name: string;
  studentId: string;
  email: string;
  phone: string;
  specialty: SpecialtyInListProps;
  monday: string[];
  tuesday: string[];
  wednesday: string[];
  thursday: string[];
  friday: string[];
  saturday: string[];
  sunday: string[];
};
export class Intern extends Entity<InternProps> {
  private constructor(props: InternProps, id?: string) {
    super(props, id);
  }

  static create(props: InternProps, id?: string) {
    props.monday.forEach((s) => stringHourValidation(s));
    props.tuesday.forEach((s) => stringHourValidation(s));
    props.wednesday.forEach((s) => stringHourValidation(s));
    props.thursday.forEach((s) => stringHourValidation(s));
    props.friday.forEach((s) => stringHourValidation(s));
    props.saturday.forEach((s) => stringHourValidation(s));
    props.sunday.forEach((s) => stringHourValidation(s));
    props.phone = phoneAndDocumentFormat(props.phone);

    return new Intern(props, id);
  }
}

export type InternListProps = {
  id: string;
  name: string;
  studentId: string;
};
