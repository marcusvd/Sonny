import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'ptBrCurrency'
})

export class PtBrCurrencyPipe implements PipeTransform {
  transform(value: any, ...args: any[]) {
    switch (args[0]) {
      case 'C,Preço':
        const brCurrency = new Intl.NumberFormat('pt-Br', {
          style: 'currency',
          currency: 'BRL'
        })
        return brCurrency.format(parseInt(value));
    }
    return value
  }
}