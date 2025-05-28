

import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';


import { CurrencyMaskModule } from 'ng2-currency-mask';
import { DateJustDayComponent } from '../../shared/components/date-just-day/date-just-day.component';
import { TitleComponent } from '../../shared/components/title/default-title/title.component';
import { BtnGComponent } from '../../shared/components/btn-g/btn-g.component';
import { PtBrDatePipe } from '../../shared/pipes/pt-br-date.pipe';
import { PtBrCurrencyPipe } from '../../shared/pipes/pt-br-currency.pipe';
import { AddMonthlyFixedExpensesService } from '../financial/components/monthly-fixed-expenses/components/add/services/add-monthly-fixed-expenses.service';
import { MatIconModule } from '@angular/material/icon';



export const AddDefaultImports: any[] = [
  CommonModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatCheckboxModule,
  MatCardModule,
  ReactiveFormsModule,
  MatSelectModule,
  MatDatepickerModule,
  CurrencyMaskModule,
  TitleComponent,
  DateJustDayComponent,
  BtnGComponent
]

export const AddDefaultProviders: any[] = [
  AddMonthlyFixedExpensesService
]
