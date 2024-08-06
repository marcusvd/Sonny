import { MyUser } from "src/components/authentication/dto/my-user";
import { CompanyDto } from "src/shared/entities-dtos/company-dto";
import { BankAccountDto } from "../../bank-account-cards/dto/bank-account-dto";
import { CardDto } from "../../bank-account-cards/dto/card-dto";
import { PixDto } from "../../bank-account-cards/dto/pix-dto";
import { YearlyFixedExpensesDto } from "../../yearly-fixed-expenses/dto/yearly-fixed-expenses-dto";

export class YearlyFixedExpensesTrackingDto {
  id: number;
  companyId: number;
  company: CompanyDto;
  userId: number;
  user: MyUser;
  yearlyFixedExpensesId: number;
  yearlyFixedExpenses: YearlyFixedExpensesDto;
  bankAccountId: number;
  bankAccount: BankAccountDto;
  pix: PixDto;
  pixId: number;
  othersPaymentMethods:string;
  card: CardDto;
  cardId: number;
  wasPaid: Date;
  start: Date
  expiration: Date;
  registered: Date = new Date();
  price: number;
  interest: number;
  deleted: boolean;
}
