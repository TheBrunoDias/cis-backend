import { phoneAndDocumentFormat } from '../application/utils/formatter';
import { Entity } from '../core/domain/Entity';
import { ProfessionalInListProps } from './Professional';

type PatientProps = {
  enabled?: boolean;
  name: string;
  socialName: string | null;
  document: string;
  documentType: 'CPF' | 'RG' | 'RNA' | 'CNH';
  email: string | null;
  phone: string;
  address: string;
  disability: boolean;
  disabilityDescription: string | null;
  professional: ProfessionalInListProps;
};

export class Patient extends Entity<PatientProps> {
  private constructor(props: PatientProps, id?: string) {
    super(props, id);
  }

  static create(props: PatientProps, id?: string) {
    props.document = phoneAndDocumentFormat(props.document);
    props.phone = phoneAndDocumentFormat(props.phone);
    const patient = new Patient(props, id);

    return patient;
  }
}

export type PatientListProps = {
  id: string;
  name: string;
  socialName?: string;
  document: string;
  phone: string;
};
