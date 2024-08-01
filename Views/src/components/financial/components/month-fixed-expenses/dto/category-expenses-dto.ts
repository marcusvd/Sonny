import { SubcategoryExpensesDto } from "./subcategory-expenses-dto";



export class CategoryExpensesDto {
  id: number;
  name: string;
  companyId:number;
  subcategoriesExpenses:SubcategoryExpensesDto[];
  deleted:boolean;
}
