import { RootBase } from "src/shared/entities-dtos/root-base";
import { ManufacturerDto } from "./manufacturer-dto";
import { ProductDto } from "./product";

export class ModelDto extends RootBase {
    name: string;
    speed: string;
    capacity: string;
    description: string;
    manufacturerId: number;
    manufacturer: ManufacturerDto;
    products: ProductDto[];
}