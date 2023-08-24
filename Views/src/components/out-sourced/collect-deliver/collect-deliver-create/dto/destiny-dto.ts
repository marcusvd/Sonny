import { CustomerDto } from "src/components/main/customer/dtos/customer-dto";
import { PartnerDto } from "src/components/main/partner/dto/partner-dto";
import { CollectDeliverDto } from "./collect-deliver-dto";


export class DestinyDto {
  id: number;
  customerId: number;
  customer: CustomerDto;
  partnerId: number;
  partner: PartnerDto;
  noRegisterName: string;
  noRegisterAddress: string;
  Price: number;
  collect: boolean;
  deliver: boolean;
  description: string;
  collectDeliverId: number;
  collectDeliver: CollectDeliverDto;
}
