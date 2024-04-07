import { Injectable } from '@nestjs/common';

import { CreateLocalDto } from '@src/locais/dto/create-local.dto';
import { Local } from '@src/locais/entities/local.entity';

import { PrismaService } from '../../prisma/prisma.service';
import { UpdateLocalDto } from '../dto/update-local.dto';
import { ILocaisRepository } from './ILocaisRepository';

type Optional<T> = { [K in keyof T]?: T[K] };
@Injectable()
export class LocaisPrismaRepository implements ILocaisRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createLocalDto: CreateLocalDto): Promise<Local> {
    const newLocal = await this.prismaService.local.create({
      data: createLocalDto,
    });

    return newLocal as Local;
  }

  async localAlreadyExists(data: Optional<Local>): Promise<boolean> {
    const { capacidade, ...dataToBeSearched } = data;
    return !!(await this.prismaService.local.findFirst({
      where: {
        ...dataToBeSearched,
      },
    }));
  }

  async findAll(): Promise<Local[]> {
    return await this.prismaService.local.findMany({});
  }

  async findOne(id: string): Promise<Local | null> {
    return await this.prismaService.local.findFirst({
      where: {
        id,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.local.delete({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateLocalDto: UpdateLocalDto): Promise<Local> {
    const updatedLocal = await this.prismaService.local.update({
      where: { id },
      data: updateLocalDto,
    });

    return updatedLocal;
  }
}
