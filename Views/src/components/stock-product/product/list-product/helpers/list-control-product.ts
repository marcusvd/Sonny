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
import { TruncatePipe } from "src/shared/pipes/truncate.pipe";
import { ManufacturerDto } from "../../dtos/manufacturer-dto";
import { ProductDto } from "../../dtos/product-dto";
import { ProductTypeDto } from "../../dtos/product-type-dto";
import { SegmentDto } from "../../dtos/segment-dto";
import { ProductList } from "../dto/product-list";
import { fieldsHeadersLarge, fieldsHeadersMiddle, labelHeadersLarge, labelHeadersMiddle } from "./make-headers-grid-responsive";
import { ex_makeItemsGridLager, ex_makeItemsGridMedium, ex_makeItemsGridSmall } from "./make-items-grid-responsive";
import { makeHeaderToOrder } from "./order-items-by-header";


export class ListControlProduct extends BaseList {

  constructor(
    override _router: Router,
    protected _http: HttpClient,
    protected _ptBrDatePipe: PtBrDatePipe,
    protected _ptBrCurrencyPipe: PtBrCurrencyPipe,
    protected _truncatePipe: TruncatePipe,
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
          const event = { target: window } as unknown as Event;
          //start responsive screen
          this.responsive(event);
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

  supplyItemsGrid = (x: ProductDto) => {

    const items: ProductList = new ProductList();

    items.id = { key: x?.id?.toString() };

    items.productTypeView = { key: this._truncatePipe.transform(x?.productType.name, 13) };

    items.segmentView = { key: this._truncatePipe.transform(x?.segment.name, 13) };

    items.manufacturerView = { key: this._truncatePipe.transform(x?.manufacturer.name, 13) };

    items.productType = { key: x?.productType.name };

    items.segment = { key: x?.segment.name };

    items.manufacturer = { key: x?.manufacturer.name };

    items.model = { key: this._truncatePipe.transform(x?.model.name, 25) };

    items.soldPrice = { key: this._ptBrCurrencyPipe.transform(x?.soldPrice) };

    items.isReservedByUser = { key: x?.isReservedByUser?.userName ?? 'Não' };

    items.quantity = { key: x.quantity.toString() };

    items.description = { key: this._truncatePipe.transform(x?.specificities.description, 35) };

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
