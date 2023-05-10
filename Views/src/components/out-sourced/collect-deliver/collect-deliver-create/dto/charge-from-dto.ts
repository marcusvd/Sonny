import { CustomerDto } from "src/components/customer/dto/customer-dto";
import { PartnerDto } from "src/components/partner/dto/partner-dto";


export class ChargeFrom {
   id:number;
   partner: PartnerDto;
   customer: CustomerDto;
   base:boolean;
   comments:string;
}
