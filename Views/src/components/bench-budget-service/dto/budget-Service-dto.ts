import { MyUser } from "src/components/authentication/dto/myUser";
import { CustomerDto } from "src/components/main/customer/dtos/customer-dto";
import { CompanyDto } from "src/shared/dtos/company-dto";
import { ServiceDto } from "./Service-dto";
import { IStatusService } from "./interfaces/i-status-service";
import { CollectDeliverCostsDto } from "./collect-deliver-costs-dto";


export class BudgetServiceDto
{
    id:number ;
    companyId:number ;
    company:CompanyDto ;
    userId:number ;
    user:MyUser ;
    customerId:number ;
    customer:CustomerDto ;
    problemAccordingCustomer:string ;
    isPresentVisuallyDescription:string ;
    executionMode:number;
    dataDescription:string ;
    entryDate:Date ;
    budgetOpen:Date ;
    service:ServiceDto ;
    collectsDeliversCosts:CollectDeliverCostsDto ;
    statusService:IStatusService ;
}
