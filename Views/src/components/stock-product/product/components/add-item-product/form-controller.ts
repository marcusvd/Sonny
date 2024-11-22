import { FormBuilder, FormGroup } from "@angular/forms";
import { BaseForm } from "src/shared/components/inheritance/forms/base-form";
import { ItemProductDto } from "../../dtos/item-product";


export class FormController extends BaseForm {
    constructor(private _fb: FormBuilder) {
        super()
    }


    formLoad(formMain: FormGroup, userId: number, companyId: number, entity?: ItemProductDto) {
        return formMain = this._fb.group({
            id: [0, []],
            userId: [userId, []],
            companyId: [companyId, []],
            stockId: [0, []],
            supplierId: ['', []],
            usedHistoricalOrSupplier: ['', []],
            purchaseInvoiceNumber: ['', []],
            costPrice: ['', []],
            soldPrice: ['', []],
            entryDate: ['', []],
            warrantyEnd: ['', []],
            warrantyEndLocal: ['', []],
            isUsed: ['', []],
            isTested: ['', []],
        })
    }


}