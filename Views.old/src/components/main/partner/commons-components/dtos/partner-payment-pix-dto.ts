import { PaymentDataDto } from "./payment-data-dto";

export class PartnerPaymentPixDto {
  id: number;
  key: string;
  value: string;
  holder: string;
  deleted: boolean;
  paymentDataId: number;
  paymentData: PaymentDataDto;

}
