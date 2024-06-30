import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'cardType',
  standalone: true
})

export class CardTypePipe implements PipeTransform {

  transform(value: any) {

    switch (value) {
      case 0:
        return 'Débito'
      case 1:
        return 'Crédito'
      case 2:
        return 'Débito e Crédito'
    }
    return value;
  }

}
