import { SubCategoryDto } from "./sub-category-dto";

export class CategoryDto {
  id: number;
  name: string;
  subcategories: SubCategoryDto[];
}
