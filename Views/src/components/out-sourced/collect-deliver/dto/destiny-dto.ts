import { PartnerDto } from "src/shared/entities-dtos/main/partner/partner-dto";
import { CollectDeliverDto } from "./collect-deliver-dto";
import { CustomerDto } from "src/shared/entities-dtos/main/customer/customer-dto";


export class DestinyDto {
  id: number;
  customerId: number;
 customer: CustomerDto;
  partnerId: number;
 partner: PartnerDto;
  noRegisterName: string;
  noRegisterAddress: string;
  description: string;
  collectDeliverId: number;
 //collectDeliver: CollectDeliverDto;
}
