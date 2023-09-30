import { ProductDto } from "./product-dto";

export class EquipamentTypeDto {
  id: number;
  name: string;
  companyId:number;
  products: ProductDto[];
}
