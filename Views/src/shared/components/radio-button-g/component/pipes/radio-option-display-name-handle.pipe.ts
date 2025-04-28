import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'radioOptionDisplayNameHandle',
    standalone: false
})
export class RadioOptionDisplayNameHandlePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
   const displayName = value.split(',')[1]
    return displayName;
  }

}
