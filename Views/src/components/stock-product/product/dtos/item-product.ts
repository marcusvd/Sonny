import { RootBase } from "src/shared/entities-dtos/root-base";
import { SegmentDto } from "./segment-dto";
import { PartnerDto } from "src/components/main/partner/commons-components/dtos/partner-dto";
import { StockDto } from "./stock-dto";
import { MyUser } from "src/components/authentication/dto/my-user";
import { CustomerDto } from "src/components/main/customer/components/commons-components/dtos/customer-dto";

export class ItemProductDto extends RootBase {
    
    stockId: number;
    stock: StockDto;
    isReservedByUserId: number;
    isReservedByUser: MyUser;
    isReserved: Date;
    reservedForCustomerId: number;
    reservedForCustomer: CustomerDto;
    supplierId: number;
    supplier: PartnerDto;
    usedHistoricalOrSupplier: string;
    purchaseInvoiceNumber: string;
    costPrice: number;
    soldPrice: number;
    entryDate: Date;
    soldDate: Date;
    warrantyEnd: Date;
    warrantyEndLocal: Date;
    isUsed: boolean;
    isTested: Date;
}