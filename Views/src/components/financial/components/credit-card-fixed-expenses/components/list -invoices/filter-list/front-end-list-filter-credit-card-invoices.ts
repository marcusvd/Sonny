import * as diacritics from 'diacritics';
import { Observable, of } from "rxjs";
import { map } from 'rxjs/operators';
import { ListGridCreditCardInvoiceDto } from '../dto/list-grid-credit-card-invoice-dto';

export class FrontEndListFilterCreditCardInvoices {

  private minValue = new Date('0001-01-01T00:00:00');
  private currentDate: Date = new Date();
  private currentDateWithoutHours = this.currentDate.setHours(0, 0, 0, 0)

  private stringHandler(value: string): string {
    const noAccents = diacritics.remove(value);//remove accents
    const result = noAccents.replace(/[^\w\s]/gi, ''); //remove special characters
    return result.toLowerCase();
  }

  private removeNonNumericAndConvertToNumber(str: string): number {
    return +str.replace(/\D/g, '');
  }

  current(entities: ListGridCreditCardInvoiceDto[], currentPage: number, pageSize: number) {

    const result = entities.filter(x => this.currentDate.getFullYear() == new Date(x.expiration).getFullYear() && new Date(x.expiration).getMonth() == this.currentDate.getMonth()).slice(currentPage, pageSize)

    return of(result)
  }

  selectedMonth(entities: ListGridCreditCardInvoiceDto[], currentPage: number, pageSize: number, selectedMonth: number,) {

    const result = entities.filter(x => this.currentDate.getFullYear() == new Date(x.expiration).getFullYear()
      &&
      new Date(x.expiration).getMonth() == selectedMonth).slice(currentPage, pageSize)

    return of(result)
  }

  getAllLessThanOrEqualCurrentDate(entities: ListGridCreditCardInvoiceDto[], currentPage: number, pageSize: number) {

    const result = entities.filter(x =>
      //check Year
      (this.currentDate.getFullYear() == new Date(x.expiration).getFullYear())
      &&
      //check month
      (new Date(x.expiration).getMonth() <= this.currentDate.getMonth())
    );

    return of(result.slice(currentPage, pageSize))
  }

  isExpires(entities: ListGridCreditCardInvoiceDto[], selectedMonth: number, currentPage: number, pageSize: number) {
    if (selectedMonth == -1) {
      const result = entities.filter(x =>
        //check Year
        (this.currentDate.getFullYear() == new Date(x.expiration).getFullYear())
      );
      return of(result.filter(x =>
        //checkWasPaid
        (this.minValue.getFullYear() == new Date(x.wasPaid).getFullYear())
        &&
        //checkIsExpires
        (new Date(this.currentDateWithoutHours) > new Date(new Date(x.expiration).setHours(0, 0, 0, 0)))).slice(currentPage, pageSize))
    }
    else {
      const checkPeriod = entities.filter(x =>
        //check Year
        (this.currentDate.getFullYear() == new Date(x.expiration).getFullYear())
        &&
        //check month
        (new Date(x.expiration).getMonth() == selectedMonth)
      );

      const result = checkPeriod.filter(x =>
        //checkWasPaid
        (this.minValue.getFullYear() == new Date(x.wasPaid).getFullYear())
        &&
        //checkIsExpires
        (new Date(this.currentDateWithoutHours) > new Date(new Date(x.expiration).setHours(0, 0, 0, 0)))
      )

      return of(result.slice(currentPage, pageSize))
    }
  }

  isPending(entities: ListGridCreditCardInvoiceDto[], selectedMonth: number, currentPage: number, pageSize: number) {

    if (selectedMonth == -1) {
      const result = entities.filter(x =>
        //check Year
        (this.currentDate.getFullYear() == new Date(x.expiration).getFullYear())
        &&
        //check month
        (new Date(x.expiration).getMonth() <= this.currentDate.getMonth())
      );
      return of(result.filter(x =>
        //checkWasPaid
        (this.minValue.getFullYear() == new Date(x.wasPaid).getFullYear())
        &&
        //checkIsPendig
        (new Date(this.currentDateWithoutHours) <= new Date(new Date(x.expiration).setHours(0, 0, 0, 0)))).slice(currentPage, pageSize))
    }
    else {

      const checkPeriod = entities.filter(x =>
        //check Year
        (this.currentDate.getFullYear() == new Date(x.expiration).getFullYear())
        &&
        //check month
        (new Date(x.expiration).getMonth() == selectedMonth)
      );

      const result = checkPeriod.filter(x =>
        //checkWasPaid
        (this.minValue.getFullYear() == new Date(x.wasPaid).getFullYear())
        &&
        //checkIsPendig
        (new Date(this.currentDateWithoutHours) <= new Date(new Date(x.expiration).setHours(0, 0, 0, 0)))

      )

      return of(result.slice(currentPage, pageSize))
    }

  }

