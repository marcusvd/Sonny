import { RootBase } from "src/shared/entities-dtos/root-base";
import { SegmentDto } from "./segment-dto";
import { ModelDto } from "./model-dto";
import { ProductDto } from "./product";

export class ManufacturerDto extends RootBase {
    name: string;
    segmentId: number;
    segment: SegmentDto;
    models: ModelDto[];
    products: ProductDto[];
}
