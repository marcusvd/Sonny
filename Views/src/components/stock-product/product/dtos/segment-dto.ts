import { RootBase } from "src/shared/entities-dtos/root-base";
import { ManufacturerDto } from "./manufacturer-dto";
import { ProductTypeDto } from "./product-type-dto";
import { ProductDto } from "./product";

    export class SegmentDto  extends RootBase
    {
        name: string;
        productTypeId: number;
        productType: ProductTypeDto;
        manufacturers:ManufacturerDto[];
        products: ProductDto[];
    }