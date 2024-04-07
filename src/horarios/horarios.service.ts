import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateHorarioDto } from './dto/create-horario.dto';
import { UpdateHorarioDto } from './dto/update-horario.dto';
import { Horario } from './entities/horario.entity';
import { IHorariosRepository } from './repositories/IHorariosPrismaRepository';

@Injectable()
export class HorariosService {
  constructor(private horariosRepository: IHorariosRepository){}
 
  async create({ hora_inicial, hora_final, diasDiferentes}: CreateHorarioDto): Promise<Horario> {
    const [hi, mi, si] = hora_inicial.split(":").map(Number)
    const [hf, mf, sf] = hora_final.split(":").map(Number)
    const dateInicial = new Date(2024, 0, 1, hi-3, mi, si).toISOString()
    const dateFinal = new Date(2024, 0, 1, hf-3, mf, sf).toISOString()
    const dI = new Date(2024, 0, 1, hi-3, mi, si)
    const dF = new Date(2024, 0, 1, hf-3, mf, sf)

    if (!diasDiferentes){
      if(dateInicial >= dateFinal) throw new ConflictException('Os horários devem estar em dias diferentes.');
    }

    const horarioExistente = await this.horariosRepository.findByTime(dI, dF);
    if (horarioExistente) {
      throw new ConflictException('Este horário já foi cadastrado.');
    }
    
    const horario = await this.horariosRepository.create({
      hora_inicial: dateInicial,
      hora_final: dateFinal,
    });
    return horario;
  }

  async findAll(): Promise<Horario[]> {
    const horarios = await this.horariosRepository.findAll();
    return horarios;
  }

  async findOne(id: string): Promise<Horario> {
    const horario = await this.horariosRepository.findOne(id);
    if (!horario) throw new NotFoundException(`Horario não encontrado.`);
    return horario;
  }

  async update(id: string, {hora_inicial, hora_final}: UpdateHorarioDto): Promise<Horario> {
    await this.findOne(id);
    
    const [hi, mi, si] = hora_inicial.split(":").map(Number)
    const [hf, mf, sf] = hora_final.split(":").map(Number)
    
    const dateInicial = new Date(2024, 0, 1, hi-3, mi, si).toISOString()
    const dateFinal = new Date(2024, 0, 1, hf-3, mf, sf).toISOString()
  
    const updatedHorario = await this.horariosRepository.update(id,{
      hora_inicial: dateInicial,
      hora_final: dateFinal
    });
    return updatedHorario;
  }

  async delete(id: string): Promise<void> {
    await this.findOne(id);
    await this.horariosRepository.delete(id);
  }
}