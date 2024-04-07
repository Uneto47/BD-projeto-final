import { CreateHorarioDto } from '../dto/create-horario.dto';
import { UpdateHorarioDto } from '../dto/update-horario.dto';
import { Horario } from "../entities/horario.entity";

type Optional<T> = { [K in keyof T]?: T[K] };

export abstract class IHorariosRepository {
  abstract create(createHorarioDto: CreateHorarioDto): Promise<Horario>;

  abstract findAll(): Promise<Horario[]>;

  abstract findOne(id: string): Promise<Horario | null>;

  abstract findByTime(horaInicial: Date, horaFinal: Date): Promise<boolean>;

  abstract delete(id: string): Promise<void>;

  abstract update(id: string, updateHorarioDto:UpdateHorarioDto): Promise<Horario>;
}
