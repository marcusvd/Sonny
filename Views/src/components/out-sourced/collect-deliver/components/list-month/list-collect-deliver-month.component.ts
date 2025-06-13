
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';


import { environment } from 'src/environments/environment';

import { DeleteServices } from 'src/shared/components/delete-dialog/services/delete.services';
import { PtBrCurrencyPipe } from 'src/shared/pipes/pt-br-currency.pipe';
import { PtBrDatePipe } from 'src/shared/pipes/pt-br-date.pipe';
import { ListDefaultImports, ListDefaultProviders } from '../../../../../components/imports/components-default.imports';
import { ListCollectDeliverMonthImports, ListCollectDeliverMonthProviders } from '../../components/list-month/imports/list-collect-deliver-month.imports';
import { CollectDeliverDto } from '../../dto/collect-deliver-dto';
import { ListMonthControlCollectDeliver } from '../list-month/helpers/list-month-control-collect-deliver';
import { ListMonthCollectDeliverDto } from './dto/list-month-collect-deliver-dto';
import { ListCollectDeliverMonthService } from './services/list-collect-deliver-month.service';
import { TriggerCollectDeliverMonth } from './trigger-collect-deliver-month';


@Component({
  selector: 'list-collect-deliver-month',
  templateUrl: './list-collect-deliver-month.component.html',
  styleUrls: ['./list-collect-deliver-month.component.scss'],
  standalone: true,
  imports: [
    ListDefaultImports,
    ListCollectDeliverMonthImports
  ],
  providers: [
    ListDefaultProviders,
    ListCollectDeliverMonthProviders
  ]

})
export class ListCollectDeliverMonthComponent extends ListMonthControlCollectDeliver implements OnInit {

  listCollectDeliverMonth: Subscription;
  controllerUrl: string = environment._COLLECT_DELIVER.split('/')[4];


  constructor(
    override _http: HttpClient,
    override _router: Router,
    private _actRoute: ActivatedRoute,
    private _listServices: ListCollectDeliverMonthService,
    override _dialog: MatDialog,
    private _fb: FormBuilder,
    override _ptBrCurrencyPipe: PtBrCurrencyPipe,
    override _ptBrDatePipe: PtBrDatePipe,
    override _deleteServices: DeleteServices,
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


    ngOnDestroy(): void {
      this.listCollectDeliverMonth?.unsubscribe();
    }


    ngOnInit(): void {
      this.listCollectDeliverMonth = this.startSupply(`${this.controllerUrl}/GetAllByCompanyIdCurrentYearAsync`, this.companyId.toString());
      // this.selectedMonth(this.monthFilter);
      // this.getCurrentEntitiesFromBackEnd(this._actRoute.snapshot.params['id'] as number);
    }

  // override backEndUrl: string = `${this.controllerUrl}/GetAllByCompanyIdCollectDeliverAsync`;
  // override  entities: ListMonthCollectDeliverDto[] = [];
  // override entities$: Observable<ListMonthCollectDeliverDto[]>;
  // override viewListUrlRoute: string = '/list-collect-deliver-by-month';
  override addUrlRoute: string = '/outsourced/add-collect-deliver';
  titleGrid = `Coletas entregas: ${this.currentDate.getFullYear()}`;

  listCreditCardExpenseInvoice: CollectDeliverDto[] = [];
  getEntityTopay(entity: ListMonthCollectDeliverDto) {

    // if (this.currentDate > entity.closingDateBusinessRule) {
    //   const invoice = this.listCreditCardExpenseInvoice.find(x => x.id == entity.id);
    //   this.pay.callRoute(this.pay.entityToPay = invoice)
    // }
    // else
    //   alert('Fatura ainda não fechada!')


  }

  pay = new TriggerCollectDeliverMonth(
    this._router,
    this._ptBrDatePipe,
    this._ptBrCurrencyPipe,
  );


  // getEntity($event : IEntityGridAction, itemWillDeleted?: string) {

  // }

  // monthFilter = new MonthsDto();
  // monthHideShowPendingRadio: MonthsDto = new MonthsDto();
  // selectedMonth(month: MonthsDto) {
  //   this.monthFilter = null;
  //   this.monthFilter = month;
  //   this.monthHideShowPendingRadio = month;

  //   if (this.monthFilter.id != -1)
  //     this.entities$ = this.onSelectedMonth(this.entities, this.monthFilter.id, 'start');

  //   if (this.monthFilter.id == -1)
  //     this.entities$ = this.onSelectedMonth(this.entities, this.monthFilter.id, 'start');
  // }

  getCurrentPagedInFrontEnd() {
    this.entities$ = this.current(this.entities, 0, this.pageSize, 'start', false);
  }

  getData() {
    // this.gridListCommonHelper.getAllEntitiesInMemoryPaged(`${this.backEndUrl}`, this.companyId);

    // this.gridListCommonHelper.entitiesFromDbToMemory$.subscribe((x: CollectDeliverDto[]) => {
    //   //this.cleanGridWhenChangeCard();
    //   this.makeGridItems(x, this.makeMonths())
    //   this.getCurrentPagedInFrontEnd();
    // })
  }

  cleanGridWhenChangeCard() {
    this.entities = [];
    this.listCreditCardExpenseInvoice = [];
  }



  // ngOnInit(): void {
  //   this.getData();

  //   this.selectedMonth(this.monthFilter);
  // }

}
