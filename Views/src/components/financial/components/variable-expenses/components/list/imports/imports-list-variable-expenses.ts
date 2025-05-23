
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { RouterModule } from '@angular/router';


import { BtnGComponent } from '../../../../../../../shared/components/btn-g/btn-g.component';
import { TitleComponent } from '../../../../../../../shared/components/title/default-title/title.component';
import { ListGComponent } from '../../../../../../../shared/components/list-g/list/list-g.component';
import { PtBrDatePipe } from '../../../../../../../shared/pipes/pt-br-date.pipe';
import { PtBrCurrencyPipe } from '../../../../../../../shared/pipes/pt-br-currency.pipe';
import { MonthsSelectComponent } from '../../../../../../../shared/components/months-select/months-select-g.component';
import { VariableExpensesListService } from '../services/variable-expenses-list.service';

export const ImportsListVariableExpenses: any[] = [
  CommonModule,
  MatCardModule,
  MatPaginatorModule,
  RouterModule,
  MatIconModule,
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
