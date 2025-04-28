import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ManufacturerDto } from "src/components/stock-product/product/dtos/manufacturer-dto";
import { ModelDto } from "src/components/stock-product/product/dtos/model-dto";
import { SegmentDto } from "src/components/stock-product/product/dtos/segment-dto";
import { BaseForm } from "src/shared/components/inheritance/forms/base-form";
import { UpdateProductTypeService } from "../services/update-product-type.service";


@Injectable({ providedIn: 'root' })
export class ValidatorsProductTypeEditAsyncField extends BaseForm {

    constructor(private _updateProductTypeService: UpdateProductTypeService) {
        super()
    }

    validateSegmentAsync(productTypeId: number): AsyncValidatorFn {

        return (control: AbstractControl): Observable<ValidationErrors | null> => {

            return this._updateProductTypeService.getAllSegments$(this.companyId).pipe(
                map((x: SegmentDto[]) => {

                    const segmentByProductTypeId = x.filter(y => y.productTypeId == productTypeId);

                    const segment = segmentByProductTypeId.find(y => this.removeAccentsSpecialCharacters(y.name.toLowerCase()) === this.removeAccentsSpecialCharacters(control.value.toLowerCase().trim()));
                   
                    return segment ? { inUse: true } : null;
                })
            )

        };
    }


    validateManufacturerAsync(segmentId: number): AsyncValidatorFn {

        return (control: AbstractControl): Observable<ValidationErrors | null> => {

            return this._updateProductTypeService.getAllManufacturers$(this.companyId).pipe(
                map((x: ManufacturerDto[]) => {

                    const manufacturerByProductTypeId = x.filter(y => y.segmentId == segmentId);

                    const manufacturer = manufacturerByProductTypeId.find(y => this.removeAccentsSpecialCharacters(y.name.toLowerCase()) === this.removeAccentsSpecialCharacters(control.value.toLowerCase().trim()));
                   
                    return manufacturer ? { inUse: true } : null;
                })
            )
            
        };
    }

    validateModelAsync(manufacturerId: number): AsyncValidatorFn {

        return (control: AbstractControl): Observable<ValidationErrors | null> => {

            return this._updateProductTypeService.getAllModels$(this.companyId).pipe(
                map((x: ModelDto[]) => {

                    const modelByProductTypeId = x.filter(y => y.manufacturerId == manufacturerId);
 
                    const model = modelByProductTypeId.find(y => this.removeAccentsSpecialCharacters(y.name.toLowerCase()) === this.removeAccentsSpecialCharacters(control.value.toLowerCase().trim()));
                   
                    return model ? { inUse: true } : null;
                })
            )
            
        };
    }
}