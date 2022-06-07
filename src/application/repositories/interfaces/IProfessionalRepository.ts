import { Professional } from '../../../entities/Professional';

type ProfessionalFilterProps = {
  name?: string;
  specialtyId?: string;
  email?: string;
  phone?: string;
};

export interface IProfessionalRepository {
  list(props: ProfessionalFilterProps): Promise<Professional[]>;
  findById(id: string): Promise<Professional | null>;
  create(professional: Professional): Promise<Professional>;
  update(professional: Professional): Promise<void>;
  delete(professional: Professional): Promise<void>;
}
