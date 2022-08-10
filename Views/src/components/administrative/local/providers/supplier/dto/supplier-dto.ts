import { TypePaymentDto } from "src/components/administrative/local/financial/components/type-payment/dto/type-payment-dto";
import { AddressDto } from "src/shared/dtos/address-dto";
import { ContactDto } from "src/shared/dtos/contact-dto";


export class SupplierDto {
  id: number;
  name: string;
  seller: string;
  description: string;
  operation: string;
  addressId: number;
  address: AddressDto;
  contactId: number;
  contact: ContactDto;
  typespayments: TypePaymentDto[];
  toSeach:string;
}
