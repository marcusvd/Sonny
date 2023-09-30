import { MyUser } from "src/components/authentication/dto/myUser";
import { CustomerDto } from "src/components/main/customer/dtos/customer-dto";
import { CompanyDto } from "src/shared/dtos/company-dto";
import { ServiceDto } from "./Service-dto";
import { StatusServiceEnumDto } from "./enums/status-service-enum-dto";
import { CollectDeliverCostsDto } from "./collect-deliver-costs-dto";

export class TableProvidedServicesPricesDto {
  id: number;
  companyId: number;
  company: CompanyDto;
  serviceName: string;
  priceService: number;
}
