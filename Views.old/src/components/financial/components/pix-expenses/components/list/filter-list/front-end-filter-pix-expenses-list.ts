import { PageEvent } from '@angular/material/paginator';
import { of } from "rxjs";
import { List } from 'src/shared/components/inheritance/list/list';
import { PixExpenseListGridDto } from '../dto/pix-expense-list-grid-dto';
import { FormControl } from '@angular/forms';

export class FrontEndFilterPixExpenseslist extends List {

  onPageChangePixExpenses(event: PageEvent, month: number) {

    this.paginatorAbove.pageIndex = event.pageIndex;
    this.paginatorBelow.pageIndex = event.pageIndex;
    const pageSize = event.pageSize;
    const startIndex = event.pageIndex * pageSize;
    const endIndex = startIndex + pageSize;

    if (this.termSearched)
      this.applyFilterOnPageChangeMonthlySearchByTerm(month, startIndex, endIndex);
    else {
      if (event.previousPageIndex < event.pageIndex) {
        this.applyFilterOnPageChangeMonthly(this.entities, month, startIndex, endIndex)
        console.log(month)
      }

      else if (event.previousPageIndex > event.pageIndex)
        this.applyFilterOnPageChangeMonthly(this.entities, month, startIndex, endIndex)
    }
  }
  private applyFilterOnPageChangeMonthly(entities: PixExpenseListGridDto[], month: number, startIndex: number, endIndex: number) {
    if (month != -1) {

      const result = entities.filter(x =>
        this.currentDate.getFullYear() == new Date(x.expenseDayToFilter).getFullYear()
        && new Date(x.expenseDayToFilter).getMonth() == month)

      const ordered = this.arrayOrderByDate(result, 'expenseDayToFilter')

      this.entities$ = of(ordered.slice(startIndex, endIndex))
    }

    if (month == -1) {
      const result = entities.filter(x =>
        this.currentDate.getFullYear() == new Date(x.expenseDayToFilter).getFullYear()
        && new Date(x.expenseDayToFilter).getMonth() <= this.currentDate.getMonth())

      const ordered = this.arrayOrderByDate(result, 'expenseDayToFilter')

      this.entities$ = of(ordered.slice(startIndex, endIndex))
    }
  }
  private applyFilterOnPageChangeMonthlySearchByTerm(month: number, startIndex: number, endIndex: number) {
    let result = null;

    const searchResult = this.searchField(this.entities, this.termSearched);

    if (month != -1) {

      result = searchResult.filter(x =>
        this.currentDate.getFullYear() == new Date(x.expenseDayToFilter).getFullYear()
        && new Date(x.expenseDayToFilter).getMonth() == month)

      const ordered = this.arrayOrderByDate(result, 'expenseDayToFilter')

      result = of(ordered.slice(startIndex, endIndex))
    }

    if (month == -1) {

      result = searchResult.filter(x =>
        this.currentDate.getFullYear() == new Date(x.expenseDayToFilter).getFullYear()
        && new Date(x.expenseDayToFilter).getMonth() <= this.currentDate.getMonth())
      const ordered = this.arrayOrderByDate(result, 'expenseDayToFilter')

      result = of(ordered.slice(startIndex, endIndex));
    }

    this.entities$ = result;
  }
  
  query($event: FormControl, month: number) {
    this.termSearched = $event.value
    let result = null;

    const searchResult = this.searchField(this.entities, this.termSearched);

    if (month != -1) {

      result = searchResult.filter(x =>
        this.currentDate.getFullYear() == new Date(x.expenseDayToFilter).getFullYear()
        && new Date(x.expenseDayToFilter).getMonth() == month)

      this.gridListCommonHelper.lengthPaginator.next(result.length)

      const ordered = this.arrayOrderByDate(result, 'expenseDayToFilter')

      result = of(ordered.slice(0, this.pageSize))
    }

    if (month == -1) {

      result = searchResult.filter(x =>
        this.currentDate.getFullYear() == new Date(x.expenseDayToFilter).getFullYear()
        && new Date(x.expenseDayToFilter).getMonth() <= this.currentDate.getMonth())

      this.gridListCommonHelper.lengthPaginator.next(result.length)

      const ordered = this.arrayOrderByDate(result, 'expenseDayToFilter')

      result = of(ordered.slice(0, this.pageSize));
    }

    return result;

  }

  orderBy(field: string) {
    if (field.toLowerCase() == 'Dia'.toLowerCase())
      this.entities$ = this.orderByFrontEnd(this.entities$, { 'expenseDayToFilter': new Date() });

    if (field.toLowerCase() == 'Preço'.toLowerCase())
      this.entities$ = this.orderByFrontEnd(this.entities$, { price: 0 });

    if (field.toLowerCase() == '	Pix Saída'.toLowerCase())
      this.entities$ = this.orderByFrontEnd(this.entities$, { 'pixOutId': 0 });

    if (field.toLowerCase() == 'Beneficiado'.toLowerCase())
      this.entities$ = this.orderByFrontEnd(this.entities$, { 'benefitedName': 'benefitedName' });
  }

}
