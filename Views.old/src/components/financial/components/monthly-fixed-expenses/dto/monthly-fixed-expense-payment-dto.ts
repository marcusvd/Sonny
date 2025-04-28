import { PixExpenseDto } from "../../pix-expenses/dto/pix-expense-dto";

export class MonthlyFixedExpensePaymentDto {
    id: number;
    userId: number;
    companyId: number;
    bankAccountId: number;
    cardId: number;
    pixId: number;
    othersPaymentMethods: string;
    pixExpense: PixExpenseDto;
    expires: Date;
    price: number;
    interest: number;
}
