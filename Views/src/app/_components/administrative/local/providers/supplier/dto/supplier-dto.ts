import { TypePaymentDto } from "src/app/_components/administrative/local/financial/components/type-payment/dto/type-payment-dto";
import { AddressDto } from "src/app/_shared/dtos/address-dto";
import { ContactDto } from "src/app/_shared/dtos/contact-dto";


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
