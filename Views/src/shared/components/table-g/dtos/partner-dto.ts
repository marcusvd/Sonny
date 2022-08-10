import { AddressDto } from "./address-dto";
import { ContactDto } from "./contact-dto";
import { InventoryDto } from "./inventory-dto";
import { CollectDeliverDto } from "./collect-deliver-dto";

export class PartnerDto {
   id:number;
   name:string;
   today:Date;
   cnpj:string;
   responsible:string;
   comments:string;
   businessline:string;
   transporter:boolean;
   supplier:boolean;
   address:AddressDto;
   addressid:number;
   contact:ContactDto;
   contactid:number;
   inventories:InventoryDto[];
   transportercollectdelivers:CollectDeliverDto[];
   sourcecollectdelivers:CollectDeliverDto[];
   destinycollectdelivers:CollectDeliverDto[];



}
