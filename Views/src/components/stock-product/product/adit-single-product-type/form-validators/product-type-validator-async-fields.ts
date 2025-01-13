import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";

import { Observable } from "rxjs";
import { ProductTypeDto } from "../../dtos/product-type-dto";
import { BaseForm } from "src/shared/components/inheritance/forms/base-form";
import { map } from "rxjs/operators";
import { EditSingleProductTypeService } from "../services/edit-single-product-type.service";

@Injectable({ providedIn: 'root' })
export class ProductTypeValidatorAsync extends BaseForm implements AsyncValidator {

    constructor(private _editSingleProductTypeService: EditSingleProductTypeService) { super() }

    validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable < ValidationErrors | null > {
        return this._editSingleProductTypeService.getProductTypes$(this.companyId).pipe(
            map((x: ProductTypeDto[]) => {
                const productType = x.find(y => this.removeAccentsSpecialCharacters(y.name.toLowerCase())  === this.removeAccentsSpecialCharacters(control.value.toLowerCase().trim()));
                    
                return productType ? { inUse: true } : null;

            })
        )
    }

}