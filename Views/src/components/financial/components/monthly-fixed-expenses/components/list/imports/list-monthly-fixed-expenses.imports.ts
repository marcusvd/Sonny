import { FilterBtnRadioComponent } from 'src/components/financial/components/common-components/filter-btn-radio/filter-btn-radio.component';
import { ListMonthlyFixedExpensesService } from '../services/list-monthly-fixed-expenses.service';
import { MonthsSelectComponent } from 'src/shared/components/months-select/months-select-g.component';

export const ListMonthlyFixedExpensesImports: any[] = [
  FilterBtnRadioComponent,
  MonthsSelectComponent
]

export const ListMonthlyFixedExpensesProviders: any[] = [
 ListMonthlyFixedExpensesService,
]
