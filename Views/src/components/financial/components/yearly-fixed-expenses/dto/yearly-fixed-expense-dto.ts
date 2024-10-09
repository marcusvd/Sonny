import { BaseExpenseDto } from "../../common-components/dto/base-expense-dto";

export class YearlyFixedExpenseDto extends BaseExpenseDto{
  start:Date;
  autoRenew:boolean;
}
