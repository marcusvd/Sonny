
import { CheckingAccountDto } from "src/components/financial/dto/checking-account-dto";
import { TypePaymentDto } from "../../../../../dto/type-payment-dto";

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
