import { RootBase } from "src/shared/entities-dtos/root-base";
import { ManufacturerDto } from "./manufacturer-dto";
import { ProductDto } from "./product-dto";
import { SpecificitiesDto } from "./specificities-dto";

export class ModelDto extends RootBase {
    name: string;
    manufacturerId: number;
    manufacturer: ManufacturerDto;
    products: ProductDto[];
    specificitiesId: number;
    specificities: SpecificitiesDto;
}