
import { CategoryExpensesService } from '../../../../../../components/financial/services/category-expenses.service';
import { BankAccountMatSelectSingleComponent } from '../../../../../../shared/components/get-entities/bank-account/bank-account-mat-select-single.component';
import { CategorySubcategoryExpensesSelectComponent } from '../../../../../../shared/components/get-entities/category-subcategory-expenses-select/components/category-subcategory-expenses-select.component';
import { GetBankAccountComponent } from '../../../common-components/bank-account/gets/get-bank-account/get-bank-accounts.component';
import { PixesExpensesFieldsComponent } from '../../../common-components/pixes-expenses/forms/pixes-expenses-fields.component';
import { AddCashWithdrawnExpensesService } from '../../services/add-cash-withdrawn-expenses.service';

export const ImportsAddCashWithdrawnExpenses: any[] = [
  BankAccountMatSelectSingleComponent,
  CategorySubcategoryExpensesSelectComponent,
  PixesExpensesFieldsComponent,
  GetBankAccountComponent
]

export const ProvidersAddCashWithdrawnExpenses: any[] = [
  AddCashWithdrawnExpensesService,
  CategoryExpensesService,
]
