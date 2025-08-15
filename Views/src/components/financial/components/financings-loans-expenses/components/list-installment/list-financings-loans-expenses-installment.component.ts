import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';


import { PtBrCurrencyPipe } from '../../../../../../shared/pipes/pt-br-currency.pipe';
import { PtBrDatePipe } from '../../../../../../shared/pipes/pt-br-date.pipe';

import { ListDefaultImports, ListDefaultProviders } from '../../../../../../components/imports/components-default.imports';
import { DeleteServices } from '../../../../../../shared/components/delete-dialog/services/delete.services';
import { ListControlListFinancingsLoansExpensesInstallment } from '../list-installment/helpers/list-control-financings-loans-expenses-installment';
import { ListFinancingsLoansExpensesInstallmentImports, ListFinancingsLoansExpensesInstallmentProviders } from '../list-installment/imports/list-financings-loans-expenses-installment.imports';


@Component({
  selector: 'list-financings-loans-expenses-installment',
  templateUrl: './list-financings-loans-expenses-installment.component.html',
  styleUrls: ['./list-financings-loans-expenses-installment.component.scss'],
  standalone: true,
  imports: [
    ListFinancingsLoansExpensesInstallmentImports,
    ListDefaultImports,
  ],
  providers: [
    ListFinancingsLoansExpensesInstallmentProviders,
    ListDefaultProviders,
  ]

})
export class ListFinancingsLoansExpensesInstallmentComponent extends ListControlListFinancingsLoansExpensesInstallment implements OnInit {

  btn_bg_txt_color_size_cls_detail = '!bg-main-color !text-white';
  btn_w_h_cls_detail = '!w-[150px]';
  hide_icon_detail = false;
  actClosed_detail = 'keyboard_arrow_up';
  actOpened_detail = 'keyboard_arrow_down';
  pipe_box_detail = 'btn-pipe-main';

  btn_bg_txt_color_size_cls_filter = '!bg-main-color !text-white';
  btn_w_h_cls_filter = '!w-[150px]';
  hide_icon_filter = false;
  actClosed_filter = 'keyboard_arrow_up';
  actOpened_filter = 'keyboard_arrow_down';
  pipe_box_filter = 'btn-pipe-main';
  box_inside_btn_detail = 'grid grid-cols-[25px_1px_110px] items-center space-x-1 btnMouseOverMain';
  box_inside_btn_filter = 'grid grid-cols-[25px_1px_110px] items-center space-x-1 btnMouseOverMain';

  financingsLoansExpensesInstallmentSubscribe: Subscription;

  constructor(
    private _actRoute: ActivatedRoute,
    override _router: Router,
    override _http: HttpClient,
    override _dialog: MatDialog,
    override _ptBrDatePipe: PtBrDatePipe,
    override _ptBrCurrencyPipe: PtBrCurrencyPipe,
    override _deleteServices: DeleteServices,
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

  ngOnDestroy(): void {
    this.financingsLoansExpensesInstallmentSubscribe?.unsubscribe();
  }

  customizedBtnDetail(open_close: boolean) {

    if (open_close) {
      this.actOpened_detail = 'close';
      this.btn_bg_txt_color_size_cls_detail = '!bg-remove-color !text-white';
      this.pipe_box_detail = 'btn-pipe-red';
      this.box_inside_btn_detail = 'grid grid-cols-[25px_1px_110px] items-center space-x-1 btnMouseOverRed'
    }

    if (!open_close) {
      this.btn_bg_txt_color_size_cls_detail = '!bg-main-color !text-white';
      this.box_inside_btn_detail = 'grid grid-cols-[25px_1px_110px] items-center space-x-1 btnMouseOverMain';
      this.pipe_box_detail = 'btn-pipe-main';
    }

  }

  customizedBtnFilter(open_close: boolean) {

    if (open_close) {
      this.actOpened_filter = 'close';
      this.btn_bg_txt_color_size_cls_filter = '!bg-remove-color !text-white';
      this.pipe_box_filter = 'btn-pipe-red';
      this.box_inside_btn_filter = 'grid grid-cols-[25px_1px_110px] items-center space-x-1 btnMouseOverRed'
    }

    if (!open_close) {
      this.btn_bg_txt_color_size_cls_filter = '!bg-main-color !text-white';
      this.pipe_box_filter = 'btn-pipe-main';
      this.box_inside_btn_filter = 'grid grid-cols-[25px_1px_110px] items-center space-x-1 btnMouseOverMain';
    }

  }

  responsive(event?: Event) {

    if (this.screen(event) <= 640)
      this.mobileBtns();
    else
      this.desktopBtns();

  }

  desktopBtns() {
    this.hide_icon_detail = false;
    this.btn_w_h_cls_detail = '!w-[150px]';

    this.hide_icon_filter = false;
    this.btn_w_h_cls_filter = '!w-[150px]';
  }


  mobileBtns() {
    this.hide_icon_detail = true;
    this.btn_w_h_cls_detail = '!w-[110px]';

    this.hide_icon_filter = true;
    this.btn_w_h_cls_filter = '!w-[110px]';
  }

  ngOnInit(): void {

    this.responsive(this.event);
    const id = this._actRoute.snapshot.params['id'];
    this.financingsLoansExpensesInstallmentSubscribe = this.startSupply(`${this.controllerUrl}/GetInstallmentsByFinancingsAndLoansExpensesId`, id);
  }

}
