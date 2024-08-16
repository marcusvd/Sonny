import { SubcategoryExpenseDto } from "./subcategory-expense-dto";

export class CategoryExpenseDto {
  id: number;
  name: string;
  companyId:number;
  subcategoriesExpenses:SubcategoryExpenseDto[];
  deleted:boolean;
}
