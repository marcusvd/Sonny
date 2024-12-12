import { MyUser } from "src/components/authentication/dto/my-user";
import { CategoryExpenseDto } from "src/components/financial/components/common-components/category-subcategory-expenses/dto/category-expense-dto";
import { SubcategoryExpenseDto } from "src/components/financial/components/common-components/category-subcategory-expenses/dto/subcategory-expense-dto";
import { CompanyDto } from "src/shared/entities-dtos/company-dto";
import { PtBrCurrencyPipe } from "src/shared/pipes/pt-br-currency.pipe";
import { PtBrDatePipe } from "src/shared/pipes/pt-br-date.pipe";

export class ProductList {
id: string;
  productType: string;
  segment: string;
  model: string;
  manufacturer: string;
  soldPrice: string;
  isReservedByUser: string;
  isTested: string;
  isUsed: string;

}
