import { Intern } from '../../../entities/Intern';

type InternFilterProps = {
  name?: string;
  studentId?: string;
  email?: string;
  phone?: string;
  specialtyId?: string;
};

export interface IInternRepository {
  list(props: InternFilterProps): Promise<Intern[]>;
  findById(id: string): Promise<Intern | null>;
  create(intern: Intern): Promise<Intern>;
  update(intern: Intern): Promise<void>;
  delete(intern: Intern): Promise<void>;
}
