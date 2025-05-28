import { CategoryExpensesService } from '../../../../../services/category-expenses.service';
import { CategorySubcategoryExpensesSelectComponent } from '../../../../../../../shared/components/get-entities/category-subcategory-expenses-select/components/category-subcategory-expenses-select.component';
import { LinkCopyBillComponent } from '../../../../common-components/link-copy-bill/link-copy-bill.component';
import { AddMonthlyFixedExpensesService } from '../../add/services/add-monthly-fixed-expenses.service';

export const AddMonthlyFixedExpensesImports: any[] = [
  CategorySubcategoryExpensesSelectComponent,
  LinkCopyBillComponent,
]

export const AddMonthlyFixedExpensesProviders: any[] = [
  AddMonthlyFixedExpensesService,
  CategoryExpensesService,
]
