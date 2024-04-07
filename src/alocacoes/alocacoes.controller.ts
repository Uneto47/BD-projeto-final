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
import { AlocacoesService } from './alocacoes.service';
import { CreateAlocacaoDto } from './dto/create-alocacao.dto';
import { UpdateAlocacaoDto } from './dto/update-alocacao.dto';
import { Alocacao } from './entities/alocacao.entity';

@ApiTags('Alocações')
@Controller('alocacaos')
export class AlocacoesController {
  constructor(private readonly alocacoesService: AlocacoesService) {}

  @ApiCreatedResponse({
    description: 'Criado com sucesso.',
    type: Alocacao,
  })
  @ApiConflictResponse({
    description: 'Horário e local já existe.',
  })
  @ApiBadRequestResponse({ description: 'Payload incorreto.' })
  @Post()
  create(@Body() createAlocacaoDto: CreateAlocacaoDto) {
    return this.alocacoesService.create(createAlocacaoDto);
  }

  @ApiOkResponse({ description: 'Todos os registros listados com sucesso.' })
  @Get()
  findAll() {
    return this.alocacoesService.findAll();
  }

  @ApiBadRequestResponse({ description: 'Parâmetro :id precisa ser um UUID.' })
  @ApiOkResponse({ description: 'Registro listado com sucesso.' })
  @Get(':id')
  findOne(@Param('id', IsUUIDPipe) id: string) {
    return this.alocacoesService.findOne(id);
  }

  @ApiNotFoundResponse({ description: 'Alocação não encontrado.' })
  @ApiBadRequestResponse({ description: 'Payload incorreto.' })
  @ApiBadRequestResponse({ description: 'Parâmetro :id precisa ser um UUID.' })
  @ApiOkResponse({ description: 'Registro atualizado com sucesso.' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAlocacaoDto: UpdateAlocacaoDto,
  ) {
    return this.alocacoesService.update(id, updateAlocacaoDto);
  }

  @ApiNotFoundResponse({ description: 'Alocação não encontrado.' })
  @ApiOkResponse({ description: 'Registro deletado com sucesso.' })
  @ApiBadRequestResponse({ description: 'Parâmetro :id precisa ser um UUID.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.alocacoesService.remove(id);
  }
}
