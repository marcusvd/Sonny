import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ManufacturerDto } from '../../../dtos/manufacturer-dto';
import { ModelDto } from '../../../dtos/model-dto';
import { ProductTypeDto } from '../../../dtos/product-type-dto';
import { SegmentDto } from '../../../dtos/segment-dto';
import { ProductList } from '../dto/product-list';
import { ImportsListFilterSearch } from './useful/imports-list-filter-search';
import { BaseList } from 'src/shared/components/list-g/extends/base-list';

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

  formControlSearch = new FormControl('');

  //OBSERVABLES
  @Input('productsTypes') productsTypes$ = new Observable<ProductTypeDto[]>();
  @Input('productsList') productsList$ = new Observable<ProductList[]>();
  @Output('outProductsListFiltered') outProductsListFiltered$ = new EventEmitter<Observable<ProductList[]>>();

  segments$: Observable<SegmentDto[]>;
  manufacturers$: Observable<ManufacturerDto[]>
  models$: Observable<ModelDto[]>

  onSelectedProduct(id: number) {

    this.manufacturers$ = null;
    this.segments$ = this.productsTypes$.pipe(map(x => x.find(y => y.id == id).segments));

    this.productsTypes$.subscribe((x: ProductTypeDto[]) => {

      const result = x.find(y => y.id == id);
      this.filterType('productType', result.name, this.productsList$);

    });
  }

  onSelectedSegment(id: number) {
    // this.clearFormArraySegmentAndSub();

    this.manufacturers$ = this.segments$.pipe(
      map(x => x.find(segment => segment.id == id).manufacturers)
    )

    this.segments$.subscribe((x: SegmentDto[]) => {

      const result = x.find(y => y.id == id);

      this.filterType('segment', result.name, this.productsList$);
    });

  
  }

  onSelectedManufacturer(id: number) {
    // this.models.clear();
    // this.manufacturers.clear();

    this.models$ = this.manufacturers$.pipe(
      map(x => x.find(manufacturer => manufacturer.id == id).models)
    )

    this.manufacturers$.subscribe((x: ManufacturerDto[]) => {

      const result = x.find(y => y.id == id);

      this.filterType('manufacturer', result.name, this.productsList$);
    });
  }


  filterType(entityToFilter: string, type: string, productsList$: Observable<any[]>) {

    const result = productsList$.pipe(
      map((productList: any[]) => {
        return productList.filter(x => this.removeAccentsSpecialCharacters(x[entityToFilter].key.toLowerCase()) == this.removeAccentsSpecialCharacters(type.toLowerCase()));
      }))
      this.outProductsListFiltered$.emit(result);

    // if (entityToFilter == 'productType') {
   
    //   const result = productsList$.pipe(
    //     map((productList: ProductList[]) => {
    //       return productList.filter(x => this.removeAccentsSpecialCharacters(x.productType.key.toLowerCase()) == this.removeAccentsSpecialCharacters(type.toLowerCase()));
    //     }))
    //     this.outProductsListFiltered$.emit(result);
    // }
    
    // if (entityToFilter == 'segment') {

    //   const result = productsList$.pipe(
    //     map((productList: ProductList[]) => {
    //       return productList.filter(x => this.removeAccentsSpecialCharacters(x.segment.key.toLowerCase()) == this.removeAccentsSpecialCharacters(type.toLowerCase()));
    //     }))
    //     this.outProductsListFiltered$.emit(result);
    // }
   
    // if (entityToFilter == 'manufacturer') {

    //   const result = productsList$.pipe(
    //     map((productList: ProductList[]) => {
    //       return productList.filter(x => this.removeAccentsSpecialCharacters(x[entityToFilter].key.toLowerCase()) == this.removeAccentsSpecialCharacters(type.toLowerCase()));
    //     }))
    //     this.outProductsListFiltered$.emit(result);
    // }



  }


  ngOnInit(): void {
  }

}
