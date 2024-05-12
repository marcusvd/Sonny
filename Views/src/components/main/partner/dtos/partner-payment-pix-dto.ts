import { PaymentDataDto } from "./payment-data-dto";

export class PartnerPaymentPixDto {
  id: number;
  key: string;
  value: string;
  paymentDataId: number;
  paymentData: PaymentDataDto;

}
