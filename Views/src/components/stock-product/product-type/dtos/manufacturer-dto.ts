import { RootBase } from "src/shared/entities-dtos/root-base";
import { SegmentDto } from "./segment-dto";
import { ModelDto } from "./model-dto";

export class ManufacturerDto extends RootBase {
    name: string;
    segmentId: number;
    segment: SegmentDto;
    models: ModelDto[];
}
