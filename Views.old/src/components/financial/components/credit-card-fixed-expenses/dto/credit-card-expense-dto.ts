import { RootBase } from "src/shared/entities-dtos/root-base";
import { CardDto } from "../../bank-account-cards/dto/card-dto";
import { CreditCardLimitOperationDto } from "../../bank-account-cards/dto/credit-card-limit-operation-dto";
import { CategoryExpenseDto } from "../../common-components/category-subcategory-expenses/dto/category-expense-dto";
import { SubcategoryExpenseDto } from "../../common-components/category-subcategory-expenses/dto/subcategory-expense-dto";
import { CreditCardExpenseInvoiceDto } from "./credit-card-expense-invoice-dto";

export class CreditCardExpenseDto extends RootBase {
    name: string;
    categoryExpenseId:number;
    categoryExpense: CategoryExpenseDto;
    subcategoryExpenseId:number;
    subcategoryExpense:SubcategoryExpenseDto;
    cardId: number;
    card: CardDto;
    price: number;
    interest: number;
    expires: Date;
    wasPaid: Date;
    othersPaymentMethods: string;
    document: string;
    description: string;
    installmentsQuantity: number;
    totalPriceInterest: number;
    totalPercentageInterest: number;
    paymentAtSight: number;
    installmentPrice: number;
    currentInstallment: string;
    creditCardLimitOperation: CreditCardLimitOperationDto;
    creditCardExpenseInvoiceId: number;
    creditCardExpenseInvoice: CreditCardExpenseInvoiceDto;
    expenseDay: Date;
}
