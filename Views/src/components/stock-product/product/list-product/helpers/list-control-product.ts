import { HttpClient } from "@angular/common/http";
import { PageEvent } from "@angular/material/paginator";
import { Router } from "@angular/router";
import { Observable, Subscription, of } from "rxjs";


import { MatDialog } from "@angular/material/dialog";
import { environment } from "src/environments/environment";
import { BaseList } from "src/shared/components/list-g/extends/base-list";
import { ListGDataService } from "src/shared/components/list-g/list/data/list-g-data.service";
import { ItemsInterface } from "src/shared/components/list-g/list/interfaces/items-interface";
import { OnClickInterface } from "src/shared/components/list-g/list/interfaces/on-click-interface";
import { ex_callRouteWithObject } from "src/shared/helpers/useful/route";
import { PtBrCurrencyPipe } from "src/shared/pipes/pt-br-currency.pipe";
import { PtBrDatePipe } from "src/shared/pipes/pt-br-date.pipe";
import { TruncatePipe } from "src/shared/pipes/truncate.pipe";
import { ManufacturerDto } from "../../dtos/manufacturer-dto";
import { ProductDto } from "../../dtos/product-dto";
import { ProductTypeDto } from "../../dtos/product-type-dto";
import { SegmentDto } from "../../dtos/segment-dto";
import { ProductList } from "../dto/product-list";
import { fieldsHeadersLarge, fieldsHeadersMiddle, labelHeadersLarge, labelHeadersMiddle } from "./make-headers-grid-responsive";
import { makeHeaderToOrder } from "./order-items-by-header";
import { ex_makeItemsGridLager } from "./screen/large-grid-responsive";
import { ex_makeItemsGridMedium } from "./screen/medium-grid-responsive";
import { ex_makeItemsGridSmall } from "./screen/small-grid-responsive";
import { ex_supplyItemsGrid } from "./screen/supply-grid-responsive";


export class ListControlProduct extends BaseList {

  constructor(
    override _router: Router,
    protected _http: HttpClient,
    protected _ptBrDatePipe: PtBrDatePipe,
    protected _ptBrCurrencyPipe: PtBrCurrencyPipe,
    protected _truncatePipe: TruncatePipe,
    protected _dialog: MatDialog
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
  products: ProductDto[] = [];
  entitiesFiltered: ProductList[] = [];
  length = 0;
  showHideFilter = false;
  term: string;
  controllerUrl: string = environment._STOCK_PRODUCTS.split('/')[4];
  backEndUrl: string = `${this.controllerUrl}/GetProductsIncludedAsync`;
  isCard = false;

  event = { target: window } as unknown as Event;

  //METHODS
  responsive(event?: Event) {

    if (this.screen(event) <= 800) {
      this.fields = null;
      this.headers = null;
      this.isCard = true;
      this.entitiesFiltered$ = of(ex_makeItemsGridSmall(this.entitiesFiltered, this._truncatePipe));
    }
    else if (this.screen(event) >= 800) {
      this.fields = fieldsHeadersMiddle();
      this.headers = labelHeadersMiddle();
      this.isCard = false;
      this.entitiesFiltered$ = of(ex_makeItemsGridMedium(this.entitiesFiltered, this._truncatePipe));
    }

    if (this.screen(event) > 1024) {
      this.fields = fieldsHeadersLarge();
      this.headers = labelHeadersLarge();
      this.isCard = false;
      this.entitiesFiltered$ = of(ex_makeItemsGridLager(this.entitiesFiltered, this._truncatePipe));
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

  startSupply(): Subscription {

    let entities: ProductList[] = [];
    return this._listGDataService.entities$.subscribe(
      {
        next: (x: ProductDto[]) => {
          this.length = x.length;
          x.forEach(
            (y: ProductDto) => {
              this.entities = ex_supplyItemsGrid(entities, y, this._truncatePipe, this._ptBrCurrencyPipe);
              this.entitiesFiltered = this.entities;
              this.products.push(y);
              this.entities$ = of(this.entities);
            })
          this.getCurrent();
          //start responsive screen
          this.responsive(this.event);
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

    //start responsive screen
    this.responsive(this.event);
  }

  onClickOrderByFields(field: string, entitiesFiltered$: Observable<ProductList[]>) {

    switch (field) {
      case 'productTypeView':
        this.entitiesFiltered$ = this.orderByFrontEnd(entitiesFiltered$, makeHeaderToOrder(field));
        break;

      case 'segmentView':
        this.entitiesFiltered$ = this.orderByFrontEnd(entitiesFiltered$, makeHeaderToOrder(field));
        break;

      case 'manufacturerView':
        this.entitiesFiltered$ = this.orderByFrontEnd(entitiesFiltered$, makeHeaderToOrder(field));
        break;

      case 'model':
        this.entitiesFiltered$ = this.orderByFrontEnd(entitiesFiltered$, makeHeaderToOrder(field));
        break;


      case 'soldPrice':
        this.entitiesFiltered$ = this.orderByFrontEnd(entitiesFiltered$, makeHeaderToOrder(field));
        break;

      case 'description':
        this.entitiesFiltered$ = this.orderByFrontEnd(entitiesFiltered$, makeHeaderToOrder(field));
        break;

      // case 'isReservedByUser':
      // this.entitiesFiltered$ = this.orderByFrontEnd(entitiesFiltered$, makeHeaderToOrder(field));
      // break;

      // case 'isTested':
      //   this.entitiesFiltered$ = this.orderByFrontEnd(entitiesFiltered$, makeHeaderToOrder(field));
      //   break;

      // case 'isUsed':
      //   this.entitiesFiltered$ = this.orderByFrontEnd(entitiesFiltered$, makeHeaderToOrder(field));
      //   break;

    }

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

  onClickIcons(obj: OnClickInterface) {

    ex_callRouteWithObject('/side-nav/stock-product-router/detailed-product', this.products.find(x => x.id == obj.entityId), this._router)

  }

}
