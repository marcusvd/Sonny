import { HttpClient } from "@angular/common/http";
import { PageEvent } from "@angular/material/paginator";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { environment } from "src/environments/environment";
import { BaseList } from "src/shared/components/list-g/extends/base-list";
import { ListGDataService } from "src/shared/components/list-g/list/data/list-g-data.service";
import { ItemsInterface } from "src/shared/components/list-g/list/interfaces/items-interface";
import { PtBrCurrencyPipe } from "src/shared/pipes/pt-br-currency.pipe";
import { PtBrDatePipe } from "src/shared/pipes/pt-br-date.pipe";
import { ManufacturerDto } from "../../../dtos/manufacturer-dto";
import { ProductDto } from "../../../dtos/product";
import { ProductTypeDto } from "../../../dtos/product-type-dto";
import { SegmentDto } from "../../../dtos/segment-dto";
import { ProductList } from "../dto/product-list";
import { fieldsHeadersLarge, fieldsHeadersMiddle, fieldsHeadersSmall, labelHeadersLarge, labelHeadersMiddle, labelHeadersSmall } from "./make-headers-grid-responsive";
import { makeItemsGridLager, makeItemsGridSmall } from "./make-items-grid-responsive";
import { makeHeaderToOrder } from "./order-items-by-header";


export class ListControlProduct extends BaseList {


  constructor(
    override _router: Router,
    protected _http: HttpClient,
    protected _ptBrDatePipe: PtBrDatePipe,
    protected _ptBrCurrencyPipe: PtBrCurrencyPipe,
  ) {
    super(
      new ListGDataService(_http),
      _router,
    )
  }

   //OBSERVABLES
   entities$: Observable<ProductList[]>;
   entitiesFiltered$: Observable<ProductList[]>;
   productsTypes$ = new Observable<ProductTypeDto[]>();
 
   //PROPERIES
   segments: SegmentDto[] = [];
   manufacturers: ManufacturerDto[] = [];
   entities: ProductList[] = [];
   entitiesFiltered: ProductList[] = [];
   length = 0;
   showHideFilter = false;
   term: string;
 
  

  controllerUrl: string = environment._STOCK_PRODUCTS.split('/')[4];
  backEndUrl: string = `${this.controllerUrl}/GetProductsIncludedAsync`;

 //METHODS


