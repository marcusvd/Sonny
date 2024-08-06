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
import { MonthFixedExpensesTrackingDto } from '../dto/month-fixed-expenses-tracking-dto';
import { ViewMonthFixedExpensesTrackingService } from './services/view-month-fixed-expenses-tracking.service';
import { FinancialStaticBusinessRule } from '../../common-components/static-business-rule/static-business-rule';

@Component({
  selector: 'view-month-fixed-expenses-tracking',
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
  templateUrl: './view-month-fixed-expenses-tracking.component.html',
  styleUrls: ['./view-month-fixed-expenses-tracking.component.css']
})
export class ViewMonthFixedExpensesTrackingComponent extends View implements OnInit {

  fixedExpensesTracking = new MonthFixedExpensesTrackingDto();

  constructor(
    private _actRoute: ActivatedRoute,
    private _router: Router,
    private _services: ViewMonthFixedExpensesTrackingService,
    override _breakpointObserver: BreakpointObserver
  ) {
    super(_breakpointObserver)
  }

  getEntity(id: string) {
    this._services.getEntityBackEnd(id).subscribe((x: MonthFixedExpensesTrackingDto) => {
      this.fixedExpensesTracking = x;
      console.log(this.fixedExpensesTracking?.interest)
    })
  }

  toPay() {
    this._router.navigateByUrl(`/side-nav/financial-dash/month-fixed-expenses-to-pay/${this.entityId.toString()}`)
  }

  get wasPaid() {
    return FinancialStaticBusinessRule.isPaid(this.fixedExpensesTracking?.wasPaid?.toString())
  }

  get numberOfDaysToExpire() {
    return FinancialStaticBusinessRule.numberOfDaysToExpire(this.fixedExpensesTracking?.expiration.toString())
  }

  get isExpire() {
    return FinancialStaticBusinessRule.isExpired(this.fixedExpensesTracking?.expiration.toString(), this.fixedExpensesTracking?.wasPaid.toString())
  }

  entityId: number;
  ngOnInit(): void {
    // const id: string = this._actRoute.snapshot.params['id'];
    this.entityId = this._actRoute.snapshot.params['id'];
    this.getEntity(this.entityId.toString());
    this.screen();
  }

}
