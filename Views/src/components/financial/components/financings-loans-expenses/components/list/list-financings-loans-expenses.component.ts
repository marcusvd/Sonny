
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component } from '@angular/core';


import { environment } from '../../../../../../environments/environment';
import { ListDefaultImports, ListDefaultProviders } from '../../../../../../components/imports/components-default.imports';
import { DeleteServices } from '../../../../../../shared/components/delete-dialog/services/delete.services';
import { PtBrCurrencyPipe } from '../../../../../../shared/pipes/pt-br-currency.pipe';
import { PtBrDatePipe } from '../../../../../../shared/pipes/pt-br-date.pipe';
import { FinancingsLoansExpensesDto } from '../../dto/financings-loans-expenses-dto';
import { ListControlFinancingsLoansExpenses } from '../list/helpers/list-control-financings-loans-expenses';
import { ListFinancingsLoansExpensesImports, ListFinancingsLoansExpensesProviders } from '../list/imports/list-financings-loans-expenses.imports';
import { ListFinancingsLoansExpensesService } from './services/list-financings-loans-expenses.service';
import { TriggerPaymentFinancingsLoans } from './trigger-payment-financings-loans';


@Component({
  selector: 'list-financings-loans-expenses',
  templateUrl: './list-financings-loans-expenses.component.html',
  styleUrls: ['./list-financings-loans-expenses.component.css'],
  standalone: true,
  imports: [
    ListFinancingsLoansExpensesImports,
    ListDefaultImports,
  ],
  providers: [
    ListDefaultProviders,
    ListFinancingsLoansExpensesProviders
  ]

})
export class ListFinancingsLoansExpensesComponent extends ListControlFinancingsLoansExpenses {

  controllerUrl: string = environment._FINANCINGS_LOANS_EXPENSES.split('/')[4];
   backEndUrl: string = `${this.controllerUrl}/FinancingsAndLoansGetAllExpensesPagedAsync`;
  // override  entities: ListFinancingsLoansExpensesDto[] = [];
  // override entities$: Observable<ListFinancingsLoansExpensesDto[]>;

  // override viewUrlRoute: string = '/financial/view-financings-loans-expenses';



  constructor(
    override _router: Router,
    override _http: HttpClient,
    override _dialog: MatDialog,
    override _deleteServices: DeleteServices,
    override _ptBrDatePipe: PtBrDatePipe,
    override _ptBrCurrencyPipe: PtBrCurrencyPipe,
    private _actRoute: ActivatedRoute,
    private _listServices: ListFinancingsLoansExpensesService,
    private _fb: FormBuilder,
  ) {
    super(
      _router,
      _http,
      _dialog,
      _deleteServices,
      _ptBrDatePipe,
      _ptBrCurrencyPipe,
    )
  }

  FinancingsLoansExpensesSubscribe: Subscription;
  ngOnDestroy(): void {
    this.FinancingsLoansExpensesSubscribe?.unsubscribe();
  }



  ngOnInit(): void {
    this.FinancingsLoansExpensesSubscribe = this.startSupply(`${this.controllerUrl}/GetAllFinancingsAndLoansExpensesByCompanyId`, this.companyId.toString());
    // this.getCurrentEntitiesFromBackEnd(this._actRoute.snapshot.params['id'] as number);
  }


  // workingBackEnd = new BackEndListFilterFinancingsLoansExpenses();

  pay = new TriggerPaymentFinancingsLoans(
    this._router,
    this._ptBrDatePipe,
    this._ptBrCurrencyPipe,
  );


  financingsLoansExpenses: FinancingsLoansExpensesDto[] = [];
  getEntityTopay(entity: FinancingsLoansExpensesDto) {
    const yearlyExpense = this.financingsLoansExpenses.find(x => x.id == entity.id);

    this.pay.entityToPay = yearlyExpense;

    this.pay.callRoute(this.pay.entityToPay);
  }


  // override getEntity($event: IEntityGridAction, itemWillDeleted?: string) {

  //   if ($event.action == 'visibility')
  //     this.viewDialog(this.viewUrlRoute, this.makeObjToShow($event.entity));

  //   if ($event.action == 'format_list_numbered')
  //     this.viewList(this.viewListUrlRoute, $event.entity.id);
  // }

  // makeObjToShow(entity: ListFinancingsLoansExpensesDto): ViewExpensesGDto[] {

