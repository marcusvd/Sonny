import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, AsyncValidatorFn, ValidationErrors, ValidatorFn } from "@angular/forms";

import { Observable } from "rxjs";
import { ProductTypeDto } from "../../dtos/product-type-dto";
import { BaseForm } from "src/shared/components/inheritance/forms/base-form";
import { map } from "rxjs/operators";
import { EditSingleProductTypeService } from "../services/edit-single-product-type.service";
import { SegmentDto } from "../../dtos/segment-dto";
import { ManufacturerDto } from "../../dtos/manufacturer-dto";
import { ModelDto } from "../../dtos/model-dto";

@Injectable({ providedIn: 'root' })
export class ProductTypeValidatorAsync extends BaseForm {

    constructor(private _editSingleProductTypeService: EditSingleProductTypeService) { super() }


    validateProductType(productTypeParam: ProductTypeDto): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {

            return this._editSingleProductTypeService.getProductTypes$(this.companyId).pipe(
                map((x: ProductTypeDto[]) => {
                    const productType = x.find(y => this.removeAccentsSpecialCharacters(y.name.toLowerCase()) === this.removeAccentsSpecialCharacters(control.value.toLowerCase().trim()));

                    const isTheSame = productType.id == productTypeParam.id

                    return !isTheSame && productType ? { inUse: true } : null;

                }))
        }
    }


    validateSegmentAsync(productTypeId:number, segmentId: number): AsyncValidatorFn {

        return (control: AbstractControl): Observable<ValidationErrors | null> => {

            return this._editSingleProductTypeService.getProductTypeByIdAllIncluded$(productTypeId.toString()).pipe(
                map((x: ProductTypeDto) => {

                    const segmentByProductTypeId = x.segments.find(y => y.id == segmentId);

                    const segment = x.segments.find(y => this.removeAccentsSpecialCharacters(y.name.toLowerCase()) === this.removeAccentsSpecialCharacters(control.value.toLowerCase().trim()));

                    const result = segment?.id == segmentByProductTypeId?.id || segment == null ? null :  { inUse: true } ;

                    return result;
                })
            )

        };
    }

    validatorManufacturer(productTypeId:number, segmentId: number, manufacturerId: number): AsyncValidatorFn {

        return (control: AbstractControl): Observable<ValidationErrors | null> => {

            return this._editSingleProductTypeService.getProductTypeByIdAllIncluded$(productTypeId.toString()).pipe(
                map((x: ProductTypeDto) => {

                    const segmentByProductTypeId = x.segments.find(y => y.id == segmentId);

                    const manufacturerToEdit = segmentByProductTypeId.manufacturers.find(x => x.id == manufacturerId);

                    const manufacturers = segmentByProductTypeId.manufacturers?.find(y => this.removeAccentsSpecialCharacters(y?.name.toLowerCase()) === this.removeAccentsSpecialCharacters(control?.value.toLowerCase().trim()));

                    const result = manufacturerToEdit?.id == manufacturers?.id || manufacturers == null ? null : { inUse: true }

                    return result;
                })
            )

        }

    }

    validatorModel(productTypeId:number, segmentId: number, manufacturerId: number, modelId: number): AsyncValidatorFn {

        return (control: AbstractControl): Observable<ValidationErrors | null> => {

            return this._editSingleProductTypeService.getProductTypeByIdAllIncluded$(productTypeId.toString()).pipe(
                map((x: ProductTypeDto) => {

                    const segmentByProductTypeId = x.segments.find(y => y.id == segmentId);

                    const manufacturer = segmentByProductTypeId.manufacturers.find(x => x.id == manufacturerId);
                    
                    const modelToEdit = manufacturer.models.find(x => x.id == modelId);

                    const models = manufacturer.models.find(y => this.removeAccentsSpecialCharacters(y?.name.toLowerCase()) === this.removeAccentsSpecialCharacters(control?.value.toLowerCase().trim()));

                    const result = modelToEdit?.id == models?.id || models == null ? null : { inUse: true }

                    return result;
                })
            )

        }

    }

}