import { CompanyDto } from "src/shared/entities-dtos/company-dto";
import { CategoryExpenseDto } from "../../common-components/category-subcategory-expenses/dto/category-expense-dto";
import { SubcategoryExpenseDto } from "../../common-components/category-subcategory-expenses/dto/subcategory-expense-dto";
import { BankAccountDto } from "../../bank-account-cards/dto/bank-account-dto";
import { CardDto } from "../../bank-account-cards/dto/card-dto";
import { PixDto } from "../../bank-account-cards/dto/pix-dto";
import { MyUser } from "src/components/authentication/dto/my-user";


export class FinancialSubtitleDto {
  id: number;
  name: string;
  classesStyleIcon: string;
  monthColorNameStyleClasses: string;
  visible: boolean;
}
