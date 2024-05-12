import { PaymentDataTypeAccountEnumDto } from "./enums/partner-payment-type-account-enum-dto";
import { PaymentDataDto } from "./payment-data-dto";

export class PartnerPaymentBankAccountDto {
  id: number;
  institution: string;
  account: string;
  agency: string;
  type: PaymentDataTypeAccountEnumDto;
  paymentDataId: number;
  paymentData: PaymentDataDto;
  description: string;
}
