
// import { CommonModule } from '@angular/common';
// import { HttpClient } from '@angular/common/http';
// import { AfterViewInit, Component, OnInit } from '@angular/core';

// import { FormBuilder, FormControl, FormsModule } from '@angular/forms';
// import { MatButtonModule as MatButtonModule } from '@angular/material/button';
// import { MatCardModule as MatCardModule } from '@angular/material/card';
// import { MatCheckboxModule as MatCheckboxModule } from '@angular/material/checkbox';
// import { MatDialog as MatDialog } from '@angular/material/dialog';
// import { MatMenuModule as MatMenuModule } from '@angular/material/menu';
// import { MatPaginatorModule as MatPaginatorModule } from '@angular/material/paginator';
// import { MatRadioModule as MatRadioModule } from '@angular/material/radio';
// import { ActivatedRoute, Router, RouterModule } from '@angular/router';
// import { Observable, of } from 'rxjs';
// import { map } from 'rxjs/operators';


// import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';
// // import { FinancialResolver } from 'src/shared/components/financial/resolvers/financial.resolver';
// import { GridListCommonSearchComponent } from 'src/shared/components/grid-list-common/grid-list-common-search.component';
// import { GridListCommonTableComponent } from 'src/shared/components/grid-list-common/grid-list-common-table.component';
// import { GridListCommonComponent } from 'src/shared/components/grid-list-common/grid-list-common.component';
// import { GridListCommonHelper } from 'src/shared/components/grid-list-common/helpers/grid-list-common-helper';

// import { MonthsSelectComponent } from 'src/shared/components/months-select/months-select-g.component';
// import { SubTitleComponent } from 'src/shared/components/sub-title/default/sub-title.component';
// import { TitleComponent } from 'src/shared/components/title/default-title/title.component';
// import { PtBrCurrencyPipe } from 'src/shared/pipes/pt-br-currency.pipe';
// import { PtBrDatePipe } from 'src/shared/pipes/pt-br-date.pipe';
// // import { MonthExpensesTrackingListFilter } from '../../common-components/static-business-rule/static-business-rule';

// import { environment } from 'src/environments/environment';
// import { FilterBtnRadioComponent } from '../../../common-components/filter-btn-radio/filter-btn-radio.component';
// import { FinancialSubtitleDto } from '../../../common-components/subtitle/financial-subtitle-dto';
// import { FinancialSubtitleComponent } from '../../../common-components/subtitle/financial-subtitle.component';
// import { CreditCardExpenseDto } from '../../dto/credit-card-expense-dto';
// import { ListGridCreditCardExpensesDto } from './dto/list-grid-credit-card-expenses-dto';
// import { BackEndListFilterCreditCardExpenses } from './filter-list/back-end-list-filter-credit-card-expenses';
// import { FrontEndListFilterCreditCardExpenses } from './filter-list/front-end-list-filter-credit-card-expenses';
// import { PaymentMonthlyFixedExpense } from './payment-monthly-fixed-expense';
// import { ListCreditCardExpensesService } from './services/list-credit-card-expenses.service';
// import { ListGComponent } from 'src/shared/components/list-g/list/list-g.component';


// @Component({
//   selector: 'list-credit-card-expenses',
//   templateUrl: './list-credit-card-expenses.component.html',
//   styleUrls: ['./list-credit-card-expenses.component.css'],
//   standalone: true,
//   imports: [
//     CommonModule,
//     FormsModule,
//     MatCardModule,
//     MatPaginatorModule,
//     MatButtonModule,
//     MatMenuModule,
//     RouterModule,

//     MatCheckboxModule,
//     MatRadioModule,
//     GridListCommonComponent,
//     GridListCommonTableComponent,
//     GridListCommonSearchComponent,
//     TitleComponent,
//     BtnGComponent,
//     SubTitleComponent,
//     MonthsSelectComponent,
//     FilterBtnRadioComponent,
//     FinancialSubtitleComponent,
//     ListGComponent
//   ],
//   providers: [
//     ListCreditCardExpensesService,
//     PtBrDatePipe,
//     PtBrCurrencyPipe,
//   ]

// })
// export class ListCreditCardExpensesComponent extends FrontEndListFilterCreditCardExpenses implements OnInit, AfterViewInit {
//   constructor(
//     override _actRoute: ActivatedRoute,
//     override _router: Router,
//     private _http: HttpClient,
//     private _fb: FormBuilder,
//     override _dialog: MatDialog,
//     private _ptBrDatePipe: PtBrDatePipe,
//     private _ptBrCurrencyPipe: PtBrCurrencyPipe,

//     override _listServices: ListCreditCardExpensesService

//   ) {
//     super(
//       _dialog,
//       _router,
//       _actRoute,
//       new GridListCommonHelper(_http),
//       ['', 'Local Despesa', 'Dia da despesa', 'Preço', 'Parcela'],
//       ['name', 'expenseDay', 'installmentPrice', 'currentInstallment'],

