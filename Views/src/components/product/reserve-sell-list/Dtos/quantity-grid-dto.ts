import { CustomerDto } from "src/components/main/customer/dtos/customer-dto";
import { ProductDto } from "../../dtos/product-dto";
import { PartnerDto } from "src/components/main/partner/dto/partner-dto";
import { MyUser } from "src/components/authentication/dto/myUser";

export class QuantityGridDto {
  id: number;
  sn: string;
  nfNumber: string;
  costPrice: number;
  soldPrice: string;
  entryDate: Date;
  soldDate: Date;
  warrantyEnd: Date;
  isUsed: string;
  isTested: string;
  isReserved: Date;
  usedHistorical: string;
  customerId: number;
  customer: CustomerDto;
  productId: number;
  product: ProductDto;
  supplierId: number;
  supplier: PartnerDto;
  reservedByUserId: number;
  reservedByUser: MyUser;
}
