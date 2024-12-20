import { BankAccountDto } from "./bank-account-dto";

export class PixDto {
  id: number;
  key: string;
  value: string;
  bankAccountId: number;
  deleted: Date;
  bankAccount: BankAccountDto;
}
