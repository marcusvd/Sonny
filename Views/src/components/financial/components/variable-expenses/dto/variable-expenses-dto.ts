import { MyUser } from "src/components/authentication/dto/my-user";
import { BankAccountDto } from "../../bank-account-cards/dto/bank-account-dto";
import { CardDto } from "../../bank-account-cards/dto/card-dto";
import { PixDto } from "../../bank-account-cards/dto/pix-dto";
import { CategoryExpensesDto } from "./category-expenses-dto";
import { SubcategoryExpensesDto } from "./subcategory-expenses-dto";
import { CompanyDto } from "src/shared/entities-dtos/company-dto";

export class VariableExpensesDto {
  id: number;
  
  userId: number;
  user: MyUser;

  companyId:number;
  company:CompanyDto;

  categoryExpensesId:number;
  categoryExpenses:CategoryExpensesDto;

  subcategoryExpensesId:number;
  subcategoryExpenses:SubcategoryExpensesDto;

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
