import { of } from "rxjs";

import { FormControl } from '@angular/forms';
import { MatCheckboxChange as MatCheckboxChange } from '@angular/material/checkbox';
import {PageEvent as PageEvent } from "@angular/material/paginator";
import { List } from 'src/shared/components/inheritance/list/list';

export class FrontEndListFilterYearlyExpenses extends List {

  override onPageChangeFront(event: PageEvent) {
    this.paginatorAbove.pageIndex = event.pageIndex;
    this.paginatorBelow.pageIndex = event.pageIndex;
    const pageSize = event.pageSize;
    const startIndex = event.pageIndex * pageSize;
    const endIndex = startIndex + pageSize;
    this.startIndex = startIndex;
    this.endIndex = endIndex;

    if (event.previousPageIndex < event.pageIndex)
      this.entities$ = of(this.entities.slice(startIndex, endIndex));

    else if (event.previousPageIndex > event.pageIndex)
      this.entities$ = of(this.entities.slice(startIndex, endIndex));

    if (this.termSearched)
      this.entities$ = of(this.searchField(this.entities, this.termSearched));

    if (this.filterCheckBoxSelected)
      this.paginationWithQuery()

  }
  private paginationWithQuery() {
    let result = null;

    if (this.filterCheckBoxSelected == 'expired') {

      result = this.entities.filter(x => this.currentDateWithoutHours > new Date(x.expires).setHours(0, 0, 0, 0) && new Date(x.wasPaid).getFullYear() == this.minValue.getFullYear());
      if (this.termSearched) {
        const searchResult = this.searchField(result, this.termSearched);
        this.entities$ = of(searchResult.slice(this.startIndex, this.endIndex));
      }
      else
        this.entities$ = of(result.slice(this.startIndex, this.endIndex));
    }

    if (this.filterCheckBoxSelected == 'pending') {
      result = this.entities.filter(x => this.minValue.getFullYear() == new Date(x.wasPaid).getFullYear() && this.currentDateWithoutHours < new Date(x.expires).setHours(0, 0, 0, 0));
      if (this.termSearched) {
        const searchResult = this.searchField(result, this.termSearched);
        this.entities$ = of(searchResult.slice(this.startIndex, this.endIndex));
      }
      else
        this.entities$ = of(result.slice(this.startIndex, this.endIndex));
    }

    if (this.filterCheckBoxSelected == 'paid') {
      result = this.entities.filter(x => this.minValue.getFullYear() != new Date(x.wasPaid).getFullYear());
      if (this.termSearched) {
        const searchResult = this.searchField(result, this.termSearched);
        this.entities$ = of(searchResult.slice(this.startIndex, this.endIndex));
      }
      else
        this.entities$ = of(result.slice(this.startIndex, this.endIndex));
    }

    if (this.filterCheckBoxSelected == null)
      result = this.queryNoFilterCheckBox();

    return result;

  }
  private queryNoFilterCheckBox() {
    let result = null;

    const searchResult = this.searchField(this.entities, this.termSearched);

    const ordered = this.arrayOrderByDate(searchResult, 'expires')

    result = searchResult;

    result = of(ordered.slice(0, this.pageSize))

    return result;
  }

  orderBy(field: string) {
    if (field.toLowerCase() == 'Vencimento'.toLowerCase())
      this.entities$ = this.orderByFrontEnd(this.entities$, { 'expires': new Date() });

    if (field.toLowerCase() == 'Preço'.toLowerCase())
      this.entities$ = this.orderByFrontEnd(this.entities$, { price: 0 });

    if (field.toLowerCase() == 'description'.toLowerCase())
      this.entities$ = this.orderByFrontEnd(this.entities$, { 'description': 'description' });

    if (field.toLowerCase() == 'status'.toLowerCase())
      this.entities$ = this.orderByFrontEnd(this.entities$, { 'wasPaid': new Date() });
  }

  filterView(checkbox: MatCheckboxChange) {
    if (checkbox.source.value == 'expired') {
      this.filter('expired', this.entities, 0, this.pageSize,'expires', 'wasPaid');
      this.filterCheckBoxSelected = 'expired';
    }

    if (checkbox.source.value == 'pending') {
      this.filter('pending', this.entities, 0, this.pageSize,'expires', 'wasPaid');
      this.filterCheckBoxSelected = 'pending';
    }

    if (checkbox.source.value == 'paid') {
      this.filter('paid', this.entities, 0, this.pageSize,'expires', 'wasPaid');
      this.filterCheckBoxSelected = 'paid';
    }
  }

  query($event: FormControl) {
    this.termSearched = $event.value

    let result = null;

    if (this.filterCheckBoxSelected == 'expired') {
    
      const searchResult = this.searchField(this.entities, this.termSearched);

      result = searchResult.filter(x => this.currentDateWithoutHours > new Date(x.expires).setHours(0, 0, 0, 0) && new Date(x.wasPaid).getFullYear() == this.minValue.getFullYear());
      this.gridListCommonHelper.lengthPaginator.next(result.length)
      return of(result.slice(0, this.pageSize));
    }

    if (this.filterCheckBoxSelected == 'pending') {
      const searchResult = this.searchField(this.entities, this.termSearched);
      result = searchResult.filter(x => this.minValue.getFullYear() == new Date(x.wasPaid).getFullYear() && this.currentDateWithoutHours < new Date(x.expires).setHours(0, 0, 0, 0));
      this.gridListCommonHelper.lengthPaginator.next(result.length)
      return of(result.slice(0, this.pageSize));
    }

    if (this.filterCheckBoxSelected == 'paid') {
      const searchResult = this.searchField(this.entities, this.termSearched);
      result = searchResult.filter(x => this.minValue.getFullYear() != new Date(x.wasPaid).getFullYear());
      this.gridListCommonHelper.lengthPaginator.next(result.length)
      return of(result.slice(0, this.pageSize));
    }

    if (this.filterCheckBoxSelected == null)
      result = this.queryNoFilterCheckBox();

    return result;
  }

}
