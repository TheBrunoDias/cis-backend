import { Room } from '../../../entities/Room';

export interface IRoomRepository {
  list(): Promise<Room[]>;
  findById(id: string): Promise<Room | null>;
  create(room: Room): Promise<Room>;
  update(room: Room): Promise<void>;
  delete(room: Room): Promise<void>;
}
