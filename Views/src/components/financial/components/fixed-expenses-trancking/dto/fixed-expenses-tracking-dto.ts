import { MyUser } from "src/components/authentication/dto/my-user";
import { CompanyDto } from "src/shared/entities-dtos/company-dto";
import { BankAccountDto } from "../../bank-account-cards/dto/bank-account-dto";
import { FixedExpensesDto } from "../../fixed-expenses/dto/fixed-expenses-dto";

export class FixedExpensesTrackingDto {
  id: number;
  companyId: number;
  company: CompanyDto;
  userId: number;
  user: MyUser;
  fixedExpensesId: number;
  fixedExpenses: FixedExpensesDto;
  bankAccountId: number;
  bankAccount: BankAccountDto;
  pixId: number;
  othersPaymentMethods:string;
  cardId: number;
  wasPaid: Date;
  registered: Date = new Date();
  price: number;
  interest: number;
}
