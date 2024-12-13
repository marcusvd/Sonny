import { Component, OnInit } from '@angular/core';
import { ImportsListFilterSearch } from './useful/imports-list-filter-search';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'filter-search-product-list',
  templateUrl: './filter-search-product-list.component.html',
  styleUrls: ['./filter-search-product-list.component.css'],
  standalone:true,
  imports: [ImportsListFilterSearch],

})
export class FilterSearchProductListComponent implements OnInit {

  constructor() { }

  formControlSearch = new FormControl('');

  ngOnInit(): void {
  }

}
