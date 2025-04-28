import { TypeAccountDtoEnum } from "../../dto/enums/type-account-dto.enum";

export class BankAccountCardListGridDto {
  id:number;
  holder: string;
  institution: string;
  account: string;
  agency: string;
  // managerName: string;
  // managerContact: string;
  balance: string;
  cards: string;
  type:TypeAccountDtoEnum;
}
