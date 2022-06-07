import { ServicePack } from '../../../entities/ServicePack';

export interface IServicePackRepository {
  list(): Promise<ServicePack[]>;
  findById(id: string): Promise<ServicePack | null>;
  create(servicePack: ServicePack): Promise<ServicePack>;
  update(servicePack: ServicePack): Promise<void>;
  delete(servicePack: ServicePack): Promise<void>;
}
