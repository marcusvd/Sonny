import { Observable, of } from "rxjs";
import { ProductList } from "../dto/product-list";
import { ProductTypeDto } from "../../../dtos/product-type-dto";
import { SegmentDto } from "../../../dtos/segment-dto";
import { ManufacturerDto } from "../../../dtos/manufacturer-dto";
import { environment } from "src/environments/environment";
import { ProductDto } from "../../../dtos/product";

export let _entitiesFiltered$ = new Observable<ProductList[]>();
export let _productsTypes$ = new Observable<ProductTypeDto[]>();
export let _entities$ = new Observable<ProductList[]>();
export let _length = 0;
export let _showHideFilter = false;
export let _term: string;
export let _segments: SegmentDto[] = [];
export let _manufacturers: ManufacturerDto[] = [];
export let _entities: ProductList[] = [];
export let _entitiesFiltered: ProductList[] = [];
export let _controllerUrl: string = environment._STOCK_PRODUCTS.split('/')[4];
export let _backEndUrl: string = `${_controllerUrl}/GetProductsIncludedAsync`;



export const _getEntities = (main$: Observable<ProductDto[]>) =>{
   _entities = [];
   _entitiesFiltered$ = null;
    main$.subscribe(
      {
        next: (x: ProductDto[]) => {
         _length = x.length;
          x.forEach(
            (y: ProductDto) => {
             _entities =_makeItemsGrid(y);
             _entities$ = of(_entities);
            })
         _getCurrent();
        }
      }
    )

}

export const _makeItemsGrid = (x: ProductDto) => {


    const items: ProductList = new ProductList();
    
    items.id = { key: x?.id?.toString()};

    items.productType = { key: x?.productType.name};

    items.segment = { key: x?.segment.name};

    items.manufacturer = { key: x?.manufacturer.name};

    items.model = { key: x?.model.name};

    items.soldPrice = { key: x?.soldPrice?.toString()};

    items.isReservedByUser = { key: x?.isReservedByUser?.userName ?? 'Não'};

    items.isTested = { key: x?.isTested?.toString()};

    items.isUsed = { key: x?.isUsed?.toString()};

    _entities.push(items);

    _entitiesFiltered.push(items);

   

    return _entities;

  }

export const _getCurrent = () => {
    //first supply
    // this.entitiesFiltered$ = of(this.entities.slice(0, this.pageSize));

    return of(_entities.slice(0, 20));

  }


export const _showHideFilterMtd = ($event: boolean, funcPaginatorFistPage: () => void, _pageSize: number) => {
    _showHideFilter = $event
    console.log(_entities.length)
    if (!_showHideFilter) {
        _entitiesFiltered$ = null;
        funcPaginatorFistPage();
        _length = _entities.length;
        _entitiesFiltered = _entities;
        _entitiesFiltered$ = of(_entitiesFiltered.slice(0, _pageSize));
    }
}
