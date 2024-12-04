// import { Component, OnInit } from '@angular/core';
// import { FrontEndFilterListStock } from './filter-list/front-end-filter-list-stock';
// import { ImportsModulesComponentsListStock } from './imports-modules-components-list-stock';
// import { ActivatedRoute, Router } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
// import { PtBrDatePipe } from 'src/shared/pipes/pt-br-date.pipe';
// import { PtBrCurrencyPipe } from 'src/shared/pipes/pt-br-currency.pipe';
// import { BreakpointObserver } from '@angular/cdk/layout';
// import { PixExpensesListService } from 'src/components/financial/components/pix-expenses/components/list/services/pix-expenses-list.service';
// import { GridListCommonHelper } from 'src/shared/components/grid-list-common/helpers/grid-list-common-helper';
// import { MatDialog } from '@angular/material/dialog';

// import { environment } from 'src/environments/environment';
// import { ListStockGridDto } from './dto/list-stock-grid-dto';

// @Component({
//   selector: 'list-stock',
//   standalone: true,
//   imports: [ImportsModulesComponentsListStock],
//   templateUrl: './list-stock.component.html',
//   styleUrls: ['./list-stock.component.css'],

//   providers: [
//     PtBrDatePipe,
//     PtBrCurrencyPipe,
//     PixExpensesListService
//   ]


// })

// export class ListStockComponent extends FrontEndFilterListStock implements OnInit {
//   constructor(
//     private _route: ActivatedRoute,
//     override _router: Router,
//     private _http: HttpClient,
//     override _dialog: MatDialog,
//     private _ptBrDatePipe: PtBrDatePipe,
//     private _ptBrCurrencyPipe: PtBrCurrencyPipe,
//     override _actRoute: ActivatedRoute,
//     override _breakpointObserver: BreakpointObserver,
//     override _listServices: PixExpensesListService,
//   ) {
//     super(
//       _dialog,
//       _router,
//       _actRoute,
//       new GridListCommonHelper(_http),
//       ['', 'Item', 'Segmento', 'Fabricante', 'Modelo', 'Quantidade'],
//       ['item', 'segment', 'manufacturer', 'model', 'quantity'],
//       _breakpointObserver,
//       _listServices
//     )
//   }
//   controllerUrl = environment._STOCK_PRODUCTS;
//   getData() {
//     this.gridListCommonHelper.getAllEntitiesInMemoryPaged(`_PD_Stocks/GetAllStockByCompanyIdAsync`, this.companyId);
//     this.gridListCommonHelper.entitiesFromDbToMemory$.subscribe((x: StockDto[]) => {
//       this.entities = [];
//       x.forEach((xy: StockDto) => {
//         this.entities.push(this.makeGridItems(xy));
//         console.log(xy)
//       })
//       // this.getCurrentPagedInFrontEnd();
//       // this.entities$ = of(this.entities)
//     })

//   }

//   makeGridItems(xy: StockDto) {

//     const viewDto = new ListStockGridDto();
//     viewDto.id = xy.id;
//     viewDto.item = xy.product.name;
//     // viewDto.segment = xy.product.
//     // viewDto.manufacturer
//     // viewDto.model
//     // viewDto.quantity
//     // viewDto.expenseDay = this._ptBrDatePipe.transform(xy.expenseDay, 'Date');
//     // viewDto.expenseDayToFilter = xy.expenseDay;
//     // viewDto.price = this._ptBrCurrencyPipe.transform(xy.price);
//     // viewDto.pixOutId = xy.pixOut.value;
//     // viewDto.benefitedName = xy.benefitedName;

//     return viewDto;
//   }
//   ngOnInit(): void {
//     this.getData();
//   }













// }
