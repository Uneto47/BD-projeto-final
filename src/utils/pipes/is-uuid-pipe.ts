import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class IsUUIDPipe implements PipeTransform<string, string> {
  transform(value: string): string {
    if (
      !value.match(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
      )
    ) {
      throw new BadRequestException('Parâmetro :id precisa ser um UUID.');
    }

    return value;
  }
}
