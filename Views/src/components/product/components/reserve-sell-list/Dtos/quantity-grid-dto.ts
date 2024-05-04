
import { ProductDto } from "../../../dtos/product-dto";
import { PartnerDto } from "src/shared/entities-dtos/main/partner/partner-dto";
import { MyUser } from "src/components/authentication/dto/my-user";
import { CustomerDto } from "src/shared/entities-dtos/main/customer/customer-dto";

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