//       _listServices
//     )
//   }

//   controllerUrl: string = environment._CREDIT_CARD_EXPENSES.split('/')[4];
//   override backEndUrl: string = `${this.controllerUrl}/GetAllCreditCardExpensesByCompanyId`;
//   override  entities: ListGridCreditCardExpensesDto[] = [];
//   override entities$: Observable<ListGridCreditCardExpensesDto[]>;
//   override viewUrlRoute: string = '/financial/view-monthly-fixed-expenses-tracking';
//   override addUrlRoute: string = '/financial/add-credit-card-expenses';

//   // workingFrontEnd = new FrontEndListFilterCreditCardExpenses();
//   workingBackEnd = new BackEndListFilterCreditCardExpenses();

//   pay = new PaymentMonthlyFixedExpense(
//     this._listServices,
//     this._router,
//     this._ptBrDatePipe,
//     this._ptBrCurrencyPipe,
//   );




//   queryFieldOutput($event: FormControl) {
//     this.entities$ = this.query($event, new Date(this.entities[0].expires).getMonth());
//   }



//   orderBy(field: string) {
//     if (this.gridListCommonHelper.pgIsBackEnd)
//       this.workingBackEnd.orderByFrontEnd();
//     else {
//       if (field == 'Local Despesa')
//         this.entities$ = this.orderByFrontEnd(this.entities$, { name: 'name' });

//       if (field == 'Dia da despesa')
//         this.entities$ = this.orderByFrontEnd(this.entities$, { 'expenseDayBusinessRule': new Date() });

//       if (field == 'Preço')
//         this.entities$ = this.orderByFrontEnd(this.entities$, { 'installmentPrice': 0 });

//       if (field == 'Parcela')
//         this.entities$ = this.orderByFrontEnd(this.entities$, { 'expenseDayBusinessRule': new Date() });
//     }

//   }



//   // getCurrentPagedInFrontEnd() {

//   //   const expires = new Date(this.entities[0]?.expenseDayBusinessRule).getMonth();

//   //   const result: Observable<ListGridCreditCardExpensesDto[]> = this.onSelectedMonth(this.entities, this?.months[expires]?.id)
//   //   this.entities$ = result;


//   // //  this.paginatorLength(result);
//   // }

//   paginatorLength(entities: Observable<ListGridCreditCardExpensesDto[]>) {
//     entities.pipe(
//       map(x => this.gridListCommonHelper.lengthPaginator.next(x.length))
//     ).subscribe();
//   }

//   statusCollection: FinancialSubtitleDto[] = [
//     { id: 1, name: 'Vencida', squareBgColor: 'bg-color-expired', monthColorName: 'monthColorNameExpired', visible: false },
//     { id: 2, name: 'Pendente', squareBgColor: 'bg-color-will-expire', monthColorName: 'monthColorNameExpire', visible: false },
//     { id: 3, name: 'Liquidada', squareBgColor: 'bg-color-paid', monthColorName: 'monthColorNamePaid', visible: false }
//   ]

//   expensesMonth: string = null;
//   getCurrentEntitiesFromBackEnd(credCardInvoiceId: number) {
//     this.gridListCommonHelper.getAllEntitiesInMemoryPaged(`${this.controllerUrl}/GetCreditCardExpensesByIdInvoice`, credCardInvoiceId.toString());

//     this.gridListCommonHelper.entitiesFromDbToMemory$.subscribe((x: CreditCardExpenseDto[]) => {
//     this.gridListCommonHelper.lengthPaginator.next(x.length);
//       x.forEach((xy: CreditCardExpenseDto) => {

//         if (x.length != 0) {
//           this.entities.push(this.makeGridItems(xy));
//           this.paymentStatus(x[0])
//           const expires = new Date(x[0].expires).getMonth();
//           this.expensesMonth = this.months[expires].name;
//         }
//       })
//       this.entities$ = of(this.entities)
//       // this.getCurrentPagedInFrontEnd();
//     })


//   }


//   paymentStatus(creditCardExpense: CreditCardExpenseDto) {
//     const expire = new Date(creditCardExpense.expires).getMonth();
//     //PAID
//     this.isPaid(this.entities, expire, 0, this.pageSize).subscribe(
//       x => {
//         if (x.length) {

//           this.statusCollection.find(x => x.id == 3).visible = true;
//         }
//       }
//     )
//     //EXPIRED
//     this.isExpires(this.entities, expire, 0, this.pageSize).subscribe(
//       x => {
//         if (x.length) {
//           this.statusCollection.find(x => x.id == 1).visible = true;
//         }
//       }
//     )
//     //WILL EXPIRES
//     this.isPending(this.entities, expire, 0, this.pageSize).subscribe(
//       x => {
//         if (x.length) {
//           this.statusCollection.find(x => x.id == 2).visible = true;
//         }
//       }
//     )

