import { MyUser } from "src/components/authentication/dto/myUser";
import { CustomerDto } from "src/components/main/customer/dtos/customer-dto";
import { PartnerDto } from "src/components/main/partner/dto/partner-dto";
import { CompanyDto } from "src/shared/dtos/company-dto";
import { StatusServiceElectronicRepairEnumDto } from "./enums/status-service-electronic-repair-enum-dto";

    export class ElectronicRepairDto
    {
        id:number;
        companyId:number;
        company:CompanyDto;
        userId:number;
        user:MyUser;
        item:string;
        entryDate:Date;
        description:string;
        problem:string;
        userEquipament:string;
        passwordEquipament:string;
        price:number;
        serviceProviderId:number;
        serviceProvider:PartnerDto;
        customerId:number;
        customer:CustomerDto;
        solutionApplied:string;
        status:StatusServiceElectronicRepairEnumDto;

    }
