import { RootBase } from "src/shared/entities-dtos/root-base";
import { ManufacturerDto } from "./manufacturer-dto";
import { ProductDto } from "./product-dto";

    export class SegmentDto  extends RootBase
    {
        name: string;
        productId: number;
        product: ProductDto;
        manufacturers:ManufacturerDto[];
    }