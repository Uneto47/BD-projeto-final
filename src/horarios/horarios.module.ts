import { Module } from '@nestjs/common';

import { PrismaService } from '@src/prisma/prisma.service';

import { HorariosService } from './horarios.service';
import { HorariosController } from './horarios.controller';
import { IHorariosRepository } from './repositories/IHorariosPrismaRepository';
import { HorariosPrismaRepository } from './repositories/HorariosPrismaRepository';

@Module({
  controllers: [HorariosController],
  providers: [
    HorariosService,
  {
    provide: IHorariosRepository,
    useClass:HorariosPrismaRepository,
  },
 PrismaService
],
})
export class HorariosModule {}
