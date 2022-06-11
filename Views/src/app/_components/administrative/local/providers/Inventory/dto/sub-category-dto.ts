import { CategoryDto } from "./category-dto";

export class SubCategoryDto {
  id: number;
  name: string;
  categoryId:number;
  category:CategoryDto;
}
