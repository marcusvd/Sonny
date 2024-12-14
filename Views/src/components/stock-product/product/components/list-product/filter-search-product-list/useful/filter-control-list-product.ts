import { Observable, of } from "rxjs";

import { MatCheckboxChange } from '@angular/material/checkbox';
import { List } from 'src/shared/components/inheritance/list/list';
import { ProductTypeDto } from "src/components/stock-product/product/dtos/product-type-dto";
import { SegmentDto } from "src/components/stock-product/product/dtos/segment-dto";
import { ManufacturerDto } from "src/components/stock-product/product/dtos/manufacturer-dto";
import { ModelDto } from "src/components/stock-product/product/dtos/model-dto";
import { map } from "rxjs/operators";
import { BaseList } from "src/shared/components/list-g/extends/base-list";


export class FilterControlListProduct extends BaseList{


}
