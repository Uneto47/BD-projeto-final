import { ConflictException, NotFoundException } from '@nestjs/common';

import { CreateLocalDto } from './dto/create-local.dto';
import { UpdateLocalDto } from './dto/update-local.dto';
import { LocaisService } from './locais.service';
import { ILocaisRepository } from './repositories/ILocaisRepository';
import { LocaisInMemoryRepository } from './repositories/in-memory/LocaisInMemoryRepository';

let locaisService: LocaisService;
let locaisInMemoryRepository: ILocaisRepository;

const makeFakeLocalDto = (): CreateLocalDto => {
  return {
    bairro: 'Bairro A',
    capacidade: 1000,
    CEP: '49100000',
    cidade: 'Cidade X',
    logradouro: 'Rua C',
    numero: 12,
    UF: 'SE',
  };
};

describe('LocaisService', () => {
  beforeEach(async () => {
    locaisInMemoryRepository = new LocaisInMemoryRepository();
    locaisService = new LocaisService(locaisInMemoryRepository);
  });

  it('should be able create a local', async () => {
    const local = await locaisService.create(makeFakeLocalDto());

    expect(local).toHaveProperty('id');
  });

  it('should not be able create a duplicate local', async () => {
    await locaisService.create(makeFakeLocalDto());

    await expect(
      locaisService.create({
        bairro: 'Bairro A',
        capacidade: 1000,
        CEP: '49100000',
        cidade: 'Cidade X',
        logradouro: 'Rua C',
        numero: 12,
        UF: 'SE',
      }),
    ).rejects.toEqual(new ConflictException('Esse local já está registrado.'));
  });

  it('should be able to list all locations', async () => {
    await locaisService.create(makeFakeLocalDto());

    await locaisService.create({
      bairro: 'Bairro B',
      capacidade: 1000,
      CEP: '49100000',
      cidade: 'Cidade X',
      logradouro: 'Rua C',
      numero: 12,
      UF: 'SE',
    });

    const locations = await locaisService.findAll();

    expect(locations).toHaveLength(2);
  });

  it('should be able to find one local by id', async () => {
    const local = await locaisService.create(makeFakeLocalDto());

    const findedLocal = await locaisService.findOne(local.id);

    expect(findedLocal).toEqual(local);
  });

  it('should not be able to find one local if local not exists', async () => {
    await expect(locaisService.findOne('INVALID_ID')).rejects.toEqual(
      new NotFoundException('Local não encontrado.'),
    );
  });

  it('should be able to delete one local by id', async () => {
    const local = await locaisService.create(makeFakeLocalDto());

    const findedLocal = await locaisService.findOne(local.id);

    expect(findedLocal).toEqual(local);

    await locaisService.delete(local.id);

    const locations = await locaisService.findAll();

    expect(locations).toHaveLength(0);
  });

  it('should not be able to delete one local if local not exists', async () => {
    await expect(locaisService.delete('INVALID_ID')).rejects.toEqual(
      new NotFoundException('Local não encontrado.'),
    );
  });

  it('should be able to update one local by id', async () => {
    const local = await locaisService.create(makeFakeLocalDto());

    const updateLocalDto = {
      bairro: 'Bairro Atualizado',
      capacidade: 2000,
      CEP: '49100111',
      cidade: 'Cidade Atualizada',
      logradouro: 'Rua Atualizada',
      numero: 123,
      UF: 'SP',
    } as UpdateLocalDto;

    const { id, ...findedLocal } = await locaisService.update(
      local.id,
      updateLocalDto,
    );

    expect(findedLocal).toEqual(updateLocalDto);
  });

  it('should not be able to update one local if local not exists', async () => {
    const updateLocalDto = {
      bairro: 'Bairro Atualizado',
    } as UpdateLocalDto;

    const updatedLocal = await expect(
      locaisService.update('INVALID_ID', updateLocalDto),
    ).rejects.toEqual(new NotFoundException('Local não encontrado.'));
  });
});
