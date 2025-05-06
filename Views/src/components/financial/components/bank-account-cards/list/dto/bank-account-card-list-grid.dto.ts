import { ItemsInterface } from "src/shared/components/list-g/list/interfaces/items-interface";
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
export class BankAccountCardListDto {
  id:ItemsInterface;
  holder: ItemsInterface;
  institution: ItemsInterface;
  account: ItemsInterface;
  agency: ItemsInterface;
  // managerName: string;
  // managerContact: string;
  balance: ItemsInterface;
  cards: ItemsInterface;
  type:ItemsInterface;
}
