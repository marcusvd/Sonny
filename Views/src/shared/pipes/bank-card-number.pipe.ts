import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'bankCardNumber',
  standalone: true
})

export class BankCardNumberPipe implements PipeTransform {
  transform(cNumber: string): string {

    const cardNumber: string = cNumber?.replace(/\D+/g, '');

    let first: string;
    let second: string;
    let third: string;
    let fourth: string;
    let result: string;

    if (cardNumber?.length === 16) {
      first = cardNumber.slice(0, 4);
      second = cardNumber.slice(4, 8);
      third = cardNumber.slice(8, 12);
      fourth = cardNumber.slice(12, 16);
      result = `${first}-${second}-${third}-${fourth}`
      return result;
    }

    if (cardNumber?.length === 15) {
      first = cardNumber.slice(0, 4);
      second = cardNumber.slice(4, 10);
      third = cardNumber.slice(10, 15);
      result = `${first}-${second}-${third}`
      return result;
    }

    if (cardNumber?.length === 14) {
      first = cardNumber.slice(0, 4);
      second = cardNumber.slice(4, 10);
      third = cardNumber.slice(10, 14);
      result = `${first}-${second}-${third}`
      return result;
    }

    return result;
  }
}



@Pipe({
  name: 'bankCard4LastDigits',
  standalone: true
})

export class BankCard4LastDigitsPipe implements PipeTransform {
  transform(plainCreditCard: string): string {
    const visibleDigits = 4;
    let maskedSection = plainCreditCard.slice(0, -visibleDigits);
    let visibleSection = plainCreditCard.slice(-visibleDigits);
    return maskedSection.replace(/./g, '*') + visibleSection;
  }
}