//   }

//   makeGridItems(xy: CreditCardExpenseDto) {
//     const currentStallment = xy?.currentInstallment?.split('/');
//     const wasPaid: Date = new Date(xy.wasPaid);
//     const viewDto = new ListGridCreditCardExpensesDto;
//     viewDto.wasPaid = xy.wasPaid;
//     viewDto.id = xy.id;
//     viewDto.category = xy.categoryExpense.name.toUpperCase();
//     viewDto.subcategory = xy.subcategoryExpense.name.toUpperCase();
//     viewDto.name = xy.name;
//     viewDto.expires = xy.expires;
//     viewDto.expenseDay = this._ptBrDatePipe.transform(xy.expenseDay, 'Date');
//     viewDto.expenseDayBusinessRule = xy.expenseDay;
//     viewDto.expiresView = this._ptBrDatePipe.transform(xy.expires, 'Date');
//     viewDto.installmentPrice = this._ptBrCurrencyPipe.transform(xy.installmentPrice);
//     viewDto.currentInstallment = `${currentStallment[0]} de ${currentStallment[1]}`
//     return viewDto;
//   }

//   ngOnInit(): void {

//     this.getCurrentEntitiesFromBackEnd(this._actRoute.snapshot.params['id'] as number);
//   }

// }

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';


import { PtBrCurrencyPipe } from 'src/shared/pipes/pt-br-currency.pipe';
import { PtBrDatePipe } from 'src/shared/pipes/pt-br-date.pipe';
import { environment } from 'src/environments/environment';
import { DeleteServices } from 'src/shared/components/delete-dialog/services/delete.services';
import { FinancialSubtitleDto } from '../../../common-components/subtitle/financial-subtitle-dto';
import { ListControlCreditCardExpenses } from '../list/helpers/list-control-credit-card-expenses';
import { ImportsListCreditCardExpenses, ProvidersListCreditCardExpenses } from '../list/imports/imports-list-credit-card-expenses';
import { ListCreditCardExpensesDto } from './dto/list-credit-card-expenses-dto';
import { BackEndListFilterCreditCardExpenses } from './filter-list/back-end-list-filter-credit-card-expenses';
import { PaymentMonthlyFixedExpense } from './payment-monthly-fixed-expense';
import { ListCreditCardExpensesService } from './services/list-credit-card-expenses.service';
import { CreditCardExpenseDto } from '../../dto/credit-card-expense-dto';

@Component({
  selector: 'list-credit-card-expenses',
  templateUrl: './list-credit-card-expenses.component.html',
  styleUrls: ['./list-credit-card-expenses.component.css'],
  standalone: true,
  imports: [
    ImportsListCreditCardExpenses
  ],
  providers: [
    ProvidersListCreditCardExpenses
  ]

})
export class ListCreditCardExpensesComponent extends ListControlCreditCardExpenses implements OnInit {

  constructor(
    override _router: Router,
    override _http: HttpClient,
    override _dialog: MatDialog,
    override _deleteServices: DeleteServices,
    override _ptBrDatePipe: PtBrDatePipe,
    override _ptBrCurrencyPipe: PtBrCurrencyPipe,
    private _fb: FormBuilder,
    private _actRoute: ActivatedRoute,
    private _listServices: ListCreditCardExpensesService

  ) {
    super(
      _router,
      _http,
      _dialog,
      _deleteServices,
      _ptBrDatePipe,
      _ptBrCurrencyPipe
    )
  }

  controllerUrl: string = environment._CREDIT_CARD_EXPENSES.split('/')[4];
  override  entities: ListCreditCardExpensesDto[] = [];
  override entities$: Observable<ListCreditCardExpensesDto[]>;

  // override backEndUrl: string = `${this.controllerUrl}/GetAllCreditCardExpensesByCompanyId`;
  // override viewUrlRoute: string = '/financial/view-monthly-fixed-expenses-tracking';
  // override addUrlRoute: string = '/financial/add-credit-card-expenses';

  // workingFrontEnd = new FrontEndListFilterCreditCardExpenses();
  workingBackEnd = new BackEndListFilterCreditCardExpenses();

  pay = new PaymentMonthlyFixedExpense(
    this._listServices,
    this._router,
    this._ptBrDatePipe,
    this._ptBrCurrencyPipe,
  );




  // queryFieldOutput($event: FormControl) {
  //   this.entities$ = this.query($event, new Date(this.entities[0].expires).getMonth());
  // }



  // orderBy(field: string) {
  //   if (this.gridListCommonHelper.pgIsBackEnd)
  //     this.workingBackEnd.orderByFrontEnd();
  //   else {
  //     if (field == 'Local Despesa')
  //       this.entities$ = this.orderByFrontEnd(this.entities$, { name: 'name' });

