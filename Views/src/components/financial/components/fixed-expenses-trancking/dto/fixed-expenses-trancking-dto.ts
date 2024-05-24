import { MyUser } from "src/components/authentication/dto/my-user";
import { BankAccountDto } from "../../bank-account-cards/dto/bank-account-dto";

import { FixedExpensesDto } from "../../fixed-expenses/dto/fixed-expenses-dto";
import { PaidByDtoEnum } from "./enums/PaidByDtoEnum";

export class EssentialExpenseDto {
    id:number;
    userId:number;
    user:MyUser;
    expensesId:number;
    expenses:FixedExpensesDto;
    bankAccountId:number;
    bankAccount:BankAccountDto;
    paidBy:PaidByDtoEnum;
    cardId:number;
    wasPaid:Date;
    entryRegister:Date = new Date();
    price:number;
    interest:number;
}
