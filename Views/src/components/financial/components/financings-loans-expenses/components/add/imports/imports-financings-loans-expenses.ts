
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BtnGComponent } from '../../../../../../../shared/components/btn-g/btn-g.component';
import { TitleComponent } from '../../../../../../../shared/components/title/default-title/title.component';
import { PtBrCurrencyPipe } from '../../../../../../../shared/pipes/pt-br-currency.pipe';
import { PtBrDatePipe } from '../../../../../../../shared/pipes/pt-br-date.pipe';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { CategorySubcategoryExpensesSelectComponent } from '../../../../../../../shared/components/get-entities/category-subcategory-expenses-select/components/category-subcategory-expenses-select.component';
import { CategoryExpensesService } from '../../../../../../../components/financial/services/category-expenses.service';
import { FinancingsLoansExpensesService } from '../services/financings-loans-expenses.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

export const ImportsAddFinancingsLoansExpenses: any[] = [
  CommonModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatCheckboxModule,
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  ReactiveFormsModule,
  MatSelectModule,
  MatDatepickerModule,
  MatTooltipModule,
  CurrencyMaskModule,
  PtBrCurrencyPipe,
  TitleComponent,
  BtnGComponent,
  CategorySubcategoryExpensesSelectComponent
]

export const ProvidersAddFinancingsLoansExpenses: any[] = [
  FinancingsLoansExpensesService,
  CategoryExpensesService
]
