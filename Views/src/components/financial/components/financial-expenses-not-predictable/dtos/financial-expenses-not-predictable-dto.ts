import { MyUser } from "src/components/authentication/dto/my-user";
import { BankAccountDto } from "../../bank-account-cards/dto/bank-account-dto";
import { PaidByDtoEnum } from "../../essential-expenses/dto/enums/PaidByDtoEnum";


export class FinancialExpensesNotPredictableDto {
  id: number;
  userId: number;
  user: MyUser;
  bankAccountId: number;
  bankAccount: BankAccountDto;
  paidBy: PaidByDtoEnum;
  itemOrPlaceName: string;
  daySpent: Date;
  entryRegister: Date;
  price: number;
  description: string;
}
