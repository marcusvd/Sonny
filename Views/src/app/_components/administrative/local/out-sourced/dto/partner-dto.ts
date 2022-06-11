import { AddressDto } from "src/app/_shared/dtos/address-dto";
import { ContactDto } from "src/app/_shared/dtos/contact-dto";

export class PartnerDto {
  id: number;
  name: string;
  today: Date;
  cnpj: string;
  responsible: string;
  comments: string;
  businessline: string;
  addressId: number;
  address: AddressDto;
  contactId: number;
  contact: ContactDto;
}
