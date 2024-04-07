import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, Matches } from 'class-validator';

export class CreateHorarioDto {
  @ApiProperty({ example: '08:00:00' })
  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
  hora_inicial: string;

  @ApiProperty({ example: '17:00:00' })
  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
  hora_final: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsOptional()
  diasDiferentes?: boolean;
}
