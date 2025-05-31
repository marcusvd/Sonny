import { FilterBtnRadioComponent } from '../../../../../../../components/financial/components/common-components/filter-btn-radio/filter-btn-radio.component';
import { ListPixExpensesService } from '../../../components/list/services/list-pix-expenses.service';
import { MonthsSelectComponent } from '../../../../../../../shared/components/months-select/months-select-g.component';

export const ListPixExpensesImports: any[] = [
  FilterBtnRadioComponent,
  MonthsSelectComponent
]

export const ListPixExpensesProviders: any[] = [
  ListPixExpensesService
]
