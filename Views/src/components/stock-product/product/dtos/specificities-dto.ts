import { RootBase } from "src/shared/entities-dtos/root-base";
import { ManufacturerDto } from "./manufacturer-dto";
import { ProductDto } from "./product-dto";
import { ModelDto } from "./model-dto";

export class SpecificitiesDto extends RootBase {

    name: string;
    speed: string;
    capacity: string;
    modelId: number;
    model: ModelDto;
    products: ProductDto[];
}