import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { environment } from "src/environments/environment";
import { ItemsInterface } from "src/shared/components/list-g/data/items-interface";
import { ListGDataService } from "src/shared/components/list-g/data/list-g-data.service";
import { BaseList } from "src/shared/components/list-g/extends/base-list";
import { PtBrCurrencyPipe } from "src/shared/pipes/pt-br-currency.pipe";
import { PtBrDatePipe } from "src/shared/pipes/pt-br-date.pipe";
import { ManufacturerDto } from "../../../dtos/manufacturer-dto";
import { ProductDto } from "../../../dtos/product";
import { ProductTypeDto } from "../../../dtos/product-type-dto";
import { SegmentDto } from "../../../dtos/segment-dto";
import { ProductList } from "../dto/product-list";
import { PageEvent } from "@angular/material/paginator";
import { makeItemsGridLager, makeItemsGridSmall } from "../helpers/make-items-grid-responsive";


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
  controllerUrl: string = environment._STOCK_PRODUCTS.split('/')[4];
  backEndUrl: string = `${this.controllerUrl}/GetProductsIncludedAsync`;
  length = 0;
  showHideFilter = false;
  term: string;

  //METHODS
  label = (label: string) => {
    if (label == 'small')
      return [{ key: 'ITEM', style: 'cursor: pointer;' }, { key: 'FABRICANTE', style: 'cursor: pointer;' }, { key: 'PREÇO', style: 'cursor: pointer;' }]
    // return [{ key: 'AÇÕES', style: 'cursor: pointer;' }, { key: 'ITEM', style: 'cursor: pointer;' }, { key: 'FABRICANTE', style: 'cursor: pointer;' }, { key: 'PREÇO', style: 'cursor: pointer;' }]

    if (label == 'middle') {
      return [{ key: 'AÇÕES', style: 'cursor: pointer;' }, { key: 'ITEM', style: 'cursor: pointer;' }, { key: 'SEGMENTO', style: 'cursor: pointer;' }, { key: 'MODELO', style: 'cursor: pointer;' }, { key: 'FABRICANTE', style: 'cursor: pointer;' }, { key: 'PREÇO', style: 'cursor: pointer;' }]
    }

    return [{ key: 'AÇÕES', style: 'cursor: pointer;' }, { key: 'ITEM', style: 'cursor: pointer;' }, { key: 'SEGMENTO', style: 'cursor: pointer;' }, { key: 'MODELO', style: 'cursor: pointer;' }, { key: 'FABRICANTE', style: 'cursor: pointer;' }, { key: 'PREÇO', style: 'cursor: pointer;' }, { key: 'RESERVADO', style: 'cursor: pointer;' }, { key: 'TESTADO', style: 'cursor: pointer;' }, { key: 'USADO', style: 'cursor: pointer;' }]
  }

  fieldsHeader = (label: string) => {
    if (label == 'small')
      return [{ key: 'productType', style: '' }, { key: 'manufacturer', style: '' }, { key: 'soldPrice', style: '' }]
    // return [{ key: 'id', style: '' }, { key: 'productType', style: '' }, { key: 'manufacturer', style: '' }, { key: 'soldPrice', style: '' }]

    if (label == 'middle') {
      return [{ key: 'id', style: '' }, { key: 'productType', style: '' }, { key: 'segment', style: '' }, { key: 'model', style: '' }, { key: 'manufacturer', style: '' }, { key: 'soldPrice', style: '' }]
    }

    return [{ key: 'id', style: '' }, { key: 'productType', style: '' }, { key: 'segment', style: '' }, { key: 'model', style: '' }, { key: 'manufacturer', style: '' }, { key: 'soldPrice', style: '' }, { key: 'isReservedByUser', style: '' }, { key: 'isTested', style: '' }, { key: 'isUsed', style: '' }]
  }

  responsive(event?: Event) {

    if (this.screen(event) <= 600) {
      this.fields = this.fieldsHeader('small');
      this.headers = this.label('small');
      this.entitiesFiltered$ = of(makeItemsGridSmall(this.entitiesFiltered));
    }
    else if (this.screen(event) >= 601) {
      this.fields = this.fieldsHeader('middle');
      this.headers = this.label('middle');
    }
    
    if (this.screen(event) > 800) {
      this.fields = this.fieldsHeader('');
      this.headers = this.label('');
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

    if (field == 'productType')
      this.entitiesFiltered$ = this.orderByFrontEnd(entitiesFiltered$, { 'productType': 'productType' });

    if (field == 'segment')
      this.entitiesFiltered$ = this.orderByFrontEnd(entitiesFiltered$, { segment: '' });

    if (field == 'model')
      this.entitiesFiltered$ = this.orderByFrontEnd(entitiesFiltered$, { model: '' });

    if (field == 'manufacturer')
      this.entitiesFiltered$ = this.orderByFrontEnd(entitiesFiltered$, { manufacturer: '' });

    if (field == 'soldPrice')
      this.entitiesFiltered$ = this.orderByFrontEnd(entitiesFiltered$, { 'soldPrice': 0 });

    if (field == 'isReservedByUser')
      this.entitiesFiltered$ = this.orderByFrontEnd(entitiesFiltered$, { isReservedByUser: new Date() });

    if (field == 'isTested')
      this.entitiesFiltered$ = this.orderByFrontEnd(entitiesFiltered$, { isTested: new Date() });

    if (field == 'isUsed')
      this.entitiesFiltered$ = this.orderByFrontEnd(entitiesFiltered$, { isUsed: '' });

  }


  makeItemsGrid(x: ProductDto) {

    const buttonStyle = `background-color:rgb(43, 161, 168);border:none; color:white; height: 20px;  display: flex;  justify-content: center;   align-items: center;   padding: 0 12px; width: 100px; max-width: 100px;`
    const buttonCellStyle = `display: flex; justify-content: center; align-items: center;`
    const iconStyle = `color:rgb(43, 161, 168); cursor: pointer; font-size:20px; float:left; maging-right:-50px;`
    const soldPricestyleInsideCell = 'border:0.5px solid red;'

    const items: ProductList = new ProductList();

    // items.id = { key: x?.id.toString(), display: 'menu', iconsLabels: ['list|Lista', 'edit|Editar', 'home|Inicio'], styleInsideCell: iconStyle, styleCell: '', route: '' };
    // items.id = { key: x?.id.toString(), display: 'icons', icons: ['menu'], styleInsideCell: iconStyle, styleCell: '', route: '' };
    // items.id = { key: x?.id.toString(), display: 'icons', icons: ['list', 'edit', 'home'], styleInsideCell: iconStyle, styleCell: '', route: '' };

    items.productType = { key: x?.productType.name, icons: [''], button: x?.productType.name, styleInsideCell: '',  route: '' };

    items.segment = { key: x?.segment.name, icons: [''], styleInsideCell: '', route: '' };

    items.manufacturer = { key: x?.manufacturer.name, display: '', button: 'Menu', icons: [''], styleInsideCell: '', styleCell: '', route: '' };

    items.model = { key: x?.model.name, icons: [''], styleInsideCell: '', route: '' };

    items.soldPrice = { key: this._ptBrCurrencyPipe.transform(x?.soldPrice), icons: [''], styleInsideCell: soldPricestyleInsideCell, route: '' };

    items.isReservedByUser = { key: x?.isReservedByUser?.userName ?? 'Não', icons: [''], styleInsideCell: '', route: '' };

    items.isTested = this.isTested(x?.isTested)

    items.isUsed = { key: x?.isUsed ? 'Sim' : 'Não' };

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
