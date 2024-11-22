import { RootBase } from "src/shared/entities-dtos/root-base";
import { SegmentDto } from "./segment-dto";

export class ProductDto extends RootBase {
    name: string;
    segments: SegmentDto[];
}