import { MyUser } from "src/components/authentication/dto/my-user";
import { PartnerDto } from "src/components/main/partner/commons-components/dtos/partner-dto";
import { CompanyDto } from "src/shared/entities-dtos/company-dto";
import { BillingFromDto } from "./billing-from-dto";
import { DestinyDto } from "./destiny-dto";


export class CollectDeliverUpdateDto {
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
  collect: boolean;
  deliver: boolean;
  other: boolean;
  kindTransport: string;
  billingFromId: number;
  billingFrom: BillingFromDto;
  taskOverView: string;
  destinyId: number;
  destiny: DestinyDto;
}
