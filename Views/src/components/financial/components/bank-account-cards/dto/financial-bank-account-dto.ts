import { CompanyDto } from "src/shared/entities-dtos/company-dto";
import { FinancialCardDto } from "./financial-card-dto";
import { TypeCardDtoEnum } from "./enums/type-card-dto.enum";
import { TypeAccountDtoEnum } from "./enums/type-account-dto.enum";

export class FinancialBankAccountDto {
  id: number;
  companyId: number;
  company: CompanyDto;
  holder: string;
  institution: string;
  account: string;
  agency: string;
  managerName: string;
  managerContact: string;
  pix: string;
  balance: number;
  type:TypeAccountDtoEnum;
  cards: FinancialCardDto[];
  description: string
}


