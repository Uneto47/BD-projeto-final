import { CreateHorarioDto } from '@src/horarios/dto/create-horario.dto';
import { UpdateHorarioDto } from '@src/horarios/dto/update-horario.dto';
import { Horario } from '../../entities/horario.entity';
import { IHorariosRepository } from '@src/horarios/repositories/IHorariosPrismaRepository';

export class HorariosInMemoryRepository implements IHorariosRepository {
  private horarios: Horario[] = [];

  async create(createHorarioDto: CreateHorarioDto): Promise<Horario> {
    const newHorario = new Horario();
    Object.assign(newHorario, { ...createHorarioDto });

    this.horarios.push(newHorario);
    return newHorario;
  }
  
  async findByTime(horaInicial: Date, horaFinal: Date): Promise<boolean> {
    const dadosEncontrados = this.horarios.find((currentHorario) => currentHorario.hora_final === horaFinal && currentHorario.hora_inicial === horaInicial);
    return dadosEncontrados !== undefined
  }

  async findAll(): Promise<Horario[]> {
    return [...this.horarios];
  }

  async findOne(id: string): Promise<Horario | null> {
    const horario = this.horarios.find((currentHorario) => currentHorario.id === id);
    return horario ?? null;
  }

  async delete(id: string): Promise<void> {
    this.horarios = this.horarios.filter((horario) => horario.id !== id);
  }

  async update(id: string, updateHorarioDto: UpdateHorarioDto): Promise<Horario> {
    const horarioToBeUpdated = (await this.findOne(id)) as Horario;

    Object.assign(horarioToBeUpdated, updateHorarioDto);

    return horarioToBeUpdated;
  }
}
