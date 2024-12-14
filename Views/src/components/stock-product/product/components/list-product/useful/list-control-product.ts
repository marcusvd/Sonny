import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { ListGDataService } from "src/shared/components/list-g/data/list-g-data.service";
import { BaseList } from "src/shared/components/list-g/extends/base-list";
import { ProductList } from "../dto/product-list";
import { Observable, of } from "rxjs";
import { ProductDto } from "../../../dtos/product";
import { PtBrDatePipe } from "src/shared/pipes/pt-br-date.pipe";
import { PtBrCurrencyPipe } from "src/shared/pipes/pt-br-currency.pipe";
import { ProductTypeDto } from "../../../dtos/product-type-dto";


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
      this.entitiesFiltered$ = this.orderByFrontEnd(entitiesFiltered$, { isTested: '' });

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

    items.manufacturer = { key: x?.manufacturer.name, display: 'button', button: 'Menu', icons: [''], styleInsideCell: buttonStyle, styleCell: buttonCellStyle, route: '' };

    items.model = { key: x?.model.name, icons: [''], styleInsideCell: '', route: '' };

    items.soldPrice = { key: this._ptBrCurrencyPipe.transform(x?.soldPrice), icons: [''], styleInsideCell: 'border:0.5px solid red;', route: '' };
    // items.soldPrice = { key: this._ptBrCurrencyPipe.transform(x?.soldPrice), icons: [''], styleInsideCell: 'border:0.5px solid rgb(43, 161, 168);', route: '' };

    items.isReservedByUser = { key: x?.isReservedByUser?.userName ?? 'Não.', icons: [''], styleInsideCell: '', route: '' };

    items.isTested = { key: this._ptBrDatePipe.transform(x?.isTested, 'Date'), icons: [''], styleInsideCell: '', route: '' };

    items.isUsed = {key: x?.isUsed ? 'Sim' : 'Não'};
    // items.isUsed = this.test(x?.isUsed);

    this.entities.push(items);

    return this.entities;

  }

  test(test: boolean) {
    if (test)
      return { key: 'Sim', icons: [''], styleCell: 'background-color: rgb(33, 161, 165);', styleInsideCell: 'background-color: green;', route: '' }
    else
      return { key: 'Não.', icons: [''], styleCell: 'background-color: rgb(245, 65, 65);', styleInsideCell: 'background-color: yellow;', route: '' }

  }

}
