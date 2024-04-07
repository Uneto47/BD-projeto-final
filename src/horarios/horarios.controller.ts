import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { IsUUIDPipe } from '../utils/pipes/is-uuid-pipe';
import { CreateHorarioDto } from './dto/create-horario.dto';
import { UpdateHorarioDto } from './dto/update-horario.dto';
import { Horario } from './entities/horario.entity';
import { HorariosService } from './horarios.service';

@ApiTags('Horários')
@Controller('horarios')
export class HorariosController {
  constructor(private readonly horariosService: HorariosService) {}

  @ApiCreatedResponse({
    description: 'Criado com sucesso.',
    type: Horario,
  })
  @ApiConflictResponse({ description: "Este horário já foi cadastrado." })
  @ApiConflictResponse({ description: "Os horários devem estar em dias diferentes." })
  @ApiBadRequestResponse({ description: 'Payload incorreto.' })
  @Post()
  create(@Body() createHorarioDto: CreateHorarioDto) {
    return this.horariosService.create(createHorarioDto);
  }

  @Get()
  @ApiOkResponse({ description: 'Todos os registros listados com sucesso.' })
  findAll() {
    return this.horariosService.findAll();
  }

  @ApiBadRequestResponse({ description: 'Parâmetro :id precisa ser um UUID.' })
  @ApiOkResponse({ description: 'Registro listado com sucesso.' })
  @Get(':id')
  findOne(@Param('id', IsUUIDPipe) id: string) {
    return this.horariosService.findOne(id);
  }

  @ApiNotFoundResponse({ description: 'Horario não encontrado.' })
  @ApiBadRequestResponse({ description: 'Payload incorreto.' })
  @ApiBadRequestResponse({ description: 'Parâmetro :id precisa ser um UUID.' })
  @ApiOkResponse({ description: 'Registro atualizado com sucesso.' })
  @Patch(':id')
  update(@Param('id', IsUUIDPipe) id: string, @Body() updateHorarioDto: UpdateHorarioDto) {
    return this.horariosService.update(id, updateHorarioDto);
  }

  @ApiNotFoundResponse({ description: 'Horario não encontrado.' })
  @ApiOkResponse({ description: 'Registro deletado com sucesso.' })
  @ApiBadRequestResponse({ description: 'Parâmetro :id precisa ser um UUID.' })
  @Delete(':id')
  remove(@Param('id', IsUUIDPipe) id: string) {
    return this.horariosService.delete(id);
  }
}
