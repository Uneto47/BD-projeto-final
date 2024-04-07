import { ConflictException, NotFoundException } from '@nestjs/common';
import { CreateHorarioDto } from './dto/create-horario.dto';
import { UpdateHorarioDto } from './dto/update-horario.dto';
import { HorariosService } from './horarios.service';
import { IHorariosRepository } from './repositories/IHorariosPrismaRepository';
import { HorariosInMemoryRepository } from './dto/in-memory/HorariosInMemoryRepository';

let horariosService: HorariosService;
let horarioRepository: IHorariosRepository;

const makeFakeHorarioDto = (): CreateHorarioDto => {
  return {
    hora_inicial: '09:00:00',
    hora_final: '18:00:00',
  };
};

describe('HorariosService', () => {
  beforeEach(async () => {
    horarioRepository = new HorariosInMemoryRepository(); 
    horariosService = new HorariosService(horarioRepository);
  });

  it('should be able create a horario', async () => {
    const horario = await horariosService.create(makeFakeHorarioDto());

    expect(horario).toHaveProperty('id');
  });

  it('should be able to list all horarios', async() =>{
    await horariosService.create(makeFakeHorarioDto());
    
    await horariosService.create({
      hora_inicial: "10:00:00",
      hora_final: "12:00:00",
      diasDiferentes: false
    });

    const horarios = await horariosService.findAll();

    expect(horarios).toHaveLength(2);
  })

  it('should not be able to create a horario final > inicial', async() =>{
    await horariosService.create(makeFakeHorarioDto());
    
    await expect(horariosService.create({
      hora_inicial: "12:00:00",
      hora_final: "11:00:00",
      diasDiferentes: false
    }),
    ).rejects.toEqual(new ConflictException('Os horários devem estar em dias diferentes.'));
  })
  
  it('should be able to find one horario by id', async () => {
    const horario = await horariosService.create(makeFakeHorarioDto());

    const findedhorario = await horariosService.findOne(horario.id);

    expect(findedhorario).toEqual(horario);
  });

  it('should be able to delete one horario by id', async () => {
    const horario = await horariosService.create(makeFakeHorarioDto());

    const findedhorario = await horariosService.findOne(horario.id);

    expect(findedhorario).toEqual(horario);

    await horariosService.delete(horario.id);

    const horarios = await horariosService.findAll();

    expect(horarios).toHaveLength(0);
  });

  it('should not be able to delete one Horario if Horario not exists', async () => {
    await expect(horariosService.delete('INVALID_ID')).rejects.toEqual(
      new NotFoundException('Horario não encontrado.'),
    );
  });

  it('should be able to update one horario by id', async () => {
    const horario = await horariosService.create(makeFakeHorarioDto());

    const UpdateHorarioDto = {
      hora_inicial: "10:00:00",
      hora_final: "13:00:00"
    } as UpdateHorarioDto;

    const [hi, mi, si] = UpdateHorarioDto.hora_inicial.split(":").map(Number)
    const [hf, mf, sf] = UpdateHorarioDto.hora_final.split(":").map(Number)
    const dateInicial = new Date(2024, 0, 1, hi-3, mi, si).toISOString()
    const dateFinal = new Date(2024, 0, 1, hf-3, mf, sf).toISOString()

    const { id, ...updatedHorario } = await horariosService.update(
      horario.id,
      UpdateHorarioDto,
    );
    

    expect(updatedHorario).toEqual({hora_inicial: dateInicial, hora_final: dateFinal});
  });

  it('should not be able to update one local if local not exists', async () => {
    const updateHorarioDto = {
      hora_inicial: '10:00:00',
      hora_final: '13:00:00'
    } as UpdateHorarioDto;

    const updatedHorario = await expect(
      horariosService.update('INVALID_ID', updateHorarioDto),
    ).rejects.toEqual(new NotFoundException('Horario não encontrado.'));
  });
});
