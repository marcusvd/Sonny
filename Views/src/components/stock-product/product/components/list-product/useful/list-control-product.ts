import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ItemsInterface } from "src/shared/components/list-g/data/items-interface";
import { ListGDataService } from "src/shared/components/list-g/data/list-g-data.service";
import { BaseList } from "src/shared/components/list-g/extends/base-list";
import { PtBrCurrencyPipe } from "src/shared/pipes/pt-br-currency.pipe";
import { PtBrDatePipe } from "src/shared/pipes/pt-br-date.pipe";
import { ProductDto } from "../../../dtos/product";
import { ProductTypeDto } from "../../../dtos/product-type-dto";
import { ProductList } from "../dto/product-list";


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
      [{ key: 'AÇÕES', style: 'cursor: pointer;' }, { key: 'ITEM', style: 'cursor: pointer;' }, { key: 'SEGMENTO', style: 'cursor: pointer;' }, { key: 'MODELO', style: 'cursor: pointer;' }, { key: 'FABRICANTE', style: 'cursor: pointer;' }, { key: 'PREÇO', style: 'cursor: pointer;' }, { key: 'RESERVADO', style: 'cursor: pointer;' }, { key: 'TESTADO', style: 'cursor: pointer;' }, { key: 'USADO', style: 'cursor: pointer;' }],
      [{ key: 'id', style: '' }, { key: 'productType', style: '' }, { key: 'segment', style: '' }, { key: 'model', style: '' }, { key: 'manufacturer', style: '' }, { key: 'soldPrice', style: '' }, { key: 'isReservedByUser', style: '' }, { key: 'isTested', style: '' }, { key: 'isUsed', style: '' }]
    )
  }

  entities: ProductList[] = [];
  entitiesFiltered: ProductList[] = [];
  entities$: Observable<ProductList[]>;
  entitiesFiltered$: Observable<ProductList[]>;
  productsTypes$ = new Observable<ProductTypeDto[]>();

  controllerUrl: string = environment._STOCK_PRODUCTS.split('/')[4];
  backEndUrl: string = `${this.controllerUrl}/GetProductsIncludedAsync`;

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

    const buttonStyle = `background-color:rgb(43, 161, 168);border:none; color:white; height: 20px;  display: flex;  justify-content: center;   align-items: center;   padding: 0 12px;`
    const buttonCellStyle = `display: flex; justify-content: center; align-items: center;`
    const iconStyle = `color:rgb(43, 161, 168); cursor: pointer; font-size:20px; float:left;`

    const items: ProductList = new ProductList();

    items.id = { key: x?.id.toString(), display: 'icons', icons: ['list', 'edit', 'home'], styleInsideCell: iconStyle, styleCell: '', route: '' };

    items.productType = { key: x?.productType.name, icons: [''], styleInsideCell: '', route: '' };

    items.segment = { key: x?.segment.name, icons: [''], styleInsideCell: '', route: '' };

    items.manufacturer = { key: x?.manufacturer.name, display: '', button: 'Menu', icons: [''], styleInsideCell: '', styleCell: '', route: '' };
    // items.manufacturer = { key: x?.manufacturer.name, display: 'button', button: 'Menu', icons: [''], styleInsideCell: buttonStyle, styleCell: buttonCellStyle, route: '' };

    items.model = { key: x?.model.name, icons: [''], styleInsideCell: '', route: '' };

    items.soldPrice = { key: this._ptBrCurrencyPipe.transform(x?.soldPrice), icons: [''], styleInsideCell: 'border:0.5px solid red;', route: '' };
    // items.soldPrice = { key: this._ptBrCurrencyPipe.transform(x?.soldPrice), icons: [''], styleInsideCell: 'border:0.5px solid rgb(43, 161, 168);', route: '' };

    items.isReservedByUser = { key: x?.isReservedByUser?.userName ?? 'Não', icons: [''], styleInsideCell: '', route: '' };

    items.isTested = this.isTested(x?.isTested)

    // items.isTested = { key: (new Date(x?.isTested).getFullYear()) <= 1 ? 'Não' : this._ptBrDatePipe.transform(x?.isTested, 'Date'), icons: [''], styleInsideCell: '', route: '' };

    // items.isUsed = { key: x?.isUsed ? 'Sim' : 'Não' };
    items.isUsed = this.isUsed(x.isUsed);


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

  isUsed = (value: boolean) => {

    const iconStyleUsed = `color:rgb(43, 161, 168);`
    const iconStyleNotUsed = `color:red;`;

    const notUsed = 'sentiment_very_dissatisfied';
    const used = 'sentiment_very_satisfied';

    const objReturn: ItemsInterface = { key: value ? 'Sim' : 'Não', display: 'icons', icons: [''], styleInsideCell: '', route: '' };

    const isUsed = value;

    if (isUsed) {
      objReturn.icons.push(notUsed);
      objReturn.styleInsideCell = iconStyleNotUsed;
    }
    else {
      objReturn.icons.push(used);
      objReturn.styleInsideCell = iconStyleUsed;
    }

    return objReturn;

  }

}
