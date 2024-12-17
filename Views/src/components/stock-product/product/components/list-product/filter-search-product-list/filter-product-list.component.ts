import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseList } from 'src/shared/components/list-g/extends/base-list';
import { ManufacturerDto } from '../../../dtos/manufacturer-dto';
import { ModelDto } from '../../../dtos/model-dto';
import { ProductTypeDto } from '../../../dtos/product-type-dto';
import { SegmentDto } from '../../../dtos/segment-dto';
import { ProductList } from '../dto/product-list';
import { ImportsListFilterSearch } from './useful/imports-list-filter-search';

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
    this.makeSegmentsToFilterSelect();
    this.makemanufacturersToFilterSelect();
  }

  makeSegmentsToFilterSelect() {
    const noDuplicate = Array.from(new Set(this.segments.map(x => x.name.toLowerCase())));
    const segmentsNew: SegmentDto[] = [];
    noDuplicate.forEach((x, i) => {
      const segment = new SegmentDto();
      segment.id = i;
      segment.name = x;
      segmentsNew.push(segment)
    })
    this.segments$ = of(segmentsNew);
  }

  makemanufacturersToFilterSelect() {
    const noDuplicate = Array.from(new Set(this.manufacturers.map(x => x.name.toLowerCase())));
    const manufacturersNew: ManufacturerDto[] = [];
    noDuplicate.forEach((x, i) => {
      const manufacturer = new ManufacturerDto();
      manufacturer.id = i;
      manufacturer.name = x;
      manufacturersNew.push(manufacturer)
    })
    this.manufacturers$ = of(manufacturersNew);
  }

  resetControlForm = [false, false, false]

  //OBSERVABLES
  @Input('productsTypes') productsTypes$ = new Observable<ProductTypeDto[]>();
  @Input('productsList') productsList$ = new Observable<ProductList[]>();
  @Output('outProductsListFiltered') outProductsListFiltered$ = new EventEmitter<Observable<ProductList[]>>();

  segments$: Observable<SegmentDto[]>;
  manufacturers$: Observable<ManufacturerDto[]>
  models$: Observable<ModelDto[]>

  @Input() segments: SegmentDto[] = [];
  @Input() manufacturers: ManufacturerDto[] = [];
  models: ModelDto[] = [];

  formControlSearch = new FormControl('');

  @Output() fieldSearch = new EventEmitter<string>();


  search(input: string) {
    this.fieldSearch.emit(input);
  }




  onSelectedProduct(id: number) {
    this.productsTypes$.subscribe((x: ProductTypeDto[]) => {

      const result = x.find(y => y.id == id);
      this.filterType('productType', result.name, this.productsList$);
    });

    this.resetFormControl(0);
  }

  onSelectedSegment(id: number) {
    this.segments$.subscribe((x: SegmentDto[]) => {

      const result = x.find(y => y.id == id);

      this.filterType('segment', result.name, this.productsList$);
    });

    this.resetFormControl(1);
  }

  onSelectedManufacturer(id: number) {

    this.manufacturers$.subscribe((x: ManufacturerDto[]) => {

      const result = x.find(y => y.id == id);

      this.filterType('manufacturer', result.name, this.productsList$);

    });

    this.resetFormControl(2);
  }

  resetFormControl(entity: number) {
    this.resetControlForm.forEach((x, index) => {
      if (index == entity)
        this.resetControlForm[index] = false;
      else
        this.resetControlForm[index] = true;
    })
  }


  filterType(entityToFilter: string, type: string, productsList$: Observable<any[]>) {

    const result = productsList$.pipe(
      map((productList: any[]) => {
        return productList.filter(x => this.removeAccentsSpecialCharacters(x[entityToFilter].key.toLowerCase()) == this.removeAccentsSpecialCharacters(type.toLowerCase()));
      }))
    this.outProductsListFiltered$.emit(result);

  }


}
