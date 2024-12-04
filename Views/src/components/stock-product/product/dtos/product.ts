import { MyUser } from "src/components/authentication/dto/my-user";
import { CustomerDto } from "src/components/main/customer/components/commons-components/dtos/customer-dto";
import { PartnerDto } from "src/components/main/partner/commons-components/dtos/partner-dto";
import { RootBase } from "src/shared/entities-dtos/root-base";
import { ManufacturerDto } from "./manufacturer-dto";
import { ModelDto } from "./model-dto";
import { ProductTypeDto } from "./product-type-dto";
import { SegmentDto } from "./segment-dto";

export class ProductDto extends RootBase {
    
    productTypeId:number;
    productType: ProductTypeDto;
    segmentId:number;
    segment: SegmentDto;
    manufacturerId:number;
    manufacturer: ManufacturerDto;
    modelId:number;
    model: ModelDto;
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