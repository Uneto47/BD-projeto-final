import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';

import { Alocacao } from '@prisma/client';

import { CreateAlocacaoDto } from './dto/create-alocacao.dto';
import { UpdateAlocacaoDto } from './dto/update-alocacao.dto';
import { IAlocacoesRepository } from './repositories/IAlocacoesPrismaRepository';

@Injectable()
export class AlocacoesService {
  constructor(private readonly alocacoesRepository: IAlocacoesRepository) {}

  async create(createAlocacaoDto: CreateAlocacaoDto): Promise<Alocacao> {
    const { error, alocacao } =
      await this.alocacoesRepository.create(createAlocacaoDto);

    if (error == 'bad request')
      throw new BadRequestException('Id de local ou horário inválido.');

    if (error === 'conflict')
      throw new ConflictException('Horário de local já existe.');

    return alocacao as Alocacao;
  }

  async findAll() {
    return await this.alocacoesRepository.findAll();
  }

  async findOne(id: string) {
    const alocacao = await this.alocacoesRepository.findOne(id);
    if (!alocacao) throw new BadRequestException('Alocação não existe.');
    return alocacao;
  }

  async update(
    id: string,
    updateAlocacaoDto: UpdateAlocacaoDto,
  ): Promise<Alocacao> {
    const { error, alocacao } = await this.alocacoesRepository.update(
      id,
      updateAlocacaoDto,
    );

    if (error === 'bad request')
      throw new BadRequestException('Verifique se todos os ids são válidos.');

    if (error === 'conflict')
      throw new ConflictException('Horário de local já existe.');

    return alocacao as Alocacao;
  }

  async remove(id: string) {
    const removed = await this.alocacoesRepository.delete(id);

    if (!removed) throw new BadRequestException('Alocacão não existe.');
  }
}