  //     if (field == 'Dia da despesa')
  //       this.entities$ = this.orderByFrontEnd(this.entities$, { 'expenseDayBusinessRule': new Date() });

  //     if (field == 'Preço')
  //       this.entities$ = this.orderByFrontEnd(this.entities$, { 'installmentPrice': 0 });

  //     if (field == 'Parcela')
  //       this.entities$ = this.orderByFrontEnd(this.entities$, { 'expenseDayBusinessRule': new Date() });
  //   }

  // }



  // getCurrentPagedInFrontEnd() {

  //   const expires = new Date(this.entities[0]?.expenseDayBusinessRule).getMonth();

  //   const result: Observable<ListGridCreditCardExpensesDto[]> = this.onSelectedMonth(this.entities, this?.months[expires]?.id)
  //   this.entities$ = result;


  // //  this.paginatorLength(result);
  // }

  // paginatorLength(entities: Observable<ListCreditCardExpensesDto[]>) {
  //   entities.pipe(
  //     map(x => this.gridListCommonHelper.lengthPaginator.next(x.length))
  //   ).subscribe();
  // }


  // expensesMonth: string = null;

  // getCurrentEntitiesFromBackEnd(credCardInvoiceId: number) {
  //   this.gridListCommonHelper.getAllEntitiesInMemoryPaged(`${this.controllerUrl}/GetCreditCardExpensesByIdInvoice`, credCardInvoiceId.toString());

  //   this.gridListCommonHelper.entitiesFromDbToMemory$.subscribe((x: CreditCardExpenseDto[]) => {
  //     this.gridListCommonHelper.lengthPaginator.next(x.length);
  //     x.forEach((xy: CreditCardExpenseDto) => {

  //       if (x.length != 0) {
  //         this.entities.push(this.makeGridItems(xy));
  //         this.paymentStatus(x[0])
  //         const expires = new Date(x[0].expires).getMonth();
  //         this.expensesMonth = this.months[expires].name;
  //       }
  //     })
  //     this.entities$ = of(this.entities)
  //     // this.getCurrentPagedInFrontEnd();
  //   })


  // }


  // paymentStatus(creditCardExpense: CreditCardExpenseDto) {
  //   const expire = new Date(creditCardExpense.expires).getMonth();
  //   //PAID
  //   this.isPaid(this.entities, expire, 0, this.pageSize).subscribe(
  //     x => {
  //       if (x.length) {

  //         this.statusCollection.find(x => x.id == 3).visible = true;
  //       }
  //     }
  //   )
  //   //EXPIRED
  //   this.isExpires(this.entities, expire, 0, this.pageSize).subscribe(
  //     x => {
  //       if (x.length) {
  //         this.statusCollection.find(x => x.id == 1).visible = true;
  //       }
  //     }
  //   )
  //   //WILL EXPIRES
  //   this.isPending(this.entities, expire, 0, this.pageSize).subscribe(
  //     x => {
  //       if (x.length) {
  //         this.statusCollection.find(x => x.id == 2).visible = true;
  //       }
  //     }
  //   )

  // }

  // makeGridItems(xy: CreditCardExpenseDto) {
  //   const currentStallment = xy?.currentInstallment?.split('/');
  //   const wasPaid: Date = new Date(xy.wasPaid);
  //   const viewDto = new ListGridCreditCardExpensesDto;
  //   viewDto.wasPaid = xy.wasPaid;
  //   viewDto.id = xy.id;
  //   viewDto.category = xy.categoryExpense.name.toUpperCase();
  //   viewDto.subcategory = xy.subcategoryExpense.name.toUpperCase();
  //   viewDto.name = xy.name;
  //   viewDto.expires = xy.expires;
  //   viewDto.expenseDay = this._ptBrDatePipe.transform(xy.expenseDay, 'Date');
  //   viewDto.expenseDayBusinessRule = xy.expenseDay;
  //   viewDto.expiresView = this._ptBrDatePipe.transform(xy.expires, 'Date');
  //   viewDto.installmentPrice = this._ptBrCurrencyPipe.transform(xy.installmentPrice);
  //   viewDto.currentInstallment = `${currentStallment[0]} de ${currentStallment[1]}`
  //   return viewDto;
  // }

  creditCardExpenseSubscribe: Subscription;
  ngOnDestroy(): void {
    this.creditCardExpenseSubscribe?.unsubscribe();
  }

  ngOnInit(): void {
    this.creditCardExpenseSubscribe = this.startSupply(`${this.controllerUrl}/GetCreditCardExpensesByIdInvoice`, this._actRoute.snapshot.params['id'])
    // this.getCurrentEntitiesFromBackEnd(this._actRoute.snapshot.params['id'] as number);
  }

}
