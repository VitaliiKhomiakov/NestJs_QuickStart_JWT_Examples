import {ArgumentMetadata, BadRequestException, Injectable, PipeTransform} from '@nestjs/common';
import {ObjectSchema} from '@hapi/joi';
import * as _ from 'lodash';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value);

    if (error) {
      throw new BadRequestException(_.get(error, 'details', [error]).map(item => item.message));
    }
    return value;
  }
}