  //   const obj = [
  //     { label: 'Descrição', value: entity.name, order: 1 },
  //     { label: 'Categoria', value: entity.categoryExpense.name, order: 2 },
  //     { label: 'Subcategoria', value: entity.subcategoryExpense.name, order: 3 },
  //     { label: 'Início', value: this._ptBrDatePipe.transform(entity.start, 'Date'), order: 4 },
  //     { label: 'Fim', value: this._ptBrDatePipe.transform(entity.end, 'Date'), order: 5 },
  //     { label: 'Código', value: entity.id, order: 6 },
  //     { label: 'Prestações', value: entity.installmentsQuantity, order: 7 },
  //     { label: 'Valor por prestação', value: entity.installmentPrice, order: 8 },
  //     { label: '', value: entity.userId, order: 9 },
  //     { label: '', value: entity.user, order: 10 },
  //     { label: '', value: entity.companyId, order: 11 },
  //     { label: '', value: entity.company, order: 12 },
  //     { label: '', value: entity.totalPriceToBePaid, order: 13 },
  //     { label: '', value: entity.totalPriceFinancingOrLoan, order: 14 },
  //     { label: '', value: entity.totalPriceInterest, order: 15 },
  //     { label: '', value: entity.totalPercentageInterest, order: 16 },
  //     { label: '', value: entity.wasPaid, order: 19 },
  //     { label: '', value: entity.deleted, order: 20 },
  //     { label: '', value: entity.registered, order: 21 },
  //     { label: '', value: entity.description, order: 22 },
  //     { label: '', value: entity.linkCopyBill, order: 23 },
  //     { label: '', value: entity.uSERLinkCopyBill, order: 24 },
  //     { label: '', value: entity.pASSLinkCopyBill, order: 25 },

  //   ]

  //   return obj

  // }

  // queryFieldOutput($event: FormControl) {
  //   this.termSearched = $event.value
  //   this.entities$ = of(this.searchField(this.entities, this.termSearched))
  // }

  // orderBy(field: string) {
  //   if (this.gridListCommonHelper.pgIsBackEnd)
  //     this.workingBackEnd.orderByFrontEnd();
  //   else {
  //     if (field == 'Despesa')
  //       this.entities$ = this.orderByFrontEnd(this.entities$, { name: 'name' });

  //     if (field == 'Valor parcela')
  //       this.entities$ = this.orderByFrontEnd(this.entities$, { 'installmentPrice': 0 });

  //     if (field == 'Nº Parcelas')
  //       this.entities$ = this.orderByFrontEnd(this.entities$, { 'installmentsQuantity': 0 });
  //   }
  // }

  // getCurrentPagedInFrontEnd() {
  //   const entities = this.entities;
  //   this.gridListCommonHelper.lengthPaginator.next(entities.length);

  //   this.entities$ = of(entities)
  // }

  // getCurrentEntitiesFromBackEnd() {
  //   this.gridListCommonHelper.getAllEntitiesInMemoryPaged(`${this.controllerUrl}/GetAllFinancingsAndLoansExpensesByCompanyId`, this.companyId.toString());
  //   this.gridListCommonHelper.entitiesFromDbToMemory$.subscribe((x: FinancingsLoansExpensesDto[]) => {
  //     x.forEach((xy: FinancingsLoansExpensesDto) => {
  //       this.financingsLoansExpenses.push(xy)
  //       this.entities.push(this.makeGridItems(xy));
  //     })
  //     this.getCurrentPagedInFrontEnd();
  //   })
  // }

  // makeGridItems(xy: FinancingsLoansExpensesDto) {

  //   const viewGridDto = new ListFinancingsLoansExpensesDto();
  //   viewGridDto.id = xy.id;
  //   viewGridDto.category = xy.categoryExpense.name;
  //   viewGridDto.name = xy.name;
  //   viewGridDto.installmentsQuantity = xy.installmentsQuantity.toString();
  //   viewGridDto.installmentPrice = this._ptBrCurrencyPipe.transform(xy.installmentPrice);
  //   viewGridDto.userId = xy.userId;
  //   viewGridDto.user = xy.user;
  //   viewGridDto.companyId = xy.companyId;
  //   viewGridDto.company = xy.company;
  //   viewGridDto.start = xy.start;
  //   viewGridDto.end = xy.end;
  //   viewGridDto.totalPriceToBePaid = xy.totalPriceToBePaid;
  //   viewGridDto.totalPriceFinancingOrLoan = xy.totalPriceFinancingOrLoan;
  //   viewGridDto.totalPriceInterest = xy.totalPriceInterest;
  //   viewGridDto.totalPercentageInterest = xy.totalPercentageInterest;
  //   viewGridDto.wasPaid = xy.wasPaid;
  //   viewGridDto.deleted = xy.deleted;
  //   viewGridDto.registered = xy.registered;
  //   viewGridDto.description = xy.description;
  //   viewGridDto.linkCopyBill = xy.linkCopyBill;
  //   viewGridDto.uSERLinkCopyBill = xy.uSERLinkCopyBill;
  //   viewGridDto.pASSLinkCopyBill = xy.pASSLinkCopyBill;
  //   return viewGridDto
  // }

  // ngOnInit(): void {

  //   // this.getCurrentEntitiesFromBackEnd();
  // }

}
