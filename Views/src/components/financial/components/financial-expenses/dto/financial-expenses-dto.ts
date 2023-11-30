import { CompanyDto } from "src/shared/dtos/company-dto";
import { CyclePaymentDtoEnum } from "./cycle-payment-dto.enum";

export class FinancialExpensesDto {
    id:number;
    companyId:number;
    company:CompanyDto;
    name:string;
    expiration:Date;
    numberInstallment:number;
    cyclePayment:CyclePaymentDtoEnum;
    linkCopyBill:string;
    userLinkCopyBill:string;
    passLinkCopyBill:string;
}
