import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";


import { PartnerDto } from "src/components/main/partner/commons-components/dtos/partner-dto";
import { BaseForm } from "src/shared/components/inheritance/forms/base-form";
import { ManufacturerDto } from "../../../dtos/manufacturer-dto";
import { ModelDto } from "../../../dtos/model-dto";
import { ProductDto } from "../../../dtos/product-dto";
import { ProductTypeDto } from "../../../dtos/product-type-dto";
import { SegmentDto } from "../../../dtos/segment-dto";
import { SpecificitiesDto } from "../../../dtos/specificities-dto";
import { usedHistoricalOrSupplierValidator } from "./used-historical-or-supplier.validator";
import { NavigationExtras, Router } from "@angular/router";
import { EditChildrenProductType, ProductTypeEdit } from "../dto/produc-type-edit";


export class FormControllerAddProduct extends BaseForm {

  constructor(
    private _fb: FormBuilder,
    private _router: Router
  ) {
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

  //variables
  newItemSelected: string = '';
  productTypeEdit: ProductTypeEdit = new ProductTypeEdit();
  editChildrenProductType: EditChildrenProductType = new EditChildrenProductType();


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

  formMainProductType: FormGroup;
  formHandler(form: FormGroup) {
    this.formMainProductType = form;
  }

  callRouter = (call?: string) => {
    if (call === 'add')
      this._router.navigate(['/side-nav/stock-product-router/add-product-type']);
    else
      this._router.navigate(['/side-nav/stock-product-router/edit-product-type']);
  }

  callRouterEditProductType(entity: ProductTypeEdit) {

    const objectRoute: NavigationExtras = {
      state: entity
    };

    this._router.navigate(['/side-nav/stock-product-router/edit-product-type-add-product'], objectRoute);
  }

  clearEntityToSendRoute = (entity: string) => {

    if (entity == 'segment') {
      this.productTypeEdit.segmentId = null;
      this.productTypeEdit.segmentName = '';
    }

    if (entity == 'manufacturer') {
      this.productTypeEdit.manufacturerId = null;
      this.productTypeEdit.manufacturerName = '';
    }


  }


  onSelectedProduct(id: number) {

    this.manufacturers$ = null;

    this.segments$ = this.productsTypes$.pipe(map(x => {

      this.productTypeEdit.productTypeId = id;
      this.productTypeEdit.productTypeName = x.find(y => y.id == id).name;

      return x.find(y => y.id == id).segments

    }));

    this.segments$ = this.segments$.pipe(map(x => [...x ?? [], this?.newItem()]))

    this.formMain.get('productTypeId')?.patchValue(id);
  }

  onSelectedSegment(id: number) {

    this.manufacturers$ = this.segments$.pipe(
      map(x => {

        this.productTypeEdit.segmentId = id;
        this.productTypeEdit.segmentName = x.find(y => y.id == id).name;

        return x.find(segment => segment.id == id).manufacturers
      })
    )

    this.manufacturers$ = this.manufacturers$.pipe(map(x => [...x ?? [], this?.newItem()]));
    this.formMain.get('segmentId')?.patchValue(id);

    console.log(this.productTypeEdit.segmentName)

    if (id == 0) {
      this.callRouterEditProductType(this.productTypeEdit);
      this.clearEntityToSendRoute('segment');
    }

  }


  onSelectedManufacturer(id: number) {
    this.models$ = this.manufacturers$?.pipe(
      map(x => {

        this.productTypeEdit.manufacturerId = id;
        this.productTypeEdit.manufacturerName = x.find(y => y.id == id).name;

        return x.find(manufacturer => manufacturer?.id == id)?.models
      })
    )

    this.models$ = this?.models$?.pipe(map(x => [...x ?? [], this?.newItem()]));

    this.formMain.get('manufacturerId')?.patchValue(id);

    if (id == 0) {
      this.callRouterEditProductType(this.productTypeEdit);
      this.clearEntityToSendRoute('manufacturer');
    }
  }

  onSelectedModel(id: number) {

    this.specificities$ = this.models$.pipe(
      map(x => x.find(models => models.id == id).specificities)
    )

    this.specificities$ = this.specificities$.pipe(
      map((specificities: SpecificitiesDto[]) =>
        specificities.map(specificity => ({
          ...specificity,
          name: `${specificity.description.split(',')[4]}, ${specificity.description.split(',')[5]}, ${specificity.description.split(',')[6]}, ${specificity.description.split(',')[7]}`,
        }))
      )
    );

    this.formMain.get('modelId')?.patchValue(id);

    if (id == 0) 
      this.callRouterEditProductType(this.productTypeEdit);
    
  }


  onSelectedSpecificity(id: number) {
    this.formMain.get('specificitiesId')?.patchValue(id);
  }

  onSupplierSelected(supplier: PartnerDto) {
    this.formMain.get('supplierId').patchValue(supplier.id);
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
