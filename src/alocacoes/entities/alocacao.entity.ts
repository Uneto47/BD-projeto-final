import { ApiProperty } from '@nestjs/swagger';

import { Horario } from '../../horarios/entities/horario.entity';
import { Local } from '../../locais/entities/local.entity';

export class Alocacao {
  @ApiProperty()
  id: string;

  @ApiProperty()
  local_id: string;

  @ApiProperty()
  local: Local;

  @ApiProperty()
  horario_id: string;

  @ApiProperty()
  horario: Horario;
}
