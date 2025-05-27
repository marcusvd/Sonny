import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';


import { CurrencyMaskModule } from 'ng2-currency-mask';

import { BtnGComponent } from '../../../../../../shared/components/btn-g/btn-g.component';
import { BankAccountMatSelectSingleComponent } from '../../../../../../shared/components/get-entities/bank-account/bank-account-mat-select-single.component';
import { CategorySubcategoryExpensesSelectComponent } from '../../../../../../shared/components/get-entities/category-subcategory-expenses-select/components/category-subcategory-expenses-select.component';
import { MatIconModule } from '@angular/material/icon';
import { TitleComponent } from '../../../../../../shared/components/title/default-title/title.component';
import { PixesExpensesFieldsComponent } from '../../../common-components/pixes-expenses/pixes-expenses-fields.component';
import { CategoryExpensesService } from '../../../../../../components/financial/services/category-expenses.service';
import { VariableExpensesService } from '../add/services/variable-expenses.service';
import { PtBrDatePipe } from 'src/shared/pipes/pt-br-date.pipe';

export const ImportsAddVariableExpenses: any[] = [
  CommonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatCheckboxModule,
  MatButtonModule,
  MatCardModule,
  ReactiveFormsModule,
  MatSelectModule,
  MatDatepickerModule,
  CurrencyMaskModule,
  TitleComponent,
  BankAccountMatSelectSingleComponent,
  CategorySubcategoryExpensesSelectComponent,
  BtnGComponent,
  PixesExpensesFieldsComponent
]

export const ProvidersAddVariable: any[] = [
  VariableExpensesService,
  CategoryExpensesService,
  PtBrDatePipe
]
