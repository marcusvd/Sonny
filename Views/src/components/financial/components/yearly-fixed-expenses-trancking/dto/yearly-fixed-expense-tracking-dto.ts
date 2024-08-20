import { MyUser } from "src/components/authentication/dto/my-user";
import { CompanyDto } from "src/shared/entities-dtos/company-dto";
import { BankAccountDto } from "../../bank-account-cards/dto/bank-account-dto";
import { CardDto } from "../../bank-account-cards/dto/card-dto";
import { PixDto } from "../../bank-account-cards/dto/pix-dto";
import { YearlyFixedExpenseDto } from "../../yearly-fixed-expenses/dto/yearly-fixed-expense-dto";

export class YearlyFixedExpenseTrackingDto {
  id: number;
  companyId: number;
  company: CompanyDto;
  userId: number;
  user: MyUser;
  yearlyFixedExpenseId: number;
  yearlyFixedExpense: YearlyFixedExpenseDto;
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
  // description: string;
}
