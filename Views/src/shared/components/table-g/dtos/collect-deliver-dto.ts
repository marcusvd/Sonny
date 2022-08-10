import { CompanyDto } from "./company-dto";
import { ClientDto } from "./client-dto";
import { PartnerDto } from "./partner-dto";

export class CollectDeliverDto {
  id: number;

  transporterNoregisterd: string;

  transporterId: number;
  transporter: PartnerDto;
  subject: string;
  //SOURCE
  sourceClientId: number;
  sourceClient: ClientDto;
  sourcePartnerId: number;
  sourcePartner: PartnerDto;
  sourceCompanyId: number;
  sourceCompany: CompanyDto;
  sourceNoRegisterName: string;
  sourceNoRegisterAddress: string;

  //DESTINY
  destinyClientId: number;
  destinyClient: ClientDto;
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
