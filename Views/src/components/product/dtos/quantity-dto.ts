import { ProductDto } from "./product-dto";
import { PartnerDto } from "src/shared/entities-dtos/main/partner/partner-dto";
import { MyUser } from "src/components/authentication/dto/my-user";
import { CustomerDto } from "src/shared/entities-dtos/main/customer/customer-dto";

export class QuantityDto {
  id: number;
  sn: string;
  nfNumber: string;
  costPrice: number;
  soldPrice: number;
  entryDate: Date;
  soldDate: Date;
  warrantyEnd: Date;
  warrantyEndLocal: Date;
  isUsed: boolean;
  isTested: boolean;
  isReserved: Date;
  usedHistorical: string;
  customerId: number;
  customer: CustomerDto;
  productId: number;
  product: ProductDto;
  supplierId: number;
  supplier: PartnerDto;
  reservedOrSoldByUserId: number;
  reservedOrSoldByUser: MyUser;
}
