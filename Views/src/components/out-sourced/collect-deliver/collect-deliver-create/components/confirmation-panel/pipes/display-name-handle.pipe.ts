import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'displayNameHandle'
})
export class DisplayNameHandlePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    switch (args[0]) {

        case 'Destino Cliente':
        return value?.split(',')[1];

        case 'Destino Partner':
        return value?.split(',')[1];

        case 'Custo da base':
        return 'Será debitado no caixa da base';

        case 'Transportador':
        return value?.split(',')[1];

        case 'Cobrar de Cliente':
        return value?.split(',')[1];

        case 'Cobrar de Parceiro':
        return value?.split(',')[1];

        case 'Data':
        const formattedDate = (moment(value)).format('DD/MM/YYYY')
        return formattedDate;

        case 'Preço':
        const brCurrency = new Intl.NumberFormat('pt-Br', {
          style: 'currency',
          currency: 'BRL',
        })
        return brCurrency.format(parseInt(value));
         }

    return value;
  }

}
