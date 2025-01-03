import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";
import { BaseForm } from "src/shared/components/inheritance/forms/base-form";
import { map } from "rxjs/operators";
import { ProductTypeService } from "src/components/stock-product/product/services/product-type.service";
import { ProductTypeDto } from "src/components/stock-product/product/dtos/product-type-dto";

@Injectable({ providedIn: 'root' })
export class ProductTypeValidatorAsync extends BaseForm implements AsyncValidator {

    constructor(private _producTypeService: ProductTypeService) { super() }

    validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable < ValidationErrors | null > {
        return this._producTypeService.getProductTypes$(this.companyId).pipe(
            map((x: ProductTypeDto[]) => {
                const productType = x.find(y => this.removeAccentsSpecialCharacters(y.name.toLowerCase())  === this.removeAccentsSpecialCharacters(control.value.toLowerCase().trim()));
                    
                return productType ? { inUse: true } : null;

            })
        )
    }

}