import { CompanyDto } from "src/shared/entities-dtos/company-dto";
import { CardDto } from "./card-dto";
import { TypeAccountDtoEnum } from "./enums/type-account-dto.enum";
import { PixDto } from "./pix-dto";
import { RootBase } from "src/shared/entities-dtos/root-base";

export class BankAccountDto extends RootBase  {

  holder: string;
  institution: string;
  account: string;
  agency: string;
  managerName: string;
  managerContact: string;
  balance: number;
  type:TypeAccountDtoEnum;
  description: string
  cards: CardDto[];
  pixes: PixDto[];
}


