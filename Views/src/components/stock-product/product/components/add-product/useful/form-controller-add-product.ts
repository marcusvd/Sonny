import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { PartnerDto } from "src/components/main/partner/commons-components/dtos/partner-dto";
import { BaseForm } from "src/shared/components/inheritance/forms/base-form";
import { ProductDto } from "../../../dtos/product";
import { usedHistoricalOrSupplierValidator } from "./used-historical-or-supplier.validator";
import { ProductTypeDto } from "../../../dtos/product-type-dto";
import { Observable } from "rxjs";
import { ManufacturerDto } from "../../../dtos/manufacturer-dto";
import { SegmentDto } from "../../../dtos/segment-dto";
import { ModelDto } from "../../../dtos/model-dto";
import { map } from "rxjs/operators";



export class FormControllerAddProduct extends BaseForm {
    constructor(private _fb: FormBuilder) {
        super()
    }


    //OBSERVABLES
    productsTypes$ = new Observable<ProductTypeDto[]>();
    segments$: Observable<SegmentDto[]>;
    manufacturers$: Observable<ManufacturerDto[]>
    models$: Observable<ModelDto[]>

    //FormsGroup
    productTypeForm: FormGroup;
    segmentForm: FormGroup;
    manufacturerForm: FormGroup;
    modelForm: FormGroup;

    onSelectedProduct(id: number) {

        this.manufacturers$ = null;
        this.segments$ = this.productsTypes$.pipe(map(x => x.find(y => y.id == id).segments));

        this.productsTypes$.subscribe((x: ProductTypeDto[]) => {

            const result = x.find(y => y.id == id);

            this.formMain.patchValue(result)
        });
        
        this.formMain.get('productTypeId')?.patchValue(id);

    }

    onSelectedSegment(id: number) {

        this.manufacturers$ = this.segments$.pipe(
            map(x => x.find(segment => segment.id == id).manufacturers)
        )
       
        this.formMain.get('segmentId')?.patchValue(id);
        // const arrayToSupply = this.formMain.controls['segments'] as FormArray;

        // arrayToSupply.controls.forEach((value, i) => {
        //   if (value.get('id').value == id)
        //     this.manufacturers$.subscribe(x => value.get('manufacturers')?.patchValue(x))
        // })


        // this.manufacturers$.subscribe(
        //   x => this.formManufacturerArray(x)
        // )
    }

    onSelectedManufacturer(id: number) {
        // this.models.clear();
        // this.manufacturers.clear();

        this.models$ = this.manufacturers$.pipe(
            map(x => x.find(manufacturer => manufacturer.id == id).models)
        )
        this.formMain.get('manufacturerId')?.patchValue(id);
        
        // const arrayToSupply = this.formMain.controls['segments'] as FormArray;

        // arrayToSupply.controls.forEach((value, i) => {
        //   if (value.get('id').value == id)
        //     this.manufacturers$.subscribe(x => value.get('manufacturers')?.patchValue(x))
        // })

        // this.manufacturers$.subscribe(
        //   x => this.formManufacturerArray(x)
        // )

        // this.models$.subscribe(
        //   x => {
        //     this.formModelArray(x)
        //   }
        // )
    }
    onSelectedModel(id: number) {
        
        this.formMain.get('modelId')?.patchValue(id);
    }


    private warrantyEnd = new Date(new Date().getFullYear() + 1, new Date().getMonth(), new Date().getDate());

    formLoad(formMain: FormGroup, userId: number, companyId: number, entity?: ProductDto) {
        return formMain = this._fb.group({
            id: [0, [Validators.required]],
            productTypeId: ['', [Validators.required]],
            segmentId: ['', [Validators.required]],
            manufacturerId: ['', [Validators.required]],
            modelId: ['', [Validators.required]],
            userId: [userId, [Validators.required]],
            companyId: [companyId, [Validators.required]],
            stockId: [0, [Validators.required]],
            supplierId: ['', [Validators.required]],
            usedHistoricalOrSupplier: new FormControl({ value: '', disabled: true }, [usedHistoricalOrSupplierValidator()]),
            purchaseInvoiceNumber: ['', [Validators.required]],
            costPrice: ['', [Validators.required]],
            soldPrice: ['', [Validators.required]],
            entryDate: [new Date(), [Validators.required]],
            warrantyEndLocal: [this.warrantyEnd, [Validators.required]],
            isUsed: [false, []],
            isTested: [new Date(), []],
            quantity: [1, [Validators.required]]
        })
    }


    onSupplierSelected(supplier: PartnerDto) {
        this.formMain.get('supplierId').setValue(supplier.id);
    }

}
