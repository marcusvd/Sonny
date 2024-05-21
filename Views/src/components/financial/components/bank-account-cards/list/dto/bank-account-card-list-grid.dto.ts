import { TypeAccountDtoEnum } from "../../dto/enums/type-account-dto.enum";

export class BankAccountCardListGridDto {
  holder: string;
  institution: string;
  account: string;
  agency: string;
  managerName: string;
  managerContact: string;
  balance: string;
  type:TypeAccountDtoEnum;
}
