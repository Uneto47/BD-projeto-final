import { Injectable } from '@nestjs/common';

import { CreateHorarioDto } from '../dto/create-horario.dto';
import { Horario } from '../entities/horario.entity';

import { PrismaService } from '../../prisma/prisma.service';
import { UpdateHorarioDto } from '../dto/update-horario.dto';
import { IHorariosRepository } from './IHorariosPrismaRepository';

@Injectable()
export class HorariosPrismaRepository implements IHorariosRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createHorarioDto: CreateHorarioDto): Promise<Horario> {
    const newHorario = await this.prismaService.horario.create({
      data: createHorarioDto,
    });

    return newHorario as Horario;
  }

  async findByTime(horaInicial: Date, horaFinal: Date): Promise<boolean> {
    const dadosEncontrados = await this.prismaService.horario.findFirst({
      where: {
        AND: [
          {
            hora_inicial: {
              equals: horaInicial,
            },
          },
          {
            hora_final: {
              equals: horaFinal,
            },
          },
        ],
      },
    });

    return dadosEncontrados !== null;
  }

  async findAll(): Promise<Horario[]> {
    return await this.prismaService.horario.findMany({});
  }

  async findOne(id: string): Promise<Horario | null> {
    return await this.prismaService.horario.findFirst({
      where: {
        id,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.horario.delete({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateHorarioDto: UpdateHorarioDto): Promise<Horario> {
    const updatedHorario = await this.prismaService.horario.update({
      where: { id },
      data: updateHorarioDto,
    });

    return updatedHorario;
  }
}
