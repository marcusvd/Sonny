import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'ptBrCurrency'
})

export class PtBrCurrencyPipe implements PipeTransform {

  transform(value: any) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  }
 
}
