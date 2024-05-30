import { CompanyDto } from "src/shared/entities-dtos/company-dto";
import { FixedExpensesTrackingDto } from "../../fixed-expenses-trancking/dto/fixed-expenses-tracking-dto";
import { CyclePaymentDtoEnum } from "./cycle-payment-dto.enum";

export class FixedExpensesDto {
  id: number;
  companyId: number;
  company: CompanyDto;
  name: string;
  nameIdentification: string;
  expiration: Date;
  registered: Date;
  price: number;
  cyclePayment: CyclePaymentDtoEnum;
  linkCopyBill: string;
  userLinkCopyBill: string;
  passLinkCopyBill: string;
  fixedExpensesTrackings: FixedExpensesTrackingDto[];


}
