import { ApiProperty } from '@nestjs/swagger';

import { IsUUID } from 'class-validator';

export class CreateAlocacaoDto {
  @IsUUID()
  @ApiProperty({ example: 'f7650bed-35e4-4075-b7e7-c93ee8debaae' })
  horario_id: string;

  @IsUUID()
  @ApiProperty({ example: '7efd1860-a92e-4aa3-b508-3a079223348a' })
  local_id: string;
}
