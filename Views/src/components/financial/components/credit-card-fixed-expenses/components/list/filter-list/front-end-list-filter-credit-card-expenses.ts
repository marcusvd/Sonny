import * as diacritics from 'diacritics';
import { of } from "rxjs";
import { ListGridCreditCardExpensesDto } from '../dto/list-grid-credit-card-expenses-dto';

export class FrontEndListFilterCreditCardExpenses {

  private minValue = new Date('0001-01-01T00:00:00');
  private currentDate: Date = new Date();
  private currentDateWithoutHours = this.currentDate.setHours(0, 0, 0, 0)

  private stringHandler(value?: string): string {
    const noAccents = diacritics?.remove(value);//remove accents
    const result = noAccents?.replace(/[^\w\s]/gi, ''); //remove special characters
    return result?.toLowerCase();
  }

  private removeNonNumericAndConvertToNumber(str: string): number {
    return +str.replace(/\D/g, '');
  }

  current(entities: ListGridCreditCardExpensesDto[], currentPage: number, pageSize: number) {

    const result = entities.slice(currentPage, pageSize)

    return of(result)
  }

  selectedMonth(entities: ListGridCreditCardExpensesDto[], currentPage: number, pageSize: number, selectedMonth: number,) {

    const result = entities.filter(x => this.currentDate.getFullYear() == new Date(x.expires).getFullYear()
      &&
      new Date(x.expires).getMonth() == selectedMonth).slice(currentPage, pageSize)

    return of(result)
  }

  getAllLessThanOrEqualCurrentDate(entities: ListGridCreditCardExpensesDto[], currentPage: number, pageSize: number) {

    const result = entities.filter(x =>
      //check Year
      (this.currentDate.getFullYear() == new Date(x.expires).getFullYear())
      &&
      //check month
      (new Date(x.expires).getMonth() <= this.currentDate.getMonth())
    );

    return of(result.slice(currentPage, pageSize))
  }

  isExpires(entities: ListGridCreditCardExpensesDto[], selectedMonth: number, currentPage: number, pageSize: number) {
    if (selectedMonth == -1) {
      const result = entities.filter(x =>
        //check Year
        (this.currentDate.getFullYear() == new Date(x.expires).getFullYear())
      );
      return of(result.filter(x =>
        //checkWasPaid
        (this.minValue.getFullYear() == new Date(x.wasPaid).getFullYear())
        &&
        //checkIsExpires
        (new Date(this.currentDateWithoutHours) > new Date(new Date(x.expires).setHours(0, 0, 0, 0)))).slice(currentPage, pageSize))
    }
    else {
      const checkPeriod = entities.filter(x =>
        //check Year
        (this.currentDate.getFullYear() == new Date(x.expires).getFullYear())
        &&
        //check month
        (new Date(x.expires).getMonth() == selectedMonth)
      );

      const result = checkPeriod.filter(x =>
        //checkWasPaid
        (this.minValue.getFullYear() == new Date(x.wasPaid).getFullYear())
        &&
        //checkIsExpires
        (new Date(this.currentDateWithoutHours) > new Date(new Date(x.expires).setHours(0, 0, 0, 0)))
      )

      return of(result.slice(currentPage, pageSize))
    }
  }

  isPending(entities: ListGridCreditCardExpensesDto[], selectedMonth: number, currentPage: number, pageSize: number) {

    if (selectedMonth == -1) {
      const result = entities.filter(x =>
        //check Year
        (this.currentDate.getFullYear() == new Date(x.expires).getFullYear())
        &&
        //check month
        (new Date(x.expires).getMonth() <= this.currentDate.getMonth())
      );
      return of(result.filter(x =>
        //checkWasPaid
        (this.minValue.getFullYear() == new Date(x.wasPaid).getFullYear())
        &&
        //checkIsPendig
        (new Date(this.currentDateWithoutHours) <= new Date(new Date(x.expires).setHours(0, 0, 0, 0)))).slice(currentPage, pageSize))
    }
    else {

      const checkPeriod = entities.filter(x =>
        //check Year
        (this.currentDate.getFullYear() == new Date(x.expires).getFullYear())
        &&
        //check month
        (new Date(x.expires).getMonth() == selectedMonth)
      );

      const result = checkPeriod.filter(x =>
        //checkWasPaid
        (this.minValue.getFullYear() == new Date(x.wasPaid).getFullYear())
        &&
        //checkIsPendig
        (new Date(this.currentDateWithoutHours) <= new Date(new Date(x.expires).setHours(0, 0, 0, 0)))

      )

      return of(result.slice(currentPage, pageSize))
    }

  }

  isPaid(entities: ListGridCreditCardExpensesDto[], selectedMonth: number, currentPage: number, pageSize: number) {
    if (selectedMonth == -1) {
      const result = entities.filter(x =>
        //check Year
        (this.currentDate.getFullYear() == new Date(x.expires).getFullYear())
        &&
        //check month
        (new Date(x.expires).getMonth() <= this.currentDate.getMonth())
      );
      return of(result.filter(x =>
        //checkWasPaid
        (this.minValue.getFullYear() == new Date(x.wasPaid).getFullYear())
        &&
        //checkIsPendig
        (new Date(this.currentDateWithoutHours) <= new Date(new Date(x.expires).setHours(0, 0, 0, 0)))).slice(currentPage, pageSize))
    }
    else {
      const checkPeriod = entities.filter(x =>
        //check Year
        (this.currentDate.getFullYear() == new Date(x.expires).getFullYear())
        &&
        //check month
        (new Date(x.expires).getMonth() == selectedMonth)
      );
      return of(checkPeriod.filter(x => this.minValue.getFullYear() != new Date(x.wasPaid).getFullYear()).slice(currentPage, pageSize))
    }
  }





}
