

import { ListYearlyFixedExpensesService } from '../list/services/list-yearly-fixed-expenses.service';
import { CategoryExpensesService } from '../../../../../../components/financial/services/category-expenses.service';
import { FilterBtnRadioComponent } from '../../../common-components/filter-btn-radio/filter-btn-radio.component';

CategoryExpensesService
export const ListYearlyFixedExpensesImports: any[] = [
  // CommonModule,
  // FormsModule,
  // MatCardModule,
  // MatPaginatorModule,
  // MatButtonModule,
  // MatMenuModule,
  // RouterModule,
  // MatIconModule,
  // MatCheckboxModule,
  // MatRadioModule,
  // MatDividerModule,
  FilterBtnRadioComponent
]

export const ListYearlyFixedExpensesProviders: any[] = [
  ListYearlyFixedExpensesService,
  CategoryExpensesService
]
