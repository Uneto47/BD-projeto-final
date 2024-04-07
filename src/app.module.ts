import { Module } from '@nestjs/common';

import { LocaisModule } from './locais/locais.module';
import { PrismaService } from './prisma/prisma.service';
import { HorariosModule } from './horarios/horarios.module';
import { AlocacoesModule } from './alocacoes/alocacoes.module';

@Module({
  imports: [LocaisModule, HorariosModule, AlocacoesModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
