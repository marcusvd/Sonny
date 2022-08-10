
import { ClientDto } from "src/components/administrative/client/dto/client-dto";
import { PartnerDto } from "src/components/administrative/local/out-sourced/dto/partner-dto";
import { TypePaymentDto } from "../../../type-payment/dto/type-payment-dto";


export class DailyInFlowDto {
  today: string;
  clientId: number;
  typepaymentId: number;
  checkingaccount: string;
  amount: number;
  description: string;
}
