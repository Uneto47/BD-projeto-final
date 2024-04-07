import { Module } from '@nestjs/common';

import { PrismaService } from '@src/prisma/prisma.service';

import { LocaisController } from './locais.controller';
import { LocaisService } from './locais.service';
import { ILocaisRepository } from './repositories/ILocaisRepository';
import { LocaisPrismaRepository } from './repositories/LocaisPrismaRepository';

@Module({
  controllers: [LocaisController],
  providers: [
    LocaisService,
    {
      provide: ILocaisRepository,
      useClass: LocaisPrismaRepository,
    },
    PrismaService,
  ],
})
export class LocaisModule {}
