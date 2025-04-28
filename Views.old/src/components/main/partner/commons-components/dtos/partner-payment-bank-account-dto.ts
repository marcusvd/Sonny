import { PaymentDataTypeAccountEnumDto } from "./enums/partner-payment-type-account-enum-dto";

export class PartnerPaymentBankAccountDto {
  id: number;
  holder: string;
  institution: string;
  account: string;
  agency: string;
  type: PaymentDataTypeAccountEnumDto;
  deleted: boolean;
  paymentDataId: number;

}
