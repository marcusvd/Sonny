import { ProductDto } from "./product-dto";

export class EquipamentTypeDto {
  id: number;
  name: string;
  products: ProductDto[];
}
