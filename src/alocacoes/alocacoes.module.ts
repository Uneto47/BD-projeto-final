import { Module } from '@nestjs/common';

import { PrismaService } from '@src/prisma/prisma.service';

import { AlocacoesController } from './alocacoes.controller';
import { AlocacoesService } from './alocacoes.service';
import { AlocacoesPrismaRepository } from './repositories/AlocacoesPrismaRepository';
import { IAlocacoesRepository } from './repositories/IAlocacoesPrismaRepository';

@Module({
  controllers: [AlocacoesController],
  providers: [
    AlocacoesService,
    {
      provide: IAlocacoesRepository,
      useClass: AlocacoesPrismaRepository,
    },
    PrismaService,
  ],
})
export class AlocacoesModule {}
