import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ImportsListFilterSearch } from './useful/imports-list-filter-search';
import { FormControl } from '@angular/forms';
import { FilterControlListProduct } from './useful/filter-control-list-product';

@Component({
  selector: 'search-product-list',
  template: `
  <mat-form-field appearance="outline">
    <mat-label>{{'Pesquisar'}}</mat-label>
    <input #field (input)="search(field.value)" type="text" matInput placeholder="Pesquisar" [attr.for]="'Pesquisar'" [formControl]="formControlSearch">
</mat-form-field>
  `,
  styles: [
    `
  mat-form-field{
    width: 100%;
  }
    `
  ],
  standalone: true,
  imports: [ImportsListFilterSearch],

})
export class SearchProductListComponent extends FilterControlListProduct implements OnInit {

  constructor() {

    super()

  }

  formControlSearch = new FormControl('');

  @Output() fieldSearch = new EventEmitter<string>();


  search(input: string) {
    this.fieldSearch.emit(input);
  }


  ngOnInit(): void {
  }

}
