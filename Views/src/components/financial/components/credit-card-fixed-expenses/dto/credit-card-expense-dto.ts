import { MyUser } from "src/components/authentication/dto/my-user";
import { CompanyDto } from "src/shared/entities-dtos/company-dto";
import { CreditCardExpenseInstallmentDto } from "./credit-card-expense-installment-dto";

export class CreditCardExpenseDto {
  id: number;
  userId: number;
  user: MyUser;
  companyId: number;
  company: CompanyDto;
  registered: Date;
  deleted: boolean;
  creditCardExpensesInstallments: CreditCardExpenseInstallmentDto[];
}

