import { PayCycleEnumDto } from "./pay-cycle-enum-dto";
import { SubcategoryExpenseDto } from "./subcategory-expense-dto";

export class CategoryExpenseDto {
  id: number;
  name: string;
  companyId: number;
  subcategoriesExpenses: SubcategoryExpenseDto[];
  payCycle: PayCycleEnumDto;
  deleted: boolean;
}
