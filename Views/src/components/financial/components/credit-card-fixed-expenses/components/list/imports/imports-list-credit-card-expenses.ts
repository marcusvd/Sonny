
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
import { MonthsSelectComponent } from '../../../../../../../shared/components/months-select/months-select-g.component';
import { SubTitleComponent } from '../../../../../../../shared/components/sub-title/default/sub-title.component';
import { TitleComponent } from '../../../../../../../shared/components/title/default-title/title.component';
import { ListGComponent } from '../../../../../../../shared/components/list-g/list/list-g.component';
import { FilterBtnRadioComponent } from '../../../../common-components/filter-btn-radio/filter-btn-radio.component';
import { FinancialSubtitleComponent } from '../../../../common-components/subtitle/financial-subtitle.component';
import {ListCreditCardExpensesService} from '../services/list-credit-card-expenses.service';
import { PtBrDatePipe } from 'src/shared/pipes/pt-br-date.pipe';
import { PtBrCurrencyPipe } from 'src/shared/pipes/pt-br-currency.pipe';

export const ImportsListCreditCardExpenses: any[] = [
  CommonModule,
  FormsModule,
  MatCardModule,
  MatPaginatorModule,
  MatButtonModule,
  MatMenuModule,
  RouterModule,
  MatIconModule,
  MatCheckboxModule,
  MatRadioModule,
  TitleComponent,
  BtnGComponent,
  SubTitleComponent,
  MonthsSelectComponent,
  FilterBtnRadioComponent,
  FinancialSubtitleComponent,
  ListGComponent
]
export const ProvidersListCreditCardExpenses: any[] = [
  ListCreditCardExpensesService,
  PtBrDatePipe,
  PtBrCurrencyPipe,
]
