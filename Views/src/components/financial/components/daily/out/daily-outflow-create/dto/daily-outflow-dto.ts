
import { TypePaymentDto } from "../../../../../dto/type-payment-dto";
import { CheckingAccountDto } from "../../../../../dto/checking-account-dto"
export class DailyOutFlowDto {
  id: number;
  today: Date;
  name: string;
  amount: string;
  personorplace: string;
  Typepaymentid: number;
  typepayment: TypePaymentDto;
  chekingaccountid: number;
  chekingaccount: CheckingAccountDto;
  description: string;
}
