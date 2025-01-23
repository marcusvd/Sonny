import { RootBase } from "src/shared/entities-dtos/root-base";
import { ManufacturerDto } from "./manufacturer-dto";
import { ProductDto } from "./product-dto";
import { ModelDto } from "./model-dto";

export class SpecificitiesDto extends RootBase {

  name: string;
  // speedLabel: string;
  // speed: string;
  // capacityLabel: string;
  // capacity: string;
  detailedDescription: string;
  // generation: string;
  description: string;
  manufacturerLink:string;
  products: ProductDto[];

}
