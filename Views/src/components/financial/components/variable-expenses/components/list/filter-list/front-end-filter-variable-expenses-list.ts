import * as diacritics from 'diacritics';
import { Observable, of } from "rxjs";
import { map } from 'rxjs/operators';
import { VariableExpensesListGridDto } from '../dto/variable-expenses-list-grid-dto';
import { List } from 'src/shared/components/inheritance/list/list';
import { FormControl } from '@angular/forms';
import { LegacyPageEvent as PageEvent } from '@angular/material/paginator';

export class FrontEndFilterVariableExpenseslist extends List {

  orderBy(field: string) {

    if (field.toLowerCase() == 'Vencimento'.toLowerCase())
      this.entities$ = this.orderByFrontEnd(this.entities$, { 'paidDay': new Date() });

    if (field.toLowerCase() == 'Preço'.toLowerCase())
      this.entities$ = this.orderByFrontEnd(this.entities$, { price: 0 });

    if (field.toLowerCase() == 'Despesa'.toLowerCase())
      this.entities$ = this.orderByFrontEnd(this.entities$, { 'name': 'name' });

    if (field.toLowerCase() == 'Status'.toLowerCase())
      this.entities$ = this.orderByFrontEnd(this.entities$, { 'wasPaid': new Date() });
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
  
  }
  private applyFilterOnPageChangeMonthly(entities: VariableExpensesListGridDto[], month: number, startIndex: number, endIndex: number) {
    if (month != -1) {
      const result = entities.filter(x =>
        this.currentDate.getFullYear() == new Date(x.paidDay).getFullYear()
        && new Date(x.paidDay).getMonth() == month)

      const ordered = this.arrayOrderByDate(result, 'paidDay')

      this.entities$ = of(ordered.slice(startIndex, endIndex))
    }

    if (month == -1) {
      const result = entities.filter(x =>
        this.currentDate.getFullYear() == new Date(x.paidDay).getFullYear()
        && new Date(x.paidDay).getMonth() <= this.currentDate.getMonth())

      const ordered = this.arrayOrderByDate(result, 'paidDay')

      this.entities$ = of(ordered.slice(startIndex, endIndex))
    }
  }
  private applyFilterOnPageChangeMonthlySearchByTerm(month: number, startIndex: number, endIndex: number) {
    let result = null;

    const searchResult = this.searchField(this.entities, this.termSearched);

    if (month != -1) {

      result = searchResult.filter(x =>
        this.currentDate.getFullYear() == new Date(x.paidDay).getFullYear()
        && new Date(x.paidDay).getMonth() == month)

      const ordered = this.arrayOrderByDate(result, 'paidDay')

      result = of(ordered.slice(startIndex, endIndex))
    }

    if (month == -1) {

      result = searchResult.filter(x =>
        this.currentDate.getFullYear() == new Date(x.paidDay).getFullYear()
        && new Date(x.paidDay).getMonth() <= this.currentDate.getMonth())
      const ordered = this.arrayOrderByDate(result, 'paidDay')

      result = of(ordered.slice(startIndex, endIndex));
    }

    this.entities$ = result;
  }

  override onSelectedMonth(entities: VariableExpensesListGridDto[], selectedMonth: number) {
    let result = null;

    if (selectedMonth != -1) {

      result = entities.filter(x =>
        this.currentDate.getFullYear() == new Date(x.paidDay).getFullYear()
        && new Date(x.paidDay).getMonth() == selectedMonth)

      this.gridListCommonHelper.lengthPaginator.next(result.length)

      const ordered = this.arrayOrderByDate(result, 'paidDay')

      result = of(ordered.slice(0, this.pageSize))
    }

    if (selectedMonth == -1) {

      result = entities.filter(x =>
        this.currentDate.getFullYear() == new Date(x.paidDay).getFullYear()
        && new Date(x.paidDay).getMonth() <= this.currentDate.getMonth())

      this.gridListCommonHelper.lengthPaginator.next(result.length)

      const ordered = this.arrayOrderByDate(result, 'paidDay')

      result = of(ordered.slice(0, this.pageSize));
    }
    return result;
  }

  query($event: FormControl, month: number) {
    this.termSearched = $event.value
    let result = null;

    const searchResult = this.searchField(this.entities, this.termSearched);

    if (month != -1) {

      result = searchResult.filter(x =>
        this.currentDate.getFullYear() == new Date(x.paidDay).getFullYear()
        && new Date(x.paidDay).getMonth() == month)

      this.gridListCommonHelper.lengthPaginator.next(result.length)

      const ordered = this.arrayOrderByDate(result, 'paidDay')

      result = of(ordered.slice(0, this.pageSize))
    }

    if (month == -1) {

      result = searchResult.filter(x =>
        this.currentDate.getFullYear() == new Date(x.paidDay).getFullYear()
        && new Date(x.paidDay).getMonth() <= this.currentDate.getMonth())

      this.gridListCommonHelper.lengthPaginator.next(result.length)

      const ordered = this.arrayOrderByDate(result, 'paidDay')

      result = of(ordered.slice(0, this.pageSize));
    }

    return result;

  }
}
