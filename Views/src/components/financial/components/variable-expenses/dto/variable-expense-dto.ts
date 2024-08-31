import { MyUser } from "src/components/authentication/dto/my-user";
import { BankAccountDto } from "../../bank-account-cards/dto/bank-account-dto";
import { CardDto } from "../../bank-account-cards/dto/card-dto";
import { PixDto } from "../../bank-account-cards/dto/pix-dto";
import { CategoryExpenseDto } from "src/components/financial/components/common-components/category-subcategory-expenses/dto/category-expense-dto"
import { SubcategoryExpenseDto } from "src/components/financial/components/common-components/category-subcategory-expenses/dto/subcategory-expense-dto"

import { CompanyDto } from "src/shared/entities-dtos/company-dto";
import { BaseExpenseDto } from "../../common-components/dto/base-expense-dto";
export class VariableExpenseDto extends BaseExpenseDto {
  item: string;
  place: string;
}
