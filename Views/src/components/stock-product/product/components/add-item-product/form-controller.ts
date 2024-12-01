import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { PartnerDto } from "src/components/main/partner/commons-components/dtos/partner-dto";
import { BaseForm } from "src/shared/components/inheritance/forms/base-form";
import { ItemProductDto } from "../../dtos/item-product";
import { usedHistoricalOrSupplierValidator } from "../validators/used-historical-or-supplier.validator";


export class FormController extends BaseForm {
    constructor(private _fb: FormBuilder) {
        super()
    }

    private warrantyEnd = new Date(new Date().getFullYear() + 1, new Date().getMonth(), new Date().getDate());

    formLoad(formMain: FormGroup, userId: number, companyId: number, entity?: ItemProductDto) {
        return formMain = this._fb.group({
            id: [0, [Validators.required]],
            userId: [userId, [Validators.required]],
            companyId: [companyId, [Validators.required]],
            stockId: [0, [Validators.required]],
            supplierId: ['', [Validators.required]],
            // usedHistoricalOrSupplier: [usedHistoricalOrSupplierValidator, []],
            usedHistoricalOrSupplier: new FormControl({ value: '', disabled: true }, [usedHistoricalOrSupplierValidator()]),
            purchaseInvoiceNumber: ['', [Validators.required]],
            costPrice: ['', [Validators.required]],
            soldPrice: ['', [Validators.required]],
            entryDate: [new Date(), [Validators.required]],
            //warrantyEnd: [new Date(new Date().getFullYear() + 1, new Date().getMonth(), new Date().getDate()), []],
            warrantyEndLocal: [this.warrantyEnd, [Validators.required]],
            isUsed: [false, []],
            isTested: [false, []],
            quantity: [1, [Validators.required]]
        })
    }


    onSupplierSelected(supplier: PartnerDto) {
        this.formMain.get('supplierId').setValue(supplier.id);
    }

}