 responsive(event?: Event) {

  if (this.screen(event) <= 600) {
    this.fields = fieldsHeadersSmall();
    this.headers = labelHeadersSmall();
    this.entitiesFiltered$ = of(makeItemsGridSmall(this.entitiesFiltered));
  }
  else if (this.screen(event) >= 601) {
    this.fields = fieldsHeadersMiddle();
    this.headers = labelHeadersMiddle();
  }

  if (this.screen(event) > 800) {
    this.fields = fieldsHeadersLarge();
    this.headers = labelHeadersLarge();
    this.entitiesFiltered$ = of(makeItemsGridLager(this.entitiesFiltered));
  }

}

search(term: string) {
  this.term = term;

  const TERM_EMPTY = term === '';

  if (!this.showHideFilter && TERM_EMPTY) {
    this.entitiesFiltered$ = this.entities$;
    this.entitiesFiltered = this.entities;
    this.entities$.subscribe(x => {
      this.length = x.length
    })
  }
  else {
    this.entitiesFiltered$ = of(this.searchListEntities(this.entitiesFiltered, term))
    this.entitiesFiltered$.subscribe(x => {
      this.length = x.length
    })
  }
}

onPageChange($event: PageEvent) {

  if ($event.previousPageIndex < $event.pageIndex)
    this.entitiesFiltered$ = of(this.pageChange(this.entitiesFiltered, $event))

  else if ($event.previousPageIndex > $event.pageIndex)
    this.entitiesFiltered$ = of(this.pageChange(this.entitiesFiltered, $event))

  if (this.term) {
    this.entitiesFiltered$ = of(this.pageChange(this.searchListEntities(this.entitiesFiltered, this.term), $event))
    this.length = this.searchListEntities(this.entitiesFiltered, this.term).length
  }

}

startSubscribe() {
  this.entities = [];
  this.entitiesFiltered$ = null;
  this._listGDataService.entities$.subscribe(
    {
      next: (x: ProductDto[]) => {
        this.length = x.length;
        x.forEach(
          (y: ProductDto) => {
            this.entities = this.makeItemsGrid(y);
            this.entities$ = of(this.entities);
          })
        this.getCurrent();
      }
    }
  )
}

getCurrent = () => {
  this.entitiesFiltered$ = of(this.entities.slice(0, this.pageSize));
}

showHideFilterMtd($event: boolean) {
  this.showHideFilter = $event
  if (!this.showHideFilter) {
    this.entitiesFiltered$ = null;
    this.paginatorAbove.firstPage();
    this.length = this.entities.length;
    this.entitiesFiltered = this.entities;
    this.entitiesFiltered$ = of(this.entitiesFiltered.slice(0, this.pageSize));
  }
}

filteredProductsList(producstListFiltered: Observable<ProductList[]>) {
  this.paginatorAbove.firstPage();
  this.length = 0;
  producstListFiltered.subscribe(x => {
    this.entitiesFiltered = x
    this.length = x.length;
  })

  this.entitiesFiltered$ = of(this.entitiesFiltered.slice(0, this.pageSize));
}

onClickOrderByFields(field: string, entitiesFiltered$: Observable<ProductList[]>) {
 

  switch (field) {
    case 'productType':
      this.entitiesFiltered$ = this.orderByFrontEnd(entitiesFiltered$, makeHeaderToOrder(field));
      break;

    case 'segment':
      this.entitiesFiltered$ = this.orderByFrontEnd(entitiesFiltered$, makeHeaderToOrder(field));
      break;

    case 'model':
      this.entitiesFiltered$ = this.orderByFrontEnd(entitiesFiltered$, makeHeaderToOrder(field));
      break;

    case 'manufacturer':
      this.entitiesFiltered$ = this.orderByFrontEnd(entitiesFiltered$, makeHeaderToOrder(field));
      break;

    case 'soldPrice':
      this.entitiesFiltered$ = this.orderByFrontEnd(entitiesFiltered$, makeHeaderToOrder(field));
      break;
      
    case 'isReservedByUser':
      this.entitiesFiltered$ = this.orderByFrontEnd(entitiesFiltered$, makeHeaderToOrder(field));
      break;

    case 'isTested':
      this.entitiesFiltered$ = this.orderByFrontEnd(entitiesFiltered$, makeHeaderToOrder(field));
      break;
      
    case 'isUsed':
      this.entitiesFiltered$ = this.orderByFrontEnd(entitiesFiltered$, makeHeaderToOrder(field));
      break;

  }

}


makeItemsGrid(x: ProductDto) {

  const buttonStyle = `background-color:rgb(43, 161, 168);border:none; color:white; height: 20px;  display: flex;  justify-content: center;   align-items: center;   padding: 0 12px; width: 100px; max-width: 100px;`
  const buttonCellStyle = `display: flex; justify-content: center; align-items: center;`
  const iconStyle = `color:rgb(43, 161, 168); cursor: pointer; font-size:20px; float:left; maging-right:-50px;`
  const soldPricestyleInsideCell = 'border:0.5px solid red;'

  const items: ProductList = new ProductList();

  // items.id = { key: x?.id.toString(), display: 'menu', iconsLabels: ['list|Lista', 'edit|Editar', 'home|Inicio'], styleInsideCell: iconStyle, styleCell: '', route: '' };
  // items.id = { key: x?.id.toString(), display: 'icons', icons: ['menu'], styleInsideCell: iconStyle, styleCell: '', route: '' };
  items.id = { key: x?.id.toString(), display: 'icons', icons: ['list', 'edit', 'home'], styleInsideCell: iconStyle, styleCell: '', route: '' };

  items.productType = { key: x?.productType.name, icons: [''], button: x?.productType.name, styleInsideCell: '', route: '' };

  items.segment = { key: x?.segment.name, icons: [''], styleInsideCell: '', route: '' };

  items.manufacturer = { key: x?.manufacturer.name, display: '', button: 'Menu', icons: [''], styleInsideCell: '', styleCell: '', route: '' };

  items.model = { key: x?.model.name, icons: [''], styleInsideCell: '', route: '' };

  items.soldPrice = { key: this._ptBrCurrencyPipe.transform(x?.soldPrice), icons: [''], styleInsideCell: soldPricestyleInsideCell, route: '' };

  items.isReservedByUser = { key: x?.isReservedByUser?.userName ?? 'Não', icons: [''], styleInsideCell: '', route: '' };

  items.isTested = this.isTested(x?.isTested);

  items.isUsed = { key: x?.isUsed ? 'Usado' : 'Novo' };

  this.entities.push(items);

  this.entitiesFiltered.push(items);

  return this.entities;

}

isTested = (value: Date) => {
  const iconStyleTested = `color:rgb(43, 161, 168);`
  const iconStyleNotTested = `color:red;`;

  const notTested = 'clear';
  const tested = 'check';

  const objReturn: ItemsInterface = { key: value.toString(), display: 'icons', icons: [''], styleInsideCell: '', route: '' };

  const isTested = new Date(value).getFullYear();

  if (isTested <= 1) {
    objReturn.icons.push(notTested);
    objReturn.styleInsideCell = iconStyleNotTested;
  }
  else {
    objReturn.icons.push(tested);
    objReturn.styleInsideCell = iconStyleTested;
  }

  return objReturn;

}

onClickButton(field: string) {
  console.log(field)
}

onClickIcons(field: string) {
  console.log(field)
}




}
