import { CompanyDto } from "src/shared/entities-dtos/company-dto";
import { MonthFixedExpensesTrackingDto } from "../../month-fixed-expenses-trancking/dto/month-fixed-expenses-tracking-dto";
import { CategoryExpensesDto } from "./category-expenses-dto";
import { SubcategoryExpensesDto } from "./subcategory-expenses-dto";




export class MonthFixedExpensesDto {
  id: number;
  companyId: number;
  company: CompanyDto;
  userId: number;
  categoryExpenses: CategoryExpensesDto;
  subcategoryExpenses: SubcategoryExpensesDto;
  description: string;
  expiration: Date;
  registered: Date;
  price: number;
  linkCopyBill: string;
  userLinkCopyBill: string;
  passLinkCopyBill: string;
  deleted: boolean;
  monthFixedExpensesTrackings: MonthFixedExpensesTrackingDto[];
}
