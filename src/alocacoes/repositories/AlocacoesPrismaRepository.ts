import { Injectable } from '@nestjs/common';

import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateAlocacaoDto } from '../dto/create-alocacao.dto';
import { UpdateAlocacaoDto } from '../dto/update-alocacao.dto';
import { Alocacao } from '../entities/alocacao.entity';
import {
  AlocacaoResult,
  IAlocacoesRepository,
} from './IAlocacoesPrismaRepository';

@Injectable()
export class AlocacoesPrismaRepository implements IAlocacoesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createAlocacoesDto: CreateAlocacaoDto): Promise<AlocacaoResult> {
    try {
      const newAlocacao = await this.prismaService.alocacao.create({
        data: createAlocacoesDto,
        select: {
          id: true,
          local: true,
          horario: true,
        },
      });

      return { alocacao: newAlocacao as Alocacao };
    } catch (err: unknown) {
      let error: string = '';
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2002') error = 'conflict';
        if (err.code === 'P2003') error = 'bad request';
      }

      return {
        error,
      };
    }
  }

  async findAll(): Promise<Alocacao[]> {
    const alocacoes = await this.prismaService.alocacao.findMany({
      select: {
        id: true,
        local: true,
        horario: true,
      },
    });

    return alocacoes as Alocacao[];
  }

  async findOne(id: string): Promise<Alocacao | null> {
    const alocacao = await this.prismaService.alocacao.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        local: true,
        horario: true,
      },
    });

    return alocacao as Alocacao;
  }

  async update(
    id: string,
    updateAlocacoesDto: UpdateAlocacaoDto,
  ): Promise<AlocacaoResult> {
    try {
      const updatedAlocacao = await this.prismaService.alocacao.update({
        where: { id },
        data: updateAlocacoesDto,
        select: {
          id: true,
          local: true,
          horario: true,
        },
      });

      return { alocacao: updatedAlocacao } as AlocacaoResult;
    } catch (err) {
      let error: string = '';
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2002') error = 'conflict';
        if (err.code === 'P2003') error = 'bad request';
      }

      return {
        error,
      };
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.prismaService.alocacao.delete({
        where: {
          id,
        },
      });

      return true;
    } catch (err) {
      return false;
    }
  }
}
