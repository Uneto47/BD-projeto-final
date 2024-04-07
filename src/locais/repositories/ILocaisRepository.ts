import { CreateLocalDto } from '../dto/create-local.dto';
import { UpdateLocalDto } from '../dto/update-local.dto';
import { Local } from '../entities/local.entity';

type Optional<T> = { [K in keyof T]?: T[K] };

export abstract class ILocaisRepository {
  abstract create(createLocalDto: CreateLocalDto): Promise<Local>;

  abstract localAlreadyExists(data: Optional<Local>): Promise<boolean>;

  abstract findAll(): Promise<Local[]>;

  abstract findOne(id: string): Promise<Local | null>;

  abstract delete(id: string): Promise<void>;

  abstract update(id: string, updateLocalDto: UpdateLocalDto): Promise<Local>;
}
