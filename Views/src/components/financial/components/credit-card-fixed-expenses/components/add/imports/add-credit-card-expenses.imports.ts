import { CategorySubcategoryExpensesSelectComponent } from '../../../../../../../shared/components/get-entities/category-subcategory-expenses-select/components/category-subcategory-expenses-select.component';
import { GetBankAccountCardsSelectComponent } from '../../../../common-components/get-bank-account-card/bank-account-mat-select-single.component'
import { AddCreditCardExpensesService } from '../services/add-credit-card-expenses.service';
import { CategoryExpensesService } from '../../../../../../../components/financial/services/category-expenses.service';

export const AddCreditCardExpensesImports: any[] = [
  CategorySubcategoryExpensesSelectComponent,
  GetBankAccountCardsSelectComponent
]

export const AddCreditCardExpensesProviders: any[] = [
  AddCreditCardExpensesService,
  CategoryExpensesService
]
