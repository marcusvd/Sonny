import { MyUser } from "src/components/authentication/dto/myUser";
import { CustomerDto } from "src/components/main/customer/dto/customer-dto";
import { CompanyDto } from "src/shared/dtos/company-dto";
import { PriceDto } from "./price-dto";

export class ServiceDto
{
    id:number;
    userId:number;
    user:MyUser;
    executedServicesComments:string;
    isAuthorized:Date;
    started:Date;
    finished:Date;
    prices:PriceDto[];
}
