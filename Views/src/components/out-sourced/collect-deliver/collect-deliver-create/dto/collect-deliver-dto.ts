import { MyUser } from "src/components/authentication/dto/myUser";
import { PartnerDto } from "src/components/main/partner/dto/partner-dto";
import { CompanyDto } from "src/shared/dtos/company-dto";
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
  subjectReason: string;
  contactName: string;
  start: Date;
  price: number;
  collect: boolean;
  deliver: boolean;
  other: boolean;
  billingFrom: BillingFromDto;
  taskOverView: string;
  destiny: DestinyDto;
}
