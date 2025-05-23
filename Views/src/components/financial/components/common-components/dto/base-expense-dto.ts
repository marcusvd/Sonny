import { MyUser } from "src/components/authentication/dto/my-user";
import { CompanyDto } from "src/shared/entities-dtos/company-dto";
import { BankAccountDto } from "../../bank-account-cards/dto/bank-account-dto";
import { CardDto } from "../../bank-account-cards/dto/card-dto";
import { PixDto } from "../../bank-account-cards/dto/pix-dto";
import { CategoryExpenseDto } from "../../common-components/category-subcategory-expenses/dto/category-expense-dto";
import { SubcategoryExpenseDto } from "../../common-components/category-subcategory-expenses/dto/subcategory-expense-dto";
import { PixExpenseDto } from "../../pix-expenses/dto/pix-expense-dto";
import { RootBase } from "../../../../../shared/entities-dtos/root-base";


export class BaseExpenseDto extends RootBase {
  name :string;
  categoryExpenseId :number;
  categoryExpense :CategoryExpenseDto;
  subcategoryExpenseId :number;
  subcategoryExpense :SubcategoryExpenseDto;
  bankAccountId :number;
  bankAccount :BankAccountDto;
  cardId :number;
  card :CardDto;
  pixExpense:PixExpenseDto;
  pixId :number;
  pix :PixDto;
  price :number;
  interest :number;
  expires :Date;
  wasPaid :Date;
  othersPaymentMethods :string;
  document :string;
  description :string;
  linkCopyBill :string;
  userLinkCopyBill :string;
  passLinkCopyBill :string;
}
