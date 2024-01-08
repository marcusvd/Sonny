import { MyUser } from "src/components/authentication/dto/myUser";
import { CompanyDto } from "src/shared/dtos/company-dto";
import { FinancialBankAccountDto } from "../../bank-account/dto/financial-bank-account-dto";
import { FinancialExpensesDto } from "../../financial-expenses/dto/financial-expenses-dto";
import { PaidByDtoEnum } from "../../essential-expenses/dto/enums/PaidByDtoEnum";


export class FinancialExpensesNotPredictableDto {
  id: number;
  userId: number;
  user: MyUser;
  bankAccountId: number;
  bankAccount: FinancialBankAccountDto;
  paidBy: PaidByDtoEnum;
  itemOrPlaceName: string;
  daySpent: Date;
  entryRegister: Date;
  price: number;
  description: string;
}
