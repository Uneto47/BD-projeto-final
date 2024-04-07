import { PartialType } from '@nestjs/swagger';

import { CreateAlocacaoDto } from './create-alocacao.dto';

export class UpdateAlocacaoDto extends PartialType(CreateAlocacaoDto) {}
