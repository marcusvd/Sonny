import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute } from '@angular/router';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';
import { View } from 'src/shared/components/inheritance/view/view';
import { SubTitleComponent } from 'src/shared/components/sub-title/sub-title.component';
import { TitleComponent } from 'src/shared/components/title/components/title.component';
import { BankCardNumberPipe } from 'src/shared/pipes/bank-card-number.pipe';
import { CardTypePipe } from 'src/shared/pipes/card-type.pipe';
import { CnpjCpfPipe } from 'src/shared/pipes/cnpj-cpf.pipe';
import { PtBrCurrencyPipe } from 'src/shared/pipes/pt-br-currency.pipe';
import { PtBrDatePipe } from 'src/shared/pipes/pt-br-date.pipe';
import { MonthFixedExpensesTrackingDto } from '../dto/month-fixed-expenses-tracking-dto';
import { ViewMonthFixedExpensesTrackingService } from './services/view-month-fixed-expenses-tracking.service';

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
    CardTypePipe,
    BtnGComponent,
    SubTitleComponent,
    TitleComponent,
  ],
  templateUrl: './view-month-fixed-expenses-tracking.component.html',
  styleUrls: ['./view-month-fixed-expenses-tracking.component.css']
})
export class ViewMonthFixedExpensesTrackingComponent extends View implements OnInit {

  fixedExpensesTracking: MonthFixedExpensesTrackingDto = null;

  constructor(private _actRoute: ActivatedRoute,
    private _services: ViewMonthFixedExpensesTrackingService,
    override _breakpointObserver: BreakpointObserver
  ) {
    super(_breakpointObserver)
  }


  getEntity(id: string) {

    this._services.getEntityBackEnd(id).subscribe((x: MonthFixedExpensesTrackingDto) => {
      this.fixedExpensesTracking = x;
      //console.log(x.card.number)
    })

  }


  get wasPaid() {
    return new Date(this.fixedExpensesTracking?.wasPaid)
  }
  get expire() {
    return new Date(this.fixedExpensesTracking?.expiration)
  }

  ngOnInit(): void {
    const id: string = this._actRoute.snapshot.params['id'];
    this.getEntity(id);
    this.screen();
  }

}
