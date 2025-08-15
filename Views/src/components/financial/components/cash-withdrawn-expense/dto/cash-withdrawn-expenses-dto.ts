import { RootBase } from "../../../../../shared/entities-dtos/root-base";
import { BankAccountDto } from "../../bank-account-cards/dto/bank-account-dto";

export class CashWithdrawnExpenseDto extends RootBase {
  name: string;
  categoryExpenseId: number;
  subcategoryExpenseId: number;
  bankAccountId: number;
  bankAccount: BankAccountDto;
  place: string;
  withdrawnOn: Date;
  price: number;
  description: string;
}
