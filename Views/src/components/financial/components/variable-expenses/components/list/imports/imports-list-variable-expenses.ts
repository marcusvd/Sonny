
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';


import { BtnGComponent } from '../../../../../../../shared/components/btn-g/btn-g.component';
import { ListGComponent } from '../../../../../../../shared/components/list-g/list/list-g.component';
import { MonthsSelectComponent } from '../../../../../../../shared/components/months-select/months-select-g.component';
import { TitleComponent } from '../../../../../../../shared/components/title/default-title/title.component';
import { PtBrCurrencyPipe } from '../../../../../../../shared/pipes/pt-br-currency.pipe';
import { PtBrDatePipe } from '../../../../../../../shared/pipes/pt-br-date.pipe';
import { VariableExpensesListService } from '../services/variable-expenses-list.service';
import { MatDividerModule } from '@angular/material/divider';

export const ImportsListVariableExpenses: any[] = [
  CommonModule,
  MatCardModule,
  MatPaginatorModule,
  RouterModule,
  MatIconModule,
  MatDividerModule,
  TitleComponent,
  BtnGComponent,
  MonthsSelectComponent,
  ListGComponent
]

export const ProvidersListVariableExpenses: any[] = [
  PtBrDatePipe,
  PtBrCurrencyPipe,
  VariableExpensesListService
]
