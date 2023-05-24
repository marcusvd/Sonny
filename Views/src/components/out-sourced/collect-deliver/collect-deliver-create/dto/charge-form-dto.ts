import { CustomerDto } from "src/components/customer/dto/customer-dto";
import { PartnerDto } from "src/components/partner/dto/partner-dto";


export class ChargeFormDto {
   partnerId:number;
   customerId: number;
   base:boolean;
}
