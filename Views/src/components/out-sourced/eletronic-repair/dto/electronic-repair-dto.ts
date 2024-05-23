import { MyUser } from "src/components/authentication/dto/my-user";

import { CustomerDto } from "src/components/main/customer/components/commons-components/dtos/customer-dto";
import { PartnerDto } from "src/components/main/partner/commons-components/dtos/partner-dto";
import { CompanyDto } from "src/shared/entities-dtos/company-dto";
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
