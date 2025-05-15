import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'assured',
  standalone: true
})

export class AssuredPipe implements PipeTransform {
  transform(value: string) {

    const minValue = new Date('0001-01-01T00:00:00');
    const assured = new Date(value);

    if (minValue.getFullYear() === assured.getFullYear())
      return 'Não assegurado';
    else
      return 'Mensalidade ativa';
  }
}
