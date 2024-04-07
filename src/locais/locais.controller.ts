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
import { CreateLocalDto } from './dto/create-local.dto';
import { UpdateLocalDto } from './dto/update-local.dto';
import { Local } from './entities/local.entity';
import { LocaisService } from './locais.service';

@ApiTags('Locais')
@Controller('locais')
export class LocaisController {
  constructor(private readonly locaisService: LocaisService) {}

  @ApiCreatedResponse({
    description: 'Criado com sucesso.',
    type: Local,
  })
  @ApiConflictResponse({ description: "Esse local já está registrado.'" })
  @ApiBadRequestResponse({ description: 'Payload incorreto.' })
  @Post()
  async create(@Body() createLocalDto: CreateLocalDto) {
    return await this.locaisService.create(createLocalDto);
  }

  @Get()
  @ApiOkResponse({ description: 'Todos os registros listados com sucesso.' })
  findAll() {
    return this.locaisService.findAll();
  }

  @ApiBadRequestResponse({ description: 'Parâmetro :id precisa ser um UUID.' })
  @ApiOkResponse({ description: 'Registro listado com sucesso.' })
  @ApiBadRequestResponse({ description: 'Parâmetro :id precisa ser um UUID.' })
  @Get(':id')
  findOne(@Param('id', IsUUIDPipe) id: string) {
    return this.locaisService.findOne(id);
  }

  @ApiNotFoundResponse({ description: 'Local não encontrado.' })
  @ApiBadRequestResponse({ description: 'Payload incorreto.' })
  @ApiBadRequestResponse({ description: 'Parâmetro :id precisa ser um UUID.' })
  @Patch(':id')
  update(
    @Param('id', IsUUIDPipe) id: string,
    @Body() updateLocaiDto: UpdateLocalDto,
  ) {
    return this.locaisService.update(id, updateLocaiDto);
  }

  @ApiNotFoundResponse({ description: 'Local não encontrado.' })
  @ApiOkResponse({ description: 'Registro deletado com sucesso.' })
  @ApiBadRequestResponse({ description: 'Parâmetro :id precisa ser um UUID.' })
  @Delete(':id')
  remove(@Param('id', IsUUIDPipe) id: string) {
    return this.locaisService.delete(id);
  }
}
