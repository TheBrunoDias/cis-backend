import { Entity } from '../core/domain/Entity';
import { SpecialtyInListProps } from './Specialty';

type RoomProps = {
  name: string;
  description: string | null;
  enabled?: boolean;
  specialties: SpecialtyInListProps[];
};

export class Room extends Entity<RoomProps> {
  private constructor(props: RoomProps, id?: string) {
    super(props, id);
  }

  static create(props: RoomProps, id?: string) {
    const room = new Room(props, id);

    return room;
  }
}
