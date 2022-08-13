
import { ClientDto } from "src/components/client/dto/client-dto";
import { PartnerDto } from "src/components/partner/dto/partner-dto";
import { TypePaymentDto } from "../../../../dto/type-payment-dto";


export class DailyInFlowDto {
  today: string;
  clientId: number;
  typepaymentId: number;
  checkingaccount: string;
  amount: number;
  description: string;
}
