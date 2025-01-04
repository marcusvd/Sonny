import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { PartnerDto } from "src/components/main/partner/commons-components/dtos/partner-dto";
import { BaseForm } from "src/shared/components/inheritance/forms/base-form";
import { ProductDto } from "../../../dtos/product-dto";
import { usedHistoricalOrSupplierValidator } from "./used-historical-or-supplier.validator";
import { ProductTypeDto } from "../../../dtos/product-type-dto";
import { Observable } from "rxjs";
import { ManufacturerDto } from "../../../dtos/manufacturer-dto";
import { SegmentDto } from "../../../dtos/segment-dto";
import { ModelDto } from "../../../dtos/model-dto";
import { map, tap } from "rxjs/operators";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { SpecificitiesDto } from "../../../dtos/specificities-dto";



export class FormControllerAddProduct extends BaseForm {

  constructor(private _fb: FormBuilder) {
    super()
  }

  //OBSERVABLES
  productsTypes$ = new Observable<ProductTypeDto[]>();
  segments$: Observable<SegmentDto[]>;
  manufacturers$: Observable<ManufacturerDto[]>
  models$: Observable<ModelDto[]>
  specificities$: Observable<SpecificitiesDto[]>

  //FormsGroup
  productTypeForm: FormGroup;
  segmentForm: FormGroup;
  manufacturerForm: FormGroup;
  modelForm: FormGroup;
  specificitiesForm: FormGroup;

  formMainFromAddProduct = this.formMain;

  newItemSelected: string = '';

  onSelectedProduct(id: number) {

    this.manufacturers$ = null;

    this.segments$ = this.productsTypes$.pipe(map(x => x.find(y => y.id == id).segments));
    this.segments$ = this.segments$.pipe(map(x => [...x, this.newItem()]))

    this.formMain.get('productTypeId')?.patchValue(id);

  }

  newItem = () => {
    const toRegisterNew: any = {
      id: 0,
      userId: 0,
      user: null,
      companyId: 0,
      company: null,
      name: 'Adicionar Novo',
      productTypeId: 0,
      productType: null,
      manufacturers: null,
      products: null,
      deleted: null,
      registered: null
    };
    return toRegisterNew
  }

  newItemScreenControl = (id: number, entity: string) => {
    if (id == 0)
      this.newItemSelected = entity
    else
      this.newItemSelected = ''


  }


  sendFormToNewItem(){
    this.formMainFromAddProduct = this.formMain;
    console.log('test')
  }

  onSelectedSegment(id: number) {

    this.newItemScreenControl(id, 'segment');

    this.manufacturers$ = this.segments$.pipe(
      map(x => x.find(segment => segment.id == id).manufacturers)
    )
    this.manufacturers$ = this.manufacturers$.pipe(map(x => [...x, this.newItem()]));
    this.formMain.get('segmentId')?.patchValue(id);
  }

  onSelectedManufacturer(id: number) {

    this.newItemScreenControl(id, 'manufacturer');

    this.models$ = this.manufacturers$.pipe(
      map(x => x.find(manufacturer => manufacturer.id == id).models)
    )
    this.models$ = this.models$.pipe(map(x => [...x, this.newItem()]));
    this.formMain.get('manufacturerId')?.patchValue(id);
  }

  onSelectedModel(id: number) {
    this.newItemScreenControl(id, 'model');

    this.specificities$ = this.models$.pipe(
      map(x => x.find(models => models.id == id).specificities)
    )

    this.specificities$ = this.specificities$.pipe(
      map((specificities: SpecificitiesDto[]) =>
        specificities.map(specificity => ({
          ...specificity,
          name: `${specificity.description.split(',')[4]}, ${specificity.description.split(',')[5]}, ${specificity.description.split(',')[6]}, ${specificity.description.split(',')[7]}`,
          // name: `Velocidade: ${specificity.speed} - Capacidade: ${specificity.capacity}`


        }))
      )
    );

    this.formMain.get('modelId')?.patchValue(id);
  }


  onSelectedSpecificity(id: number) {
    this.formMain.get('specificitiesId')?.patchValue(id);
  }

  onSupplierSelected(supplier: PartnerDto) {
    this.formMain.get('supplierId').setValue(supplier.id);
  }

  isTested(isTested: MatCheckboxChange) {
    isTested.checked ? this.formMain.get('isTested')?.patchValue(new Date()) : this.formMain.get('isTested')?.patchValue(this.minValue);
  }

  formLoad(formMain: FormGroup, userId: number, companyId: number, entity?: ProductDto) {
    return formMain = this._fb.group({
      id: [0, [Validators.required]],
      productTypeId: ['', [Validators.required]],
      segmentId: ['', [Validators.required]],
      manufacturerId: ['', [Validators.required]],
      modelId: ['', [Validators.required]],
      specificitiesId: ['', [Validators.required]],
      userId: [userId, [Validators.required]],
      companyId: [companyId, [Validators.required]],
      supplierId: ['', [Validators.required]],
      usedHistoricalOrSupplier: new FormControl({ value: '', disabled: true, }, [usedHistoricalOrSupplierValidator()]),
      purchaseInvoiceNumber: ['', [Validators.maxLength(30)]],
      costPrice: [0, [Validators.required]],
      soldPrice: [0, [Validators.required]],
      entryDate: [new Date(), [Validators.required]],
      warrantyEndLocal: [this.warrantyEnd, [Validators.required]],
      isUsed: [false, []],
      isTested: [this.minValue, []],
      isTestedCheck: [false, []],
      quantity: [1, [Validators.required]]
    })
  }

  private warrantyEnd = new Date(new Date().getFullYear() + 1, new Date().getMonth(), new Date().getDate());

  controlReset = false;
  formControlReset = () => {
    this.controlReset = !this.controlReset;
    this.segments$ = null;
    this.manufacturers$ = null;
    this.models$ = null;
    this.specificities$ = null;
  }


}
