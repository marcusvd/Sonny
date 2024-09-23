import { PayCycleEnumDto } from "./pay-cycle-enum-dto";

export class SubcategoryExpenseDto {
  id: number;
  name: string;
  payCycle: PayCycleEnumDto;
  categoryExpensesId:number;
  deleted:boolean;
}
