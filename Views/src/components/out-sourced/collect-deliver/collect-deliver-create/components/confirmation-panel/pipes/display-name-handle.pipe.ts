import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'displayNameHandle'
})
export class DisplayNameHandlePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    let displayName: string = null;

    switch (args[0]) {
      case 'Cliente':
        return displayName = value?.split(',')[1];
      case 'Partner':
        return displayName = value?.split(',')[1];
      case 'Transportador':
        return displayName = value?.split(',')[1];
      case 'Cobrança Cliente':
        return displayName = value?.split(',')[1];
      case 'Cobrança Parceiro':
        return displayName = value?.split(',')[1];
    }
    displayName = value;
    return displayName;
  }

}
