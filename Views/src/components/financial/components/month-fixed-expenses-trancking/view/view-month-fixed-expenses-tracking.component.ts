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
import { SubTitleComponent } from 'src/shared/components/sub-title/sub-title.component';
import { TitleComponent } from 'src/shared/components/title/components/title.component';
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
    // MatInputModule,
    MatCardModule,
    CurrencyMaskModule,
    PtBrCurrencyPipe,
    PtBrDatePipe,
    BtnGComponent,
    SubTitleComponent,
    TitleComponent,
  ],
  templateUrl: './view-month-fixed-expenses-tracking.component.html',
  styleUrls: ['./view-month-fixed-expenses-tracking.component.css']
})
export class ViewMonthFixedExpensesTrackingComponent implements OnInit {

  fixedExpensesTracking: MonthFixedExpensesTrackingDto = null;

  constructor(private _actRoute: ActivatedRoute,
    private _services: ViewMonthFixedExpensesTrackingService) {
  }



  getEntity(id: string) {
    this._services.loadById$<MonthFixedExpensesTrackingDto>('GetFixedExpensesTrackingByIdAllIncluded', id).subscribe(x => {
      this.fixedExpensesTracking = x;

      console.log(x.monthFixedExpenses);
    })
  }
  ngOnInit(): void {
    const id: string = this._actRoute.snapshot.params['id'];
    this.getEntity(id);
  }

}
