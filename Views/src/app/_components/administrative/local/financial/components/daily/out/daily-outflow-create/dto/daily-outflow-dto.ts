
import { TypePaymentDto } from "../../../../type-payment/dto/type-payment-dto";
import { CheckingAccountDto } from "../../../../checking-account/dto/checking-account-dto"
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
