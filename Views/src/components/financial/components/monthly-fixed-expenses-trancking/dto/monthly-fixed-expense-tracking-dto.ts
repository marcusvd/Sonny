import { MyUser } from "src/components/authentication/dto/my-user";
import { CompanyDto } from "src/shared/entities-dtos/company-dto";
import { BankAccountDto } from "../../bank-account-cards/dto/bank-account-dto";
import { CardDto } from "../../bank-account-cards/dto/card-dto";
import { PixDto } from "../../bank-account-cards/dto/pix-dto";
import { MonthlyFixedExpenseDto } from "../../monthly-fixed-expenses/dto/monthly-fixed-expense-dto";


export class MonthlyFixedExpenseTrackingDto {
  id: number;
  companyId: number;
  company: CompanyDto;
  userId: number;
  user: MyUser;
  monthlyFixedExpenseId: number;
  monthlyFixedExpense: MonthlyFixedExpenseDto;
  bankAccountId: number;
  bankAccount: BankAccountDto;
  pix: PixDto;
  pixId: number;
  othersPaymentMethods:string;
  card: CardDto;
  cardId: number;
  wasPaid: Date;
  expiration: Date;
  registered: Date = new Date();
  price: number;
  interest: number;
  deleted: boolean;
}
