import { AddressDto } from "src/shared/dtos/address-dto";
import { ContactDto } from "src/shared/dtos/contact-dto";



export class PartnerDto {
  id: number;
  name: string;
  registered: Date;
  cnpj: string;
  responsible: string;
  comments: string;
  businessline: string;
  hardwareSupplier: boolean;
  transporter: boolean;
  eletronicRepair: boolean;
  address: AddressDto;
  contact: ContactDto;
  // inventories: InventoryDto[];
  // transportercollectdelivers: CollectDeliverDto[];
  // sourcecollectdelivers: CollectDeliverDto[];
  // destinycollectdelivers: CollectDeliverDto[];



}
