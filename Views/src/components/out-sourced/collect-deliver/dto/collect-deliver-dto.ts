import { MyUser } from "../../../../components/authentication/dto/my-user";
import { PartnerDto } from "../../../../components/main/partner/dtos/partner-dto";
import { CompanyDto } from "../../../../shared/entities-dtos/company-dto";
import { BillingFromDto } from "./billing-from-dto";
import { DestinyDto } from "./destiny-dto";


export class CollectDeliverDto {
  id: number;
  companyId: number;
  company: CompanyDto;
  userId: number;
  user: MyUser;
  transporterId: number;
  transporter: PartnerDto;
  // subjectReason: string;
  contactName: string;
  start: Date;
  price: number;
  collect: Date;
  deliver: Date;
  other: Date;
  wasPaid: Date;
  kindTransport: string;
  billingFromId: number;
  billingFrom: BillingFromDto;
  taskOverView: string;
  destinyId: number;
  destiny: DestinyDto;
}
