import { ApiProperty } from '@nestjs/swagger';

import { randomUUID } from 'crypto';

export class Local {
  @ApiProperty()
  id: string;

  @ApiProperty()
  capacidade: number;

  @ApiProperty()
  CEP: string;

  @ApiProperty()
  logradouro: string;

  @ApiProperty()
  numero: number;

  @ApiProperty()
  bairro: string;

  @ApiProperty()
  cidade: string;

  @ApiProperty()
  UF: string;

  constructor() {
    this.id = randomUUID();
  }
}
