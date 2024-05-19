import { MyUser } from "src/components/authentication/dto/my-user";
import { BankAccountDto } from "../../bank-account-cards/dto/bank-account-dto";
import { FinancialExpensesDto } from "../../financial-expenses/dto/financial-expenses-dto";
import { PaidByDtoEnum } from "./enums/PaidByDtoEnum";

export class EssentialExpenseDto {
    id:number;
    userId:number;
    user:MyUser;
    expensesId:number;
    expenses:FinancialExpensesDto;
    bankAccountId:number;
    bankAccount:BankAccountDto;
    paidBy:PaidByDtoEnum;
    cardId:number;
    wasPaid:Date;
    entryRegister:Date = new Date();
    price:number;
    interest:number;
}
