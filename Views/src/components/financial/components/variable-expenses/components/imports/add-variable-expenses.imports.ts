
import { CategoryExpensesService } from '../../../../../../components/financial/services/category-expenses.service';
import { BankAccountMatSelectSingleComponent } from '../../../../../../shared/components/get-entities/bank-account/bank-account-mat-select-single.component';
import { CategorySubcategoryExpensesSelectComponent } from '../../../../../../shared/components/get-entities/category-subcategory-expenses-select/components/category-subcategory-expenses-select.component';
import { PixesExpensesFieldsComponent } from '../../../common-components/pixes-expenses/pixes-expenses-fields.component';
import { VariableExpensesService } from '../add/services/variable-expenses.service';

export const ImportsAddVariableExpenses: any[] = [
  BankAccountMatSelectSingleComponent,
  CategorySubcategoryExpensesSelectComponent,
  PixesExpensesFieldsComponent
]

export const ProvidersAddVariable: any[] = [
  VariableExpensesService,
  CategoryExpensesService,
]
