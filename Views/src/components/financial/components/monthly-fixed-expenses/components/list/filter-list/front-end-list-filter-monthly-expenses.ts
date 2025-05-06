import { FormControl } from '@angular/forms';
import {PageEvent as PageEvent } from '@angular/material/paginator';
import { of } from "rxjs";


import { List } from 'src/shared/components/inheritance/list/list';
import { ListGridMonthlyFixedExpenseDto } from '../dto/monthly-fixed-expense-tracking-list-grid-dto';

export class FrontEndListFilterMonthlyExpenses extends List {

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
        && new Date(x.expires).getMonth() <= this.currentDate.getMonth())

      this.gridListCommonHelper.lengthPaginator.next(result.length)

      const ordered = this.arrayOrderByDate(result, 'expires')

      result = of(ordered.slice(0, this.pageSize));
    }

    return result;

  }

  orderBy(field: string) {

    if (field.toLowerCase() == 'Vencimento'.toLowerCase())
      this.entities$ = this.orderByFrontEnd(this.entities$, { 'expires': new Date() });

    if (field.toLowerCase() == 'Preço'.toLowerCase())
      this.entities$ = this.orderByFrontEnd(this.entities$, { price: 0 });

    if (field.toLowerCase() == 'Despesa'.toLowerCase())
      this.entities$ = this.orderByFrontEnd(this.entities$, { 'name': 'name' });

    if (field.toLowerCase() == 'Status'.toLowerCase())
      this.entities$ = this.orderByFrontEnd(this.entities$, { 'wasPaid': new Date() });
  }

 override onSelectedMonth(entities: ListGridMonthlyFixedExpenseDto[], selectedMonth: number) {
    let result = null;

    if (selectedMonth != -1) {

      result = entities.filter(x =>
        this.currentDate.getFullYear() == new Date(x.expires).getFullYear()
        && new Date(x.expires).getMonth() == selectedMonth)

      this.gridListCommonHelper.lengthPaginator.next(result.length)

      const ordered = this.arrayOrderByDate(result, 'expires')

      result = of(ordered.slice(0, this.pageSize))
    }

    if (selectedMonth == -1) {

      result = entities.filter(x =>
        this.currentDate.getFullYear() == new Date(x.expires).getFullYear()
        && new Date(x.expires).getMonth() <= this.currentDate.getMonth())

      this.gridListCommonHelper.lengthPaginator.next(result.length)

      const ordered = this.arrayOrderByDate(result, 'expires')

      result = of(ordered.slice(0, this.pageSize));
    }
    return result;
  }

  getCurrentByCurrentYearAndEqualAndLessThenSelectedMonth(entities: ListGridMonthlyFixedExpenseDto[], currentPage: number, pageSize: number, selectedMonth: number) {

    if (selectedMonth == -1)
      selectedMonth = this.currentDate.getMonth();

    const result = entities.filter(x =>
      this.currentDate.getFullYear() == new Date(x.expires).getFullYear()
      && new Date(x.expires).getMonth() == selectedMonth
    )

    this.gridListCommonHelper.lengthPaginator.next(result.length)

    const ordered = this.arrayOrderByDate(result, 'expires')

    this.entities$ = of(ordered.slice(currentPage, pageSize))
  }

  onPageChangeMonthly(event: PageEvent, month: number) {

    this.paginatorAbove.pageIndex = event.pageIndex;
    this.paginatorBelow.pageIndex = event.pageIndex;
    const pageSize = event.pageSize;
    const startIndex = event.pageIndex * pageSize;
    const endIndex = startIndex + pageSize;
    if (this.termSearched)
      this.applyFilterOnPageChangeMonthlySearchByTerm(month, startIndex, endIndex);
    else {
      if (event.previousPageIndex < event.pageIndex)
        this.applyFilterOnPageChangeMonthly(this.entities, month, startIndex, endIndex)

      else if (event.previousPageIndex > event.pageIndex)
        this.applyFilterOnPageChangeMonthly(this.entities, month, startIndex, endIndex)
    }

    if (this.selectedCheckboxFilter == 'isPaid')
      this.isPaidPagination(month, startIndex, endIndex);

    if (this.selectedCheckboxFilter == 'isExpires')
      this.isExpiresPagination(month, startIndex, endIndex);

    if (this.selectedCheckboxFilter == 'isPending')
      this.isPendingPagination(month, startIndex, endIndex);


  }
  private applyFilterOnPageChangeMonthly(entities: ListGridMonthlyFixedExpenseDto[], month: number, startIndex: number, endIndex: number) {
    if (month != -1) {
      const result = entities.filter(x =>
        this.currentDate.getFullYear() == new Date(x.expires).getFullYear()
        && new Date(x.expires).getMonth() == month)

      const ordered = this.arrayOrderByDate(result, 'expires')

      this.entities$ = of(ordered.slice(startIndex, endIndex))
    }

    if (month == -1) {
      const result = entities.filter(x =>
        this.currentDate.getFullYear() == new Date(x.expires).getFullYear()
        && new Date(x.expires).getMonth() <= this.currentDate.getMonth())

      const ordered = this.arrayOrderByDate(result, 'expires')

      this.entities$ = of(ordered.slice(startIndex, endIndex))
    }
  }
  private applyFilterOnPageChangeMonthlySearchByTerm(month: number, startIndex: number, endIndex: number) {
    let result = null;

    const searchResult = this.searchField(this.entities, this.termSearched);

    if (month != -1) {

      result = searchResult.filter(x =>
        this.currentDate.getFullYear() == new Date(x.expires).getFullYear()
        && new Date(x.expires).getMonth() == month)

      const ordered = this.arrayOrderByDate(result, 'expires')

      result = of(ordered.slice(startIndex, endIndex))
    }

    if (month == -1) {

      result = searchResult.filter(x =>
        this.currentDate.getFullYear() == new Date(x.expires).getFullYear()
        && new Date(x.expires).getMonth() <= this.currentDate.getMonth())
      const ordered = this.arrayOrderByDate(result, 'expires')

      result = of(ordered.slice(startIndex, endIndex));
    }

    this.entities$ = result;
  }
  private isPaidPagination(selectedMonth: number, currentPage: number, pageSize: number) {
    if (selectedMonth == -1) {
      const result = this.entities.filter(x =>
        //check Year
        (this.currentDate.getFullYear() == new Date(x.expires).getFullYear())
        &&
        //check month
        (new Date(x.expires).getMonth() <= this.currentDate.getMonth())
      );

      //checkWasPaid
      const toReturn = result.filter(x => (new Date(x.wasPaid).getFullYear() != this.minValue.getFullYear()))

      //ordering
      const ordered = this.arrayOrderByDate(toReturn, 'expires')

      this.entities$ = of(ordered.slice(currentPage, pageSize))
    }

    if (selectedMonth != -1) {
      const result = this.entities.filter(x =>
        //check Year
        (this.currentDate.getFullYear() == new Date(x.expires).getFullYear())
        &&
        //check month
        (new Date(x.expires).getMonth() == selectedMonth)
      );

      //checkWasPaid
      const toReturn = result.filter(x => (new Date(x.wasPaid).getFullYear() != this.minValue.getFullYear()))

      //ordering
      const ordered = this.arrayOrderByDate(toReturn, 'expires')

      this.entities$ = of(ordered.slice(currentPage, pageSize))

    }
  }
  private isExpiresPagination(selectedMonth: number, currentPage: number, pageSize: number) {
    this.selectedCheckboxFilter = 'isExpires';
    if (selectedMonth == -1) {
      const checkPeriod = this.entities.filter(x =>
        //check Year
        (this.currentDate.getFullYear() == new Date(x.expires).getFullYear())
      );
      const result = checkPeriod.filter(x =>
        //checkWasPaid
        (this.minValue.getFullYear() == new Date(x.wasPaid).getFullYear())
        &&
        //checkIsExpires
        (new Date(this.currentDateWithoutHours) > new Date(new Date(x.expires).setHours(0, 0, 0, 0))));


      const ordered = this.arrayOrderByDate(result, 'expires')

      this.gridListCommonHelper.lengthPaginator.next(ordered.length)

      this.entities$ = of(ordered.slice(currentPage, pageSize))

    }
    else {
      const checkPeriod = this.entities.filter(x =>
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

      const ordered = this.arrayOrderByDate(result, 'expires')

      this.gridListCommonHelper.lengthPaginator.next(ordered.length)

      this.entities$ = of(ordered.slice(currentPage, pageSize))

    }
  }
  private isPendingPagination(selectedMonth: number, currentPage: number, pageSize: number) {

    if (selectedMonth == -1) {
      const checkPeriod = this.entities.filter(x =>
        //check Year
        (this.currentDate.getFullYear() == new Date(x.expires).getFullYear())
        &&
        //check month
        (new Date(x.expires).getMonth() <= this.currentDate.getMonth())
      );
      const result = checkPeriod.filter(x =>
        //checkWasPaid
        (this.minValue.getFullYear() == new Date(x.wasPaid).getFullYear())
        &&
        //checkIsPendig
        (new Date(this.currentDateWithoutHours) <= new Date(new Date(x.expires).setHours(0, 0, 0, 0))));

      const ordered = this.arrayOrderByDate(result, 'expires')

      this.entities$ = of(ordered.slice(currentPage, pageSize));
    }
    else {

      const checkPeriod = this.entities.filter(x =>
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
      const ordered = this.arrayOrderByDate(result, 'expires')

      this.entities$ = of(ordered.slice(currentPage, pageSize));
      // return of(result.slice(currentPage, pageSize))
    }

  }

  selectedCheckboxFilter: string = null;
  isExpires(selectedMonth: number, currentPage: number, pageSize: number) {
    this.selectedCheckboxFilter = 'isExpires';
    if (selectedMonth == -1) {
      const checkPeriod = this.entities.filter(x =>
        //check Year
        (this.currentDate.getFullYear() == new Date(x.expires).getFullYear())
      );
      const result = checkPeriod.filter(x =>
        //checkWasPaid
        (this.minValue.getFullYear() == new Date(x.wasPaid).getFullYear())
        &&
        //checkIsExpires
        (new Date(this.currentDateWithoutHours) > new Date(new Date(x.expires).setHours(0, 0, 0, 0)))).slice(currentPage, pageSize);


      const ordered = this.arrayOrderByDate(result, 'expires')

      this.gridListCommonHelper.lengthPaginator.next(ordered.length)

      this.entities$ = of(ordered.slice(currentPage, pageSize))

    }
    else {
      const checkPeriod = this.entities.filter(x =>
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

      const ordered = this.arrayOrderByDate(result, 'expires')

      this.gridListCommonHelper.lengthPaginator.next(ordered.length)

      this.entities$ = of(ordered.slice(currentPage, pageSize))

    }
  }

  isPending(selectedMonth: number, currentPage: number, pageSize: number) {
    this.selectedCheckboxFilter = 'isPending';
    if (selectedMonth == -1) {
      const checkPeriod = this.entities.filter(x =>
        //check Year
        (this.currentDate.getFullYear() == new Date(x.expires).getFullYear())
        &&
        //check month
        (new Date(x.expires).getMonth() <= this.currentDate.getMonth())
      );
      const result = checkPeriod.filter(x =>
        //checkWasPaid
        (this.minValue.getFullYear() == new Date(x.wasPaid).getFullYear())
        &&
        //checkIsPendig
        (new Date(this.currentDateWithoutHours) <= new Date(new Date(x.expires).setHours(0, 0, 0, 0))));

      const ordered = this.arrayOrderByDate(result, 'expires')

      this.gridListCommonHelper.lengthPaginator.next(ordered.length)

      this.entities$ = of(ordered.slice(currentPage, pageSize))
    }
    else {

      const checkPeriod = this.entities.filter(x =>
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
      const ordered = this.arrayOrderByDate(result, 'expires')

      this.gridListCommonHelper.lengthPaginator.next(ordered.length)

      this.entities$ = of(ordered.slice(currentPage, pageSize))
    }

  }

  isPaid(selectedMonth: number, currentPage: number, pageSize: number) {
    this.selectedCheckboxFilter = 'isPaid';
    if (selectedMonth == -1) {
      const result = this.entities.filter(x =>
        //check Year
        (this.currentDate.getFullYear() == new Date(x.expires).getFullYear())
        &&
        //check month
        (new Date(x.expires).getMonth() <= this.currentDate.getMonth())
      );

      //checkWasPaid
      const toReturn = result.filter(x => (new Date(x.wasPaid).getFullYear() != this.minValue.getFullYear()))

      //ordering
      const ordered = this.arrayOrderByDate(toReturn, 'expires')

      this.gridListCommonHelper.lengthPaginator.next(ordered.length)

      this.entities$ = of(ordered.slice(currentPage, pageSize))
    }

    if (selectedMonth != -1) {
      const result = this.entities.filter(x =>
        //check Year
        (this.currentDate.getFullYear() == new Date(x.expires).getFullYear())
        &&
        //check month
        (new Date(x.expires).getMonth() == selectedMonth)
      );

      //checkWasPaid
      const toReturn = result.filter(x => (new Date(x.wasPaid).getFullYear() != this.minValue.getFullYear()))

      //ordering
      const ordered = this.arrayOrderByDate(toReturn, 'expires')

      this.gridListCommonHelper.lengthPaginator.next(ordered.length)

      this.entities$ = of(ordered.slice(currentPage, pageSize))
    }

  }

}
