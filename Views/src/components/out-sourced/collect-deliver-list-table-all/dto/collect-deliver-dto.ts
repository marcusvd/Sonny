import { CustomerDto } from "src/components/customer/dto/customer-dto";
import { CompanyDto } from "src/shared/dtos/company-dto";
import { PartnerDto } from "../../../partner/dto/partner-dto";

export class CollectDeliverDto {
  id: number;

  transporterNoregisterd: string;

  transporterId: number;
  transporter: PartnerDto;
  subject: string;
  //SOURCE
  sourceClientId: number;
  sourceClient: CustomerDto;
  sourcePartnerId: number;
  sourcePartner: PartnerDto;
  sourceCompanyId: number;
  sourceCompany: CompanyDto;
  sourceNoRegisterName: string;
  sourceNoRegisterAddress: string;

  //DESTINY
  destinyClientId: number;
  destinyClient: CustomerDto;
  destinyPartnerId: number;
  destinyPartner: PartnerDto;
  destinyCompanyId: number;
  destinyCompany: CompanyDto;
  destinyNoRegisterName: string;
  destinyNoRegisterAddress: string;

  start: Date;
  price: number;
  items: string;
  comments: string;
}
