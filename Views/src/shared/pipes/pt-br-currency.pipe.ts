import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'ptBrCurrency',
  standalone: true
})

export class PtBrCurrencyPipe implements PipeTransform {

  transform(value: number) {

    const handleNegativeSymbol = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)

    if (handleNegativeSymbol.includes('-')) {
      const numbersAndNegativeSymbol = handleNegativeSymbol.replace('R$', '');
      const currencySymbol = 'R$';
      const space =  "  ";
      const space2 =  "  ";

      return `${currencySymbol}${space}${space2}${numbersAndNegativeSymbol}`
    }

    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  }

}
