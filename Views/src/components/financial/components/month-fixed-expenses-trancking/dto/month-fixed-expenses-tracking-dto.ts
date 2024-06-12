import { MyUser } from "src/components/authentication/dto/my-user";
import { CompanyDto } from "src/shared/entities-dtos/company-dto";
import { BankAccountDto } from "../../bank-account-cards/dto/bank-account-dto";
import { MonthFixedExpensesDto } from "../../month-fixed-expenses/dto/month-fixed-expenses-dto";

export class MonthFixedExpensesTrackingDto {
  id: number;
  companyId: number;
  company: CompanyDto;
  userId: number;
  user: MyUser;
  monthFixedExpensesId: number;
  monthFixedExpenses: MonthFixedExpensesDto;
  bankAccountId: number;
  bankAccount: BankAccountDto;
  pixId: number;
  othersPaymentMethods:string;
  cardId: number;
  wasPaid: Date;
  expiration: Date;
  registered: Date = new Date();
  price: number;
  interest: number;
  deleted: boolean;
}
