import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';
import { View } from 'src/shared/components/inheritance/view/view';
import { SubTitleComponent } from 'src/shared/components/sub-title/sub-title.component';
import { TitleComponent } from 'src/shared/components/title/components/title.component';
import { BankCardNumberPipe } from 'src/shared/pipes/bank-card-number.pipe';
import { CardTypePipe } from 'src/shared/pipes/card-type.pipe';
import { CnpjCpfPipe } from 'src/shared/pipes/cnpj-cpf.pipe';
import { PhoneNumberPipe } from 'src/shared/pipes/phone-number.pipe';
import { PtBrCurrencyPipe } from 'src/shared/pipes/pt-br-currency.pipe';
import { PtBrDatePipe } from 'src/shared/pipes/pt-br-date.pipe';
import { ViewMonthlyFixedExpensesService } from './services/view-monthly-fixed-expenses.service';
import { MonthlyFixedExpenseDto } from '../../dto/monthly-fixed-expense-dto';
import { FinancialStaticBusinessRule } from '../../../common-components/static-business-rule/static-business-rule';

@Component({
  selector: 'view-monthly-fixed-expenses',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    CurrencyMaskModule,
    CnpjCpfPipe,
    PtBrCurrencyPipe,
    PtBrDatePipe,
    BankCardNumberPipe,
    PhoneNumberPipe,
    CardTypePipe,
    BtnGComponent,
    SubTitleComponent,
    TitleComponent,
  ],
  templateUrl: './view-monthly-fixed-expenses.component.html',
  styleUrls: ['./view-monthly-fixed-expenses.component.css']
})
export class ViewMonthlyFixedExpensesComponent extends View implements OnInit {

  fixedExpenseTracking = new MonthlyFixedExpenseDto();

  constructor(
    private _actRoute: ActivatedRoute,
    private _router: Router,
    private _services: ViewMonthlyFixedExpensesService,
    override _breakpointObserver: BreakpointObserver
  ) {
    super(_breakpointObserver)
  }

  getEntity(id: string) {
    this._services.getEntityBackEnd(id).subscribe((x: MonthlyFixedExpenseDto) => {
      this.fixedExpenseTracking = x;
      console.log(this.fixedExpenseTracking?.interest)
    })
  }

  toPay() {
    this._router.navigateByUrl(`/side-nav/financial-dash/monthly-fixed-expenses-to-pay/${this.entityId.toString()}`)
  }

  get wasPaid() {
    return FinancialStaticBusinessRule.isPaid(this.fixedExpenseTracking?.wasPaid?.toString())
  }

  get numberOfDaysToExpire() {
    return FinancialStaticBusinessRule.numberOfDaysToExpire(this.fixedExpenseTracking?.expires.toString())
  }

  get isExpire() {
    return FinancialStaticBusinessRule.isExpired(this.fixedExpenseTracking?.expires.toString(), this.fixedExpenseTracking?.wasPaid.toString())
  }

  entityId: number;
  ngOnInit(): void {
    // const id: string = this._actRoute.snapshot.params['id'];
    this.entityId = this._actRoute.snapshot.params['id'];
    this.getEntity(this.entityId.toString());
    this.screen();
  }

}