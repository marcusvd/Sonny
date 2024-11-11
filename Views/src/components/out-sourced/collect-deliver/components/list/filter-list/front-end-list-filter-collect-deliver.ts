import { FormControl } from '@angular/forms';
import { of } from 'rxjs';
import { List } from 'src/shared/components/inheritance/list/list';

export class FrontEndListFilterCollectDeliver extends List {

				
  orderBy(field: string) {
    if (field.toLowerCase() == 'Data'.toLowerCase())
      this.entities$ = this.orderByFrontEnd(this.entities$, { 'start': new Date() });

    if (field.toLowerCase() == 'Valor'.toLowerCase())
      this.entities$ = this.orderByFrontEnd(this.entities$, { price: 0 });

    if (field.toLowerCase() == 'Liquidado'.toLowerCase())
      this.entities$ = this.orderByFrontEnd(this.entities$, { 'wasPaid': new Date() });

    if (field.toLowerCase() == 'Cobrança'.toLowerCase())
      this.entities$ = this.orderByFrontEnd(this.entities$, { 'billingFrom': 'billingFrom' });
  }
  query($event: FormControl) {
    this.termSearched = $event.value
    let result = null;

    const searchResult = this.searchField(this.entities, this.termSearched);

    this.gridListCommonHelper.lengthPaginator.next(searchResult.length)

      const ordered = this.arrayOrderByDate(searchResult, 'start')

      result = of(ordered.slice(0, this.pageSize));


      
    return result;

  }
  // query($event: FormControl, month: number) {
  //   this.termSearched = $event.value
  //   let result = null;

  //   const searchResult = this.searchField(this.entities, this.termSearched);

  //   if (month != -1) {

  //     result = searchResult.filter(x =>
  //       this.currentDate.getFullYear() == new Date(x.paidDay).getFullYear()
  //       && new Date(x.paidDay).getMonth() == month)

  //     this.gridListCommonHelper.lengthPaginator.next(result.length)

  //     const ordered = this.arrayOrderByDate(result, 'paidDay')

  //     result = of(ordered.slice(0, this.pageSize))
  //   }

  //   if (month == -1) {

  //     result = searchResult.filter(x =>
  //       this.currentDate.getFullYear() == new Date(x.paidDay).getFullYear()
  //       && new Date(x.paidDay).getMonth() <= this.currentDate.getMonth())

  //     this.gridListCommonHelper.lengthPaginator.next(result.length)

  //     const ordered = this.arrayOrderByDate(result, 'paidDay')

  //     result = of(ordered.slice(0, this.pageSize));
  //   }

  //   return result;

  // }
  // selectedMonth(entities: ListGridCreditCardExpensesDto[], currentPage: number, pageSize: number, selectedMonth: number,) {

  //   const result = entities.filter(x => this.currentDate.getFullYear() == new Date(x.expires).getFullYear()
  //     &&
  //     new Date(x.expires).getMonth() == selectedMonth).slice(currentPage, pageSize)

  //   return of(result)
  // }

  // getAllLessThanOrEqualCurrentDate(entities: ListGridCreditCardExpensesDto[], currentPage: number, pageSize: number) {

  //   const result = entities.filter(x =>
  //     //check Year
  //     (this.currentDate.getFullYear() == new Date(x.expires).getFullYear())
  //     &&
  //     //check month
  //     (new Date(x.expires).getMonth() <= this.currentDate.getMonth())
  //   );

  //   return of(result.slice(currentPage, pageSize))
  // }

  // query($event: FormControl, month: number) {
  //   this.termSearched = $event.value
  //   let result = null;

  //   const searchResult = this.searchField(this.entities, this.termSearched);

  //   if (month != -1) {

  //     result = searchResult.filter(x =>
  //       this.currentDate.getFullYear() == new Date(x.expires).getFullYear()
  //       && new Date(x.expires).getMonth() == month)

  //     this.gridListCommonHelper.lengthPaginator.next(result.length)

  //     const ordered = this.arrayOrderByDate(result, 'expires')

  //     result = of(ordered.slice(0, this.pageSize))
  //   }

  //   if (month == -1) {

  //     result = searchResult.filter(x =>
  //       this.currentDate.getFullYear() == new Date(x.expires).getFullYear()
  //       && new Date(x.expires).getMonth() == this.currentDate.getMonth())

  //     this.gridListCommonHelper.lengthPaginator.next(result.length)

  //     const ordered = this.arrayOrderByDate(result, 'expires')

