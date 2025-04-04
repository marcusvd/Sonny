import * as diacritics from 'diacritics';
import { of } from "rxjs";
import { ListGridCreditCardExpensesDto } from '../dto/list-grid-credit-card-expenses-dto';
import { List } from 'src/shared/components/inheritance/list/list';
import { FormControl } from '@angular/forms';

export class FrontEndListFilterCreditCardExpenses extends List {


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

  query($event: FormControl, month: number) {
    this.termSearched = $event.value
    let result = null;

    const searchResult = this.searchField(this.entities, this.termSearched);

    if (month != -1) {

      result = searchResult.filter(x =>
        this.currentDate.getFullYear() == new Date(x.expires).getFullYear()
        && new Date(x.expires).getMonth() == month)

      this.gridListCommonHelper.lengthPaginator.next(result.length)

      const ordered = this.arrayOrderByDate(result, 'expires')

      result = of(ordered.slice(0, this.pageSize))
    }

    if (month == -1) {

      result = searchResult.filter(x =>
        this.currentDate.getFullYear() == new Date(x.expires).getFullYear()
        && new Date(x.expires).getMonth() == this.currentDate.getMonth())

      this.gridListCommonHelper.lengthPaginator.next(result.length)

      const ordered = this.arrayOrderByDate(result, 'expires')

      result = of(ordered.slice(0, this.pageSize));
    }

    return result;

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
