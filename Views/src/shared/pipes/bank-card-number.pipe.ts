import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'bankCardNumber',
  standalone: true
})

export class BankCardNumberPipe implements PipeTransform {
  transform(plainCreditCard: string): string {
    const visibleDigits = 4;
    let maskedSection = plainCreditCard.slice(0, -visibleDigits);
    let visibleSection = plainCreditCard.slice(-visibleDigits);
    return maskedSection.replace(/./g, '*') + visibleSection;
  }
}
