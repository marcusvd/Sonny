import { CompanyDto } from "src/shared/entities-dtos/company-dto";
import { CategoryExpenseDto } from "../../common-components/category-subcategory-expenses/dto/category-expense-dto";
import { SubcategoryExpenseDto } from "../../common-components/category-subcategory-expenses/dto/subcategory-expense-dto";
import { BankAccountDto } from "../../bank-account-cards/dto/bank-account-dto";
import { CardDto } from "../../bank-account-cards/dto/card-dto";
import { PixDto } from "../../bank-account-cards/dto/pix-dto";
import { MyUser } from "src/components/authentication/dto/my-user";


export class BaseExpenseDto {
  id :number;
  name :string;
  userId :number;
  user :MyUser;
  companyId :number;
  company :CompanyDto;
  categoryExpenseId :number;
  categoryExpense :CategoryExpenseDto;
  subcategoryExpenseId :number;
  subcategoryExpense :SubcategoryExpenseDto;
  bankAccountId :number;
  bankAccount :BankAccountDto;
  deleted :boolean;
  cardId :number;
  card :CardDto;
  pixId :number;
  pix :PixDto;
  price :number;
  interest :number;
  expires :Date;
  registered :Date;
  wasPaid :Date;
  othersPaymentMethods :string;
  documento :string;
  description :string;
  linkCopyBill :string;
  userLinkCopyBill :string;
  passLinkCopyBill :string;
}