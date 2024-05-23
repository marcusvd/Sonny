import { CompanyDto } from "src/shared/entities-dtos/company-dto";
import { CyclePaymentDtoEnum } from "./cycle-payment-dto.enum";

export class FixedExpensesDto {
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
