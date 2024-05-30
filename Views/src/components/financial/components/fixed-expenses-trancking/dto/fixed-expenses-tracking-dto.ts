import { MyUser } from "src/components/authentication/dto/my-user";
import { CompanyDto } from "src/shared/entities-dtos/company-dto";
import { BankAccountDto } from "../../bank-account-cards/dto/bank-account-dto";
import { FixedExpensesDto } from "../../fixed-expenses/dto/fixed-expenses-dto";
import { PaidByDtoEnum } from "./enums/paid-by-dto-enum";

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
  paidBy: PaidByDtoEnum;
  cardId: number;
  wasPaid: Date;
  registered: Date = new Date();
  price: number;
  interest: number;
}
