import { HttpClient } from "@angular/common/http";
import { PageEvent } from "@angular/material/paginator";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { environment } from "src/environments/environment";
import { BaseList } from "src/shared/components/list-g/extends/base-list";
import { ListGDataService } from "src/shared/components/list-g/list/data/list-g-data.service";
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
import { ItemsInterface } from "src/shared/components/list-g/list/interfaces/items-interface";


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
  isCard = false;

  //METHODS
  responsive(event?: Event) {

    if (this.screen(event) <= 600) {
      this.fields = null;
      this.headers = null;
      this.isCard = true;
      // this.fields = fieldsHeadersSmall();
      // this.headers = labelHeadersSmall();
      this.entitiesFiltered$ = of(makeItemsGridSmall(this.entitiesFiltered));
    }
    else if (this.screen(event) >= 601) {
      this.fields = fieldsHeadersMiddle();
      this.headers = labelHeadersMiddle();
      this.isCard = false;
    }

    if (this.screen(event) > 800) {
      this.fields = fieldsHeadersLarge();
      this.headers = labelHeadersLarge();
      this.isCard = false;
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

  startSupply() {
    this.entities = [];
    this.entitiesFiltered$ = null;
    this._listGDataService.entities$.subscribe(
      {
        next: (x: ProductDto[]) => {
          this.length = x.length;
          x.forEach(
            (y: ProductDto) => {
              this.entities = this.supplyItemsGrid(y);
              this.entitiesFiltered = this.entities;
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

  supplyItemsGrid = (x: ProductDto) => {

    const items: ProductList = new ProductList();

    items.id = { key: x?.id?.toString() };

    items.productType = { key: x?.productType.name };

    items.segment = { key: x?.segment.name };

    items.manufacturer = { key: x?.manufacturer.name };

    items.model = { key: x?.model.name };

    items.soldPrice = { key: this._ptBrCurrencyPipe.transform(x?.soldPrice) };

    items.isReservedByUser = { key: x?.isReservedByUser?.userName ?? 'Não' };

    items.isTested = this.isTested(x?.isTested?.toString());
    // items.isTested = { key: x?.isTested?.toString() };

    items.isUsed = { key: x?.isUsed ? 'Usado' : 'Novo' };

    this.entities.push(items);

    return this.entities;

  }

 isTested(value: string) {
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
