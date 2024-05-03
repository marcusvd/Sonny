import { MyUser } from "src/components/authentication/dto/my-user";
import { CompanyDto } from "src/shared/entities-dtos/company-dto";
import { ServiceDto } from "./Service-dto";
import { CollectDeliverCostsDto } from "./collect-deliver-costs-dto";
import { IStatusService } from "./interfaces/i-status-service";
import { CustomerDto } from "src/shared/entities-dtos/main/customer/customer-dto";


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
