import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

import { AlocacoesService } from './alocacoes.service';
import { CreateAlocacaoDto } from './dto/create-alocacao.dto';
import { UpdateAlocacaoDto } from './dto/update-alocacao.dto';
import { IAlocacoesRepository } from './repositories/IAlocacoesPrismaRepository';
import { AlocacoesInMemoryRepository } from './repositories/in-memory/LocaisInMemoryRepository';

let alocacoesService: AlocacoesService;
let alocacaoRepository: IAlocacoesRepository;

const makeFakeAlocacaoDto = (): CreateAlocacaoDto => {
  return {
    horario_id: 'uuid',
    local_id: 'uuid',
  };
};

describe('alocacoesService', () => {
  beforeEach(async () => {
    alocacaoRepository = new AlocacoesInMemoryRepository();
    alocacoesService = new AlocacoesService(alocacaoRepository);
  });

  it('should be able create a alocacao', async () => {
    const alocacao = await alocacoesService.create(makeFakeAlocacaoDto());
    expect(alocacao).toHaveProperty('id');
  });

  it('should be able to list all alocacoes', async () => {
    await alocacoesService.create(makeFakeAlocacaoDto());

    await alocacoesService.create({
      horario_id: 'uuid2',
      local_id: 'uuid2',
    });

    const alocacoes = await alocacoesService.findAll();

    expect(alocacoes).toHaveLength(2);
  });

  it('should be able to find one alocacao by id', async () => {
    const alocacao = await alocacoesService.create(makeFakeAlocacaoDto());

    const findedAlocacao = await alocacoesService.findOne(alocacao.id);

    expect(findedAlocacao).toEqual(alocacao);
  });

  it('should be able to remove one alocacao by id', async () => {
    const alocacao = await alocacoesService.create(makeFakeAlocacaoDto());

    const findedAlocacao = await alocacoesService.findOne(alocacao.id);

    expect(findedAlocacao).toEqual(alocacao);

    await alocacoesService.remove(alocacao.id);

    const alocacoes = await alocacoesService.findAll();

    expect(alocacoes).toHaveLength(0);
  });

  it('should not be able to remove one Horario if Horario not exists', async () => {
    await expect(alocacoesService.remove('INVALID_ID')).rejects.toEqual(
      new NotFoundException('Alocacão não existe.'),
    );
  });

  it('should be able to update one alocacao by id', async () => {
    const newAlocacao = await alocacoesService.create(makeFakeAlocacaoDto());

    const UpdateAlocacaoDto = {
      horario_id: 'uuid2',
      local_id: 'uuid2',
    } as UpdateAlocacaoDto;

    const { id, ...updatedAlocacao } = await alocacoesService.update(
      newAlocacao.id,
      UpdateAlocacaoDto,
    );

    expect(updatedAlocacao).toEqual({
      horario_id: 'uuid2',
      local_id: 'uuid2',
    });
  });

  it('should not be able to update one local if local not exists', async () => {
    const dto1 = makeFakeAlocacaoDto();
    await alocacoesService.create(dto1);

    const dto2 = makeFakeAlocacaoDto();
    dto2.horario_id = 'uuid2';
    dto2.local_id = 'uuid2';
    await alocacoesService.create(dto2);

    const updateAlocacaoDto = {
      horario_id: 'uuid',
      local_id: 'uuid',
    } as UpdateAlocacaoDto;

    await expect(
      alocacoesService.update('INVALID_ID', updateAlocacaoDto),
    ).rejects.toEqual(
      new BadRequestException('Verifique se todos os ids são válidos.'),
    );

    await expect(alocacoesService.update('0', dto2)).rejects.toEqual(
      new ConflictException('Horário de local já existe.'),
    );
  });
});
