import { MyUser } from "src/components/authentication/dto/my-user";

import { PartnerDto } from "src/shared/entities-dtos/main/partner/partner-dto";
import { CompanyDto } from "src/shared/entities-dtos/company-dto";
import { StatusServiceElectronicRepairEnumDto } from "./enums/status-service-electronic-repair-enum-dto";
import { CustomerDto } from "src/shared/entities-dtos/main/customer/customer-dto";

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