  isPaid(entities: ListGridCreditCardInvoiceDto[], selectedMonth: number, currentPage: number, pageSize: number) {
    if (selectedMonth == -1) {
      const result = entities.filter(x =>
        //check Year
        (this.currentDate.getFullYear() == new Date(x.expiration).getFullYear())
        &&
        //check month
        (new Date(x.expiration).getMonth() <= this.currentDate.getMonth())
      );
      return of(result.filter(x =>
        //checkWasPaid
        (this.minValue.getFullYear() == new Date(x.wasPaid).getFullYear())
        &&
        //checkIsPendig
        (new Date(this.currentDateWithoutHours) <= new Date(new Date(x.expiration).setHours(0, 0, 0, 0)))).slice(currentPage, pageSize))
    }
    else {
      const checkPeriod = entities.filter(x =>
        //check Year
        (this.currentDate.getFullYear() == new Date(x.expiration).getFullYear())
        &&
        //check month
        (new Date(x.expiration).getMonth() == selectedMonth)
      );
      return of(checkPeriod.filter(x => this.minValue.getFullYear() != new Date(x.wasPaid).getFullYear()).slice(currentPage, pageSize))
    }
  }

  // searchField(entities: ListGridCreditCardInvoiceDto[], selectedMonth: number, currentPage: number, pageSize: number, term: string) {
  //   if (selectedMonth == -1) {
  //     const result = entities.filter(x =>
  //       //check Year
  //       (this.currentDate.getFullYear() == new Date(x.expiration).getFullYear())
  //       &&
  //       //check month
  //       (new Date(x.expiration).getMonth() <= this.currentDate.getMonth())
  //     );
  //     return of(result.filter(x =>
  //       this.stringHandler(x.category).includes(this.stringHandler(term))
  //       ||
  //       this.stringHandler(x.name).includes(this.stringHandler(term)))
  //       .slice(currentPage, pageSize))
  //   }
  //   else {
  //     const checkPeriod = entities.filter(x =>
  //       //check Year
  //       (this.currentDate.getFullYear() == new Date(x.expiration).getFullYear())
  //       &&
  //       //check month
  //       (new Date(x.expiration).getMonth() == selectedMonth)
  //     );

  //     return of(checkPeriod.filter(x =>
  //       this.stringHandler(x.category).includes(this.stringHandler(term))
  //       ||
  //       this.stringHandler(x.name).includes(this.stringHandler(term)))
  //       .slice(currentPage, pageSize))
  //   }
  // }

  isdescending = true;
  orderByFrontEnd(entities$: Observable<ListGridCreditCardInvoiceDto[]>, field: string) {
    this.isdescending = !this.isdescending;

    if (field.toLowerCase() === 'subcategoria') {
      if (this.isdescending)
        return entities$.pipe(map(h => h.sort((x, y) => x.subcategory.localeCompare(y.subcategory))));
      else
        return entities$.pipe(map(h => h.sort((x, y) => y.subcategory.localeCompare(x.subcategory))));
    }

    // if (field.toLowerCase() === 'categoria') {
    //   if (this.isdescending)
    //     return entities$.pipe(map(h => h.sort((x, y) => x.category.localeCompare(y.category))));
    //   else
    //     return entities$.pipe(map(h => h.sort((x, y) => y.category.localeCompare(x.category))));
    // }

    // if (field.toLowerCase() === 'descrição') {
    //   if (this.isdescending)
    //     return entities$.pipe(map(h => h.sort((x, y) => x.category.localeCompare(y.category))));
    //   else
    //     return entities$.pipe(map(h => h.sort((x, y) => y.category.localeCompare(x.category))));
    // }

    if (field.toLowerCase() === 'vencimento') {

      return entities$.pipe(map(h => h.sort((x, y) => {
        if (this.isdescending)
          return new Date(x.expiration).getTime() - new Date(y.expiration).getTime();
        else
          return new Date(y.expiration).getTime() - new Date(x.expiration).getTime();
      })))

    }

    if (field.toLowerCase() === 'preço') {
      return entities$.pipe(map(h => h.sort((x, y) => {
        if (this.isdescending) {
          const priceX: number = this.removeNonNumericAndConvertToNumber(x.price);
          const priceY: number = this.removeNonNumericAndConvertToNumber(y.price);
          console.log(priceX)
          return priceX - priceY;
        }
        else {
          const priceX: number = this.removeNonNumericAndConvertToNumber(x.price);
          const priceY: number = this.removeNonNumericAndConvertToNumber(y.price);
          return priceY - priceX;
        }
      })))

    }

    if (field.toLowerCase() === 'status') {
      return entities$.pipe(map(h => h.sort((x, y) => {
        if (this.isdescending)
          return new Date(x.wasPaid).getTime() - this.minValue.getTime();
        else
          return this.minValue.getTime() - new Date(x.wasPaid).getTime();
      })))

    }
    return null;
  }

}
