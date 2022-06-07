import { Specialty } from '../../../entities/Specialty';

export interface ISpecialtyRepository {
  list(): Promise<Specialty[]>;
  findById(id: string): Promise<Specialty | null>;
  create(specialty: Specialty): Promise<Specialty>;
  update(specialty: Specialty): Promise<void>;
  delete(specialty: Specialty): Promise<void>;
}
