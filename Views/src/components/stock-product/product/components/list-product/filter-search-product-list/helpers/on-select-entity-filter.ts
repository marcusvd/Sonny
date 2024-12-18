import { EventEmitter } from "@angular/core";
import { Observable } from "rxjs";


import { ManufacturerDto } from "src/components/stock-product/product/dtos/manufacturer-dto";
import { ProductTypeDto } from "src/components/stock-product/product/dtos/product-type-dto";
import { SegmentDto } from "src/components/stock-product/product/dtos/segment-dto";
import { ProductList } from "../../dto/product-list";
import { map } from "rxjs/operators";

export const resetControlForm = [false, false, false]

export const onSelectedProduct = (id: number, x$: Observable<ProductTypeDto[]>, productList$: Observable<ProductList[]>, resetControlForm: boolean[], funcFilterTerm: (filterTerm: string) => string, outPut: EventEmitter<Observable<ProductList[]>>) => {
 
  x$.subscribe((x: ProductTypeDto[]) => {

    const result = x.find(y => y.id == id);
    filterType('productType', result.name, productList$, funcFilterTerm, outPut);
  });

  resetFormControl(0, resetControlForm);
}

export const onSelectedSegment = (id: number, x$: Observable<SegmentDto[]>, productList$: Observable<ProductList[]>, resetControlForm: boolean[], funcFilterTerm: (filterTerm: string) => string, outPut: EventEmitter<Observable<ProductList[]>>) => {
  x$.subscribe((x: SegmentDto[]) => {

    const result = x.find(y => y.id == id);

    filterType('segment', result.name, productList$, funcFilterTerm, outPut);
  });

  resetFormControl(1, resetControlForm);
}

export const onSelectedManufacturer = (id: number, x$: Observable<ManufacturerDto[]>, productList$: Observable<ProductList[]>, resetControlForm: boolean[], funcFilterTerm: (filterTerm: string) => string, outPut: EventEmitter<Observable<ProductList[]>>) => {

  x$.subscribe((x: ManufacturerDto[]) => {

    const result = x.find(y => y.id == id);

    filterType('manufacturer', result.name, productList$, funcFilterTerm, outPut);

  });

  resetFormControl(2, resetControlForm);
}

function filterType(entityToFilter: string, type: string, productsList$: Observable<any[]>, funcFilterTerm: (filterTerm: string) => string, outPut: EventEmitter<Observable<ProductList[]>>) {

  const result = productsList$.pipe(
    map((productList: any[]) => {
      return productList.filter(x => funcFilterTerm(x[entityToFilter].key.toLowerCase()) == funcFilterTerm(type.toLowerCase()));
    }))
  outPut.emit(result);

}

function resetFormControl(entity: number, resetControlForm: boolean[]) {

  resetControlForm.forEach((x, index) => {
    if (index == entity)
      resetControlForm[index] = false;
    else
      resetControlForm[index] = true;
  })
  return
}