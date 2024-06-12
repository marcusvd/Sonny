import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'accountType',
  standalone: true
})

export class AccountTypePipe implements PipeTransform {

  transform(value: any) {

    if (value == 0)
      return 'Corrente';


    if (value == 1)
      return 'Poupança';

    return value;
  }

}
