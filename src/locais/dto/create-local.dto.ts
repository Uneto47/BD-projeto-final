import { ApiProperty } from '@nestjs/swagger';

import {
  IsNumber,
  IsString,
  Length,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateLocalDto {
  @ApiProperty({ example: 1000, minimum: 50, maximum: 200000 })
  @IsNumber()
  @Min(50)
  @Max(200000)
  capacidade: number;

  @ApiProperty({ example: '49100000', minLength: 8, maxLength: 8 })
  @IsString()
  @Length(8, 8)
  CEP: string;

  @ApiProperty({ example: 'Rua X', minLength: 4, maxLength: 50 })
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  logradouro: string;

  @ApiProperty({ example: 123, minimum: 1, maximum: 200000 })
  @IsNumber()
  @Min(1)
  @Max(10000)
  numero: number;

  @ApiProperty({ example: 'Bairro X', minLength: 4, maxLength: 25 })
  @IsString()
  @MinLength(4)
  @MaxLength(25)
  bairro: string;

  @ApiProperty({ example: 'Cidade Y', minLength: 3, maxLength: 25 })
  @IsString()
  @MinLength(3)
  @MaxLength(25)
  cidade: string;

  @ApiProperty({ example: 'SE', minLength: 2, maxLength: 2 })
  @IsString()
  @Length(2, 2)
  UF: string;
}
