import { CreateAlocacaoDto } from '@src/alocacoes/dto/create-alocacao.dto';
import { UpdateAlocacaoDto } from '@src/alocacoes/dto/update-alocacao.dto';

import { Alocacao } from '../../entities/alocacao.entity';
import {
  AlocacaoResult,
  IAlocacoesRepository,
} from '../IAlocacoesPrismaRepository';

export class AlocacoesInMemoryRepository implements IAlocacoesRepository {
  private alocacoes: Alocacao[] = [];

  async create(createAlocacaoDto: CreateAlocacaoDto): Promise<AlocacaoResult> {
    const findDuplicate = this.alocacoes.find((alocacao) => {
      if (
        alocacao.horario_id === createAlocacaoDto.horario_id &&
        alocacao.local_id === createAlocacaoDto.local_id
      )
        return true;
    });

    if (findDuplicate) {
      return { error: 'conflict' } as AlocacaoResult;
    }

    const newAlocacao = new Alocacao();
    Object.assign(newAlocacao, { ...createAlocacaoDto });
    newAlocacao.id = '0';
    this.alocacoes.push(newAlocacao);
    return { alocacao: newAlocacao } as AlocacaoResult;
  }

  async findAll(): Promise<Alocacao[]> {
    return [...this.alocacoes];
  }

  async findOne(id: string): Promise<Alocacao | null> {
    const alocacao = this.alocacoes.find(
      (currentAlocacoes) => currentAlocacoes.id === id,
    );
    return alocacao ?? null;
  }

  async delete(id: string): Promise<boolean> {
    let removed: boolean = false;
    this.alocacoes = this.alocacoes.filter((alocacao) => {
      if (alocacao.id === id) removed = true;
      return alocacao.id !== id;
    });

    return removed;
  }

  async update(
    id: string,
    updateAlocacaoDto: UpdateAlocacaoDto,
  ): Promise<AlocacaoResult> {
    const alocacaoToBeUpdated = (await this.findOne(id)) as Alocacao;
    if (!alocacaoToBeUpdated) {
      return { error: 'bad request' };
    }

    const findDuplicate = this.alocacoes.find((alocacao) => {
      if (
        alocacao.horario_id === updateAlocacaoDto.horario_id &&
        alocacao.local_id === updateAlocacaoDto.local_id
      )
        return true;
    });

    if (findDuplicate) {
      return { error: 'conflict' } as AlocacaoResult;
    }

    Object.assign(alocacaoToBeUpdated, updateAlocacaoDto);

    return { alocacao: alocacaoToBeUpdated } as AlocacaoResult;
  }
}
