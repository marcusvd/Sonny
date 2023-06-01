import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'displayNameHandle'
})
export class DisplayNameHandlePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {

    let displayName: string = null;


    switch (args[0]) {
      case 'Destino Cliente':
        return displayName = value?.split(',')[1];
      case 'Destino Partner':
        return displayName = value?.split(',')[1];
      case 'Custo da base':
       return displayName = 'Será debitado no caixa da base';
      case 'Transportador':
        return displayName = value?.split(',')[1];
      case 'Cobrar de Cliente':
        return displayName = value?.split(',')[1];
      case 'Cobrar de Parceiro':
        return displayName = value?.split(',')[1];
      case 'Data':
        let formattedDate = (moment(value)).format('DD/MM/YYYY')
        return formattedDate;
      case 'Preço':
        let brCurrency = new Intl.NumberFormat('pt-Br', {
          style: 'currency',
          currency: 'BRL',
        })
        return brCurrency.format(parseInt(value));
    }
    displayName = value;
    return displayName;
  }

}
