import { PaymentDataDto } from "./payment-data-dto";

export class PartnerPaymentPixDto {
  id: number;
  key: string;
  value: string;
  holder: string;
  paymentDataId: number;
  paymentData: PaymentDataDto;

}
