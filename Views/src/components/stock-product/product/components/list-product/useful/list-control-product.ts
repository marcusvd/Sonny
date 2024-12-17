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
import { SegmentDto } from "../../../dtos/segment-dto";
import { ManufacturerDto } from "../../../dtos/manufacturer-dto";
import { AfterViewInit } from "@angular/core";


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

    this.headers = this.label('');
    this.fields = this.fieldsHeader('')

  }
   screenWidth: number = window.innerWidth;
  screen(event?: Event) {
    const target = event.target as Window;
    this.screenWidth = target.innerWidth;

    if (this.screenWidth <= 600) {
      this.fields = this.fieldsHeader('small')
      this.headers = this.label('small');
      // console.log('Width is 640px or less:', this.this.screenWidth);
      // Adicione aqui sua lógica para telas menores
    }
   else if (this.screenWidth >= 601) {
      this.fields = this.fieldsHeader('middle')
      this.headers = this.label('middle');
    }

   if (this.screenWidth > 800) {
      console.log(this.screenWidth)
      this.fields = this.fieldsHeader('')
      this.headers = this.label('');
    }

    // else {
    //   this.fields = this.fieldsHeader('')
    //   this.headers =  this.label('');
    //   // console.log('Width is greater than 640px:', this.screenWidth);
    //   // Adicione aqui sua lógica para telas maiores
    // }

  }
startScreen() {
  if (this.screenWidth <= 600) {
    this.fields = this.fieldsHeader('small')
    this.headers = this.label('small');
    // console.log('Width is 640px or less:', this.this.screenWidth);
    // Adicione aqui sua lógica para telas menores
  }
 else if (this.screenWidth >= 601) {
    this.fields = this.fieldsHeader('middle')
    this.headers = this.label('middle');
  }

 if (this.screenWidth > 800) {
    console.log(this.screenWidth)
    this.fields = this.fieldsHeader('')
    this.headers = this.label('');
  }
}

  //   /* screen */
  // /* @media (max-width: 600px) { 
  //   .cell {
  //     font-size: 12px;
  //     padding: 6px;
  //   }
  // } */

  // /* @media (min-width: 601px) and (max-width: 1024px) { 
  //   .cell {
  //     font-size: 14px;
  //     padding: 8px;
  //   }
  // } */

  // /* @media (min-width: 1025px) {
  //   .cell {
  //     font-size: 16px;
  //     padding: 10px;
  //   }
  // } */

  label = (label: string) => {
    if (label == 'small')
      return [{ key: 'AÇÕES', style: 'cursor: pointer;' }, { key: 'ITEM', style: 'cursor: pointer;' }, { key: 'SEGMENTO', style: 'cursor: pointer;' }]
   
    if (label == 'middle') {
      return [{ key: 'AÇÕES', style: 'cursor: pointer;' }, { key: 'ITEM', style: 'cursor: pointer;' }, { key: 'SEGMENTO', style: 'cursor: pointer;' }, { key: 'MODELO', style: 'cursor: pointer;' }, { key: 'FABRICANTE', style: 'cursor: pointer;' }, { key: 'PREÇO', style: 'cursor: pointer;' }]
    }

      return [{ key: 'AÇÕES', style: 'cursor: pointer;' }, { key: 'ITEM', style: 'cursor: pointer;' }, { key: 'SEGMENTO', style: 'cursor: pointer;' }, { key: 'MODELO', style: 'cursor: pointer;' }, { key: 'FABRICANTE', style: 'cursor: pointer;' }, { key: 'PREÇO', style: 'cursor: pointer;' }, { key: 'RESERVADO', style: 'cursor: pointer;' }, { key: 'TESTADO', style: 'cursor: pointer;' }, { key: 'USADO', style: 'cursor: pointer;' }]
  }

  fieldsHeader = (label: string) => {
    if (label == 'small')
      return [{ key: 'id', style: '' }, { key: 'productType', style: '' }, { key: 'segment', style: '' },]
  
    if (label == 'middle') {
      return [{ key: 'id', style: '' }, { key: 'productType', style: '' }, { key: 'segment', style: '' }, { key: 'model', style: '' }, { key: 'manufacturer', style: '' }, { key: 'soldPrice', style: '' }]
    }

      return [{ key: 'id', style: '' }, { key: 'productType', style: '' }, { key: 'segment', style: '' }, { key: 'model', style: '' }, { key: 'manufacturer', style: '' }, { key: 'soldPrice', style: '' }, { key: 'isReservedByUser', style: '' }, { key: 'isTested', style: '' }, { key: 'isUsed', style: '' }]
  }





  segments: SegmentDto[] = [];
  manufacturers: ManufacturerDto[] = [];
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
