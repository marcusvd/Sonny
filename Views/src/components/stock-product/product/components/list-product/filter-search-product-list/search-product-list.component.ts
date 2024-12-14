import { Component, OnInit } from '@angular/core';
import { ImportsListFilterSearch } from './useful/imports-list-filter-search';
import { FormControl } from '@angular/forms';
import { FilterControlListProduct } from './useful/filter-control-list-product';

@Component({
  selector: 'search-product-list',
  template: `
  <mat-form-field appearance="outline">
    <mat-label>{{'Pesquisar'}}</mat-label>
    <input type="text" matInput placeholder="Pesquisar" [attr.for]="'Pesquisar'" [formControl]="formControlSearch">
</mat-form-field>
  `,
  styleUrls: ['./search-product-list.component.css'],
  standalone:true,
  imports: [ImportsListFilterSearch],

})
export class SearchProductListComponent extends FilterControlListProduct implements OnInit {

  constructor() { 

    super()

  }

  formControlSearch = new FormControl('');

  ngOnInit(): void {
  }

}
