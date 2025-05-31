
import { PtBrCurrencyPipe } from 'src/shared/pipes/pt-br-currency.pipe';
import { CategoryExpensesService } from '../../../../../../../components/financial/services/category-expenses.service';
import { BtnGComponent } from '../../../../../../../shared/components/btn-g/btn-g.component';
import { CategorySubcategoryExpensesSelectComponent } from '../../../../../../../shared/components/get-entities/category-subcategory-expenses-select/components/category-subcategory-expenses-select.component';
import { FinancingsLoansExpensesService } from '../services/financings-loans-expenses.service';

export const AddFinancingsLoansExpensesImports: any[] = [
  BtnGComponent,
  CategorySubcategoryExpensesSelectComponent,
  PtBrCurrencyPipe
]

export const AddFinancingsLoansExpensesProviders: any[] = [
  FinancingsLoansExpensesService,
  CategoryExpensesService
]
