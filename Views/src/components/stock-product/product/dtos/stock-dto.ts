import { RootBase } from "src/shared/entities-dtos/root-base";
import { SegmentDto } from "./segment-dto";
import { ProductDto } from "./product-dto";
import { ItemProductDto } from "./item-product";

export class StockDto extends RootBase {
     ProductDto: ProductDto;
     ItemsProducts:ItemProductDto[];
}