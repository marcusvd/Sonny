import { RootBase } from "src/shared/entities-dtos/root-base";
import { SegmentDto } from "./segment-dto";
import { ProductDto } from "./product-dto";

export class ProductTypeDto extends RootBase {
    name: string;
    segments: SegmentDto[];
    products: ProductDto[];
}