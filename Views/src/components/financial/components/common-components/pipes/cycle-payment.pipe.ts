import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'cyclePayment',
  standalone: true
})

export class CyclePaymentPipe implements PipeTransform {

  transform(value: any) {

    if (value === 1)
      return 'Mensal';

    if (value === 2)
      return 'Anual';

    return value;
  }

}
