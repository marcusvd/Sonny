import { MyUser } from "src/components/authentication/dto/my-user";
import { BankAccountDto } from "../../bank-account-cards/dto/bank-account-dto";
import { CardDto } from "../../bank-account-cards/dto/card-dto";
import { PixDto } from "../../bank-account-cards/dto/pix-dto";
import { CategoryExpenseDto } from "src/components/financial/components/common-components/category-subcategory-expenses/dto/category-expense-dto"
import { SubcategoryExpenseDto } from "src/components/financial/components/common-components/category-subcategory-expenses/dto/subcategory-expense-dto"

import { CompanyDto } from "src/shared/entities-dtos/company-dto";
export class VariableExpenseDto {
  id: number;

  userId: number;
  user: MyUser;

  companyId:number;
  company:CompanyDto;

  categoryExpenseId:number;
  categoryExpense:CategoryExpenseDto;

  subcategoryExpenseId:number;
  subcategoryExpense:SubcategoryExpenseDto;

  bankAccountId: number;
  bankAccount: BankAccountDto;

  cardId: number;
  card: CardDto;

  pixId: number;
  pix: PixDto;

  othersPaymentMethods: string;

  item: string;

  place: string;

  paidDay: Date;

  registered: Date;

  price: number;

  description: string;
}
