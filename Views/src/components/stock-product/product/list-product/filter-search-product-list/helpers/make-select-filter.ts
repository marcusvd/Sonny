import { of } from "rxjs";


import { ManufacturerDto } from "src/components/stock-product/product/dtos/manufacturer-dto";
import { SegmentDto } from "src/components/stock-product/product/dtos/segment-dto";


export const makeFilterSelectBySegment = (segments: SegmentDto[]) => {
  const noDuplicate = Array.from(new Set(segments.map(x => x.name.toLowerCase())));
  const segmentsNew: SegmentDto[] = [];
  noDuplicate.forEach((x, i) => {
    const segment = new SegmentDto();
    segment.id = i;
    segment.name = x;
    segmentsNew.push(segment)
  })
  return of(segmentsNew);
}

export const makeFilterSelectByManufacturer = (manufacturers: ManufacturerDto[]) => {
  const noDuplicate = Array.from(new Set(manufacturers.map(x => x.name.toLowerCase())));
  const manufacturersNew: ManufacturerDto[] = [];
  noDuplicate.forEach((x, i) => {
    const manufacturer = new ManufacturerDto();
    manufacturer.id = i;
    manufacturer.name = x;
    manufacturersNew.push(manufacturer)
  })
  return of(manufacturersNew);
}
