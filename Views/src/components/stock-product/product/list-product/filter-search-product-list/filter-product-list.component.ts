import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';


import { BaseList } from 'src/shared/components/list-g/extends/base-list';
import { ManufacturerDto } from '../../dtos/manufacturer-dto';
import { ProductTypeDto } from '../../dtos/product-type-dto';
import { SegmentDto } from '../../dtos/segment-dto';
import { ProductList } from '../dto/product-list';
import { makeFilterSelectByManufacturer, makeFilterSelectBySegment } from './helpers/make-select-filter';
import { onSelectedManufacturer, onSelectedProduct, onSelectedSegment, resetControlForm } from './helpers/on-select-entity-filter';
import { formControlSearch, search } from './helpers/search-field';
import { ImportsListFilterSearch } from './useful/imports-list-filter-search';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'filter-product-list',
  templateUrl: './filter-product-list.component.html',
  styleUrls: ['./filter-product-list.component.css'],
  standalone: true,
  imports: [ImportsListFilterSearch],

})
export class FilterProductListComponent extends BaseList implements OnInit {

  constructor(
  ) { super() }


  ngOnInit(): void {
    this.segments$ = makeFilterSelectBySegment(this.segments);
    this.manufacturers$ = makeFilterSelectByManufacturer(this.manufacturers);
  }

  //INPUTS-OUTPUTS
  @Input('productsTypes') productsTypes$ = new Observable<ProductTypeDto[]>();
  @Input('productsList') productsList$ = new Observable<ProductList[]>();
  @Input() segments: SegmentDto[] = [];
  @Input() manufacturers: ManufacturerDto[] = [];
  @Output('outProductsListFiltered') outProductsListFiltered$ = new EventEmitter<Observable<ProductList[]>>();
  @Output() outFieldSearch = new EventEmitter<string>();

  //OBSERVABLES
  segments$: Observable<SegmentDto[]>;
  manufacturers$: Observable<ManufacturerDto[]>
  
  // FORMCONTROLS
  productTypeFormControl = new FormControl(null);
  productTypeSearchFormControl = new FormControl('');

  segmentFormControl = new FormControl(null);
  segmentSearchFormControl = new FormControl('');

  manufacturerFormControl = new FormControl(null);
  manufacturerSearchFormControl = new FormControl('');

  //SIMPLE-VARIABLES
  resetControlForm = resetControlForm
  formControlSearch = formControlSearch;

  //METHODS
  search = search
  onSelectedProduct = onSelectedProduct
  onSelectedSegment = onSelectedSegment
  onSelectedManufacturer = onSelectedManufacturer

}
