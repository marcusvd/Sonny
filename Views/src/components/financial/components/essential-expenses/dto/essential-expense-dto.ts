import { MyUser } from "src/components/authentication/dto/myUser";
import { FinancialExpensesDto } from "../../financial-expenses/dto/financial-expenses-dto";
import { FinancialBankAccountDto } from "../../checking-account/dto/financial-bank-account-dto";
import { PaidByDtoEnum } from "./enums/PaidByDtoEnum";

export class EssentialExpenseDto {
    id:number;
    userId:number;
    user:MyUser;
    expensesId:number;
    expenses:FinancialExpensesDto;
    bankAccountId:number;
    bankAccount:FinancialBankAccountDto;
    paidBy:PaidByDtoEnum;
    cardId:number;
    wasPaid:Date;
    entryRegister:Date = new Date();
    price:number;
    interest:number;
}
