import { CompanyDto } from "src/shared/entities-dtos/company-dto";
import { CardDto } from "./card-dto";
import { TypeAccountDtoEnum } from "./enums/type-account-dto.enum";
import { PixDto } from "./pix-dto";

export class BankAccountDto {
  id: number;
  companyId: number;
  company: CompanyDto;
  holder: string;
  institution: string;
  account: string;
  agency: string;
  managerName: string;
  managerContact: string;
  balance: number;
  type:TypeAccountDtoEnum;
  cards: CardDto[];
  pixes: PixDto[];
  description: string
}


