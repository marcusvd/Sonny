import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'confirmationPanelDisplayHandlePipe'
})
export class ConfirmationPanelDisplayHandlePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return value?.split(',')[1];
  }

}
