import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'momentFormat'
})
export class MomentFormatPipe implements PipeTransform {

  transform(value: moment.Moment, format: string): any {
    return moment(value).format(format);
  }

}
