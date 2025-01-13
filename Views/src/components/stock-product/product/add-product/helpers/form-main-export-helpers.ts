import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ProductDto } from "../../dtos/product-dto";
import { usedHistoricalOrSupplierValidator } from "../form-validators/used-historical-or-supplier.validator";

const warrantyEnd = new Date(new Date().getFullYear() + 1, new Date().getMonth(), new Date().getDate());
const minValue = new Date('0001-01-01T00:00:00.000Z');

export const ex_formLoad = (formMain: FormGroup, userId: number, companyId: number, entity?: ProductDto) => {
  return formMain = new FormGroup({
    id: new FormControl(0, [Validators.required]),
    productTypeId: new FormControl('', [Validators.required]),
    segmentId: new FormControl('', [Validators.required]),
    manufacturerId: new FormControl('', [Validators.required]),
    modelId: new FormControl('', [Validators.required]),
    specificitiesId: new FormControl('', [Validators.required]),
    specificitiesName: new FormControl({ value: '', disabled: true, }, []),
    detailedDescription: new FormControl({ value: '', disabled: true, }, []),
    userId: new FormControl(userId, [Validators.required]),
    companyId: new FormControl(companyId, [Validators.required]),
    supplierId: new FormControl('', [Validators.required]),
    usedHistoricalOrSupplier: new FormControl({ value: '', disabled: true, }, [usedHistoricalOrSupplierValidator()]),
    purchaseInvoiceNumber: new FormControl('', [Validators.maxLength(30)]),
    costPrice: new FormControl(0, [Validators.required]),
    soldPrice: new FormControl(0, [Validators.required]),
    entryDate: new FormControl(new Date(), [Validators.required]),
    warrantyEndLocal: new FormControl(warrantyEnd, [Validators.required]),
    isUsed: new FormControl(false, []),
    isTested: new FormControl(minValue, []),
    isTestedCheck: new FormControl(false, []),
    quantity: new FormControl(1, [Validators.required])
  })
}

