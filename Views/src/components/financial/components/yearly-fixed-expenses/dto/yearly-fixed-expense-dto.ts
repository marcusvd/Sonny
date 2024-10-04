import { BaseExpenseDto } from "../../common-components/dto/base-expense-dto";

export class YearlyFixedExpenseDto extends BaseExpenseDto{
  start:Date;
  installmentNumber:number;
  autoRenew:boolean;
}