  //     result = of(ordered.slice(0, this.pageSize));
  //   }

  //   return result;

  // }

  // isExpires(entities: ListGridCreditCardExpensesDto[], selectedMonth: number, currentPage: number, pageSize: number) {
  //   if (selectedMonth == -1) {
  //     const result = entities.filter(x =>
  //       //check Year
  //       (this.currentDate.getFullYear() == new Date(x.expires).getFullYear())
  //     );
  //     return of(result.filter(x =>
  //       //checkWasPaid
  //       (this.minValue.getFullYear() == new Date(x.wasPaid).getFullYear())
  //       &&
  //       //checkIsExpires
  //       (new Date(this.currentDateWithoutHours) > new Date(new Date(x.expires).setHours(0, 0, 0, 0)))).slice(currentPage, pageSize))
  //   }
  //   else {
  //     const checkPeriod = entities.filter(x =>
  //       //check Year
  //       (this.currentDate.getFullYear() == new Date(x.expires).getFullYear())
  //       &&
  //       //check month
  //       (new Date(x.expires).getMonth() == selectedMonth)
  //     );

  //     const result = checkPeriod.filter(x =>
  //       //checkWasPaid
  //       (this.minValue.getFullYear() == new Date(x.wasPaid).getFullYear())
  //       &&
  //       //checkIsExpires
  //       (new Date(this.currentDateWithoutHours) > new Date(new Date(x.expires).setHours(0, 0, 0, 0)))
  //     )

  //     return of(result.slice(currentPage, pageSize))
  //   }
  // }

  // isPending(entities: ListGridCreditCardExpensesDto[], selectedMonth: number, currentPage: number, pageSize: number) {

  //   if (selectedMonth == -1) {
  //     const result = entities.filter(x =>
  //       //check Year
  //       (this.currentDate.getFullYear() == new Date(x.expires).getFullYear())
  //       &&
  //       //check month
  //       (new Date(x.expires).getMonth() <= this.currentDate.getMonth())
  //     );
  //     return of(result.filter(x =>
  //       //checkWasPaid
  //       (this.minValue.getFullYear() == new Date(x.wasPaid).getFullYear())
  //       &&
  //       //checkIsPendig
  //       (new Date(this.currentDateWithoutHours) <= new Date(new Date(x.expires).setHours(0, 0, 0, 0)))).slice(currentPage, pageSize))
  //   }
  //   else {

  //     const checkPeriod = entities.filter(x =>
  //       //check Year
  //       (this.currentDate.getFullYear() == new Date(x.expires).getFullYear())
  //       &&
  //       //check month
  //       (new Date(x.expires).getMonth() == selectedMonth)
  //     );

  //     const result = checkPeriod.filter(x =>
  //       //checkWasPaid
  //       (this.minValue.getFullYear() == new Date(x.wasPaid).getFullYear())
  //       &&
  //       //checkIsPendig
  //       (new Date(this.currentDateWithoutHours) <= new Date(new Date(x.expires).setHours(0, 0, 0, 0)))

  //     )

  //     return of(result.slice(currentPage, pageSize))
  //   }

  // }

  // isPaid(entities: ListGridCreditCardExpensesDto[], selectedMonth: number, currentPage: number, pageSize: number) {
  //   if (selectedMonth == -1) {
  //     const result = entities.filter(x =>
  //       //check Year
  //       (this.currentDate.getFullYear() == new Date(x.expires).getFullYear())
  //       &&
  //       //check month
  //       (new Date(x.expires).getMonth() <= this.currentDate.getMonth())
  //     );
  //     return of(result.filter(x =>
  //       //checkWasPaid
  //       (this.minValue.getFullYear() == new Date(x.wasPaid).getFullYear())
  //       &&
  //       //checkIsPendig
  //       (new Date(this.currentDateWithoutHours) <= new Date(new Date(x.expires).setHours(0, 0, 0, 0)))).slice(currentPage, pageSize))
  //   }
  //   else {
  //     const checkPeriod = entities.filter(x =>
  //       //check Year
  //       (this.currentDate.getFullYear() == new Date(x.expires).getFullYear())
  //       &&
  //       //check month
  //       (new Date(x.expires).getMonth() == selectedMonth)
  //     );
  //     return of(checkPeriod.filter(x => this.minValue.getFullYear() != new Date(x.wasPaid).getFullYear()).slice(currentPage, pageSize))
  //   }
  // }





}
