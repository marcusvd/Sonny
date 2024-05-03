import { CompanyDto } from "src/shared/entities-dtos/company-dto";

export class TableProvidedServicesPricesDto {
  id: number;
  companyId: number;
  company: CompanyDto;
  serviceName: string;
  priceService: number;
}
