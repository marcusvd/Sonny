import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatCheckboxChange as MatCheckboxChange } from "@angular/material/checkbox";
import { NavigationExtras, Router } from "@angular/router";
import { Observable } from "rxjs";


import { PartnerDto } from "../../../../../components/main/partner/dtos/partner-dto";
import { BaseForm } from "../../../../../shared/components/inheritance/forms/base-form";
import { ManufacturerDto } from "../../dtos/manufacturer-dto";
import { ModelDto } from "../../dtos/model-dto";
import { ProductTypeEdit } from "../../dtos/produc-type-edit";
import { ProductTypeAfterEditHandled } from "../../dtos/product-type-after-edit-handled";
import { ProductTypeDto } from "../../dtos/product-type-dto";
import { SegmentDto } from "../../dtos/segment-dto";
import { SpecificitiesDto } from "../../dtos/specificities-dto";
import { ex_onSelectedManufacturer, ex_onSelectedModel, ex_onSelectedProduct, ex_onSelectedSegment, ex_productTypeEndSubItemsSelected } from "./forms-export-helpers";



export class ControllerAddProduct extends BaseForm {

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

  //FormControl
  productTypeFormControl = new FormControl(null, Validators.required);
  productTypeSearchFormControl = new FormControl('', Validators.required);

  segmentFormControl = new FormControl(null, Validators.required);
  segmentSearchFormControl = new FormControl('', Validators.required);

  manufacturerFormControl = new FormControl(null, Validators.required);
  manufacturerSearchFormControl = new FormControl('', Validators.required);

  modelFormControl = new FormControl(null, Validators.required);
  modelSearchFormControl = new FormControl('', Validators.required);

  //variables
  newItemSelected: string = '';
  // selectedProductTypeId: number = null;
  // selectedSegmentId: number = null;
  // selectedManufacturerId: number = null;
  // selectedModelId: number = null;
  // selectedSpecificitiesId: number = null;

  productTypeEdit: ProductTypeEdit = new ProductTypeEdit();
  productTypeAfterEditHandled: ProductTypeAfterEditHandled = null;

  // formControl = new SelectFieldFormControlStaticHelpers();
  validatorRequired = Validators.required;

  newItemScreenControl = (id: number, entity: string) => {
    if (id == 0)
      this.newItemSelected = entity
    else
      this.newItemSelected = ''
  }


 override callRouter = (call?: string) => {
    if (call === 'add')
      this._router.navigate(['/stock-product-router/add-product-type']);
    else {
      const objectRoute: NavigationExtras = {
        state: ex_productTypeEndSubItemsSelected
      };

      this._router.navigate([`/stock-product-router/edit-product-type`], objectRoute);
    }
  }

  callRouterEditProductType(entity: ProductTypeEdit) {

    const objectRoute: NavigationExtras = {
      state: entity
    };

    this._router.navigate(['/stock-product-router/edit-product-type-add-product'], objectRoute);
  }

  clearEntityToSendRoute = (entity: string) => {

    if (entity == 'segment') {
      this.productTypeEdit.segmentId = null;
      this.productTypeEdit.segmentName = '';
      this.productTypeEdit.manufacturerId = null;
      this.productTypeEdit.manufacturerName = '';
    }

    if (entity == 'manufacturer') {
      this.productTypeEdit.manufacturerId = null;
      this.productTypeEdit.manufacturerName = '';
    }


  }

  //start type

  onSelectedProduct(id: number) {
    // this.selectedProductTypeId = id;
    this.segments$ = ex_onSelectedProduct(id, this.formMain, this.productsTypes$, this.segments$, this.productTypeEdit)
  }

  onSelectedProductHandleForm() {
    this.manufacturers$ = null;
    this.models$ = null;
    this.resetFields(this.formMain, ['segmentId', 'manufacturerId', 'modelId', 'specificitiesId']);
  }
  //end type

  //start segment
  onSelectedSegment(id: number) {
    // this.selectedSegmentId = id;
    this.manufacturers$ = ex_onSelectedSegment(id, this.formMain, this.productsTypes$, this.segments$, this.manufacturers$, this.productTypeEdit)
  }

  onSelectedSegmentHandleForm() {
    this.models$ = null;
    this.resetFields(this.formMain, ['manufacturerId', 'modelId', 'specificitiesId']);
  }

  onSelectedSegmentCallRouteAddNew = (id: number, productTypeEdit: ProductTypeEdit) => {
    if (id == 0) {
      this.callRouterEditProductType(productTypeEdit);
      this.clearEntityToSendRoute('segment');
    }
  }
  //end segment

  //start manufacturer
  onSelectedManufacturer(id: number) {
    // this.selectedManufacturerId = id;
    this.models$ = ex_onSelectedManufacturer(id, this.formMain, this.manufacturers$, this.models$, this.productTypeEdit)

    if (id == 0) {
      this.callRouterEditProductType(this.productTypeEdit);
      this.clearEntityToSendRoute('manufacturer');
    }
  }

  onSelectedManufacturerHandleForm() {
    this.resetFields(this.formMain, ['modelId', 'specificitiesId']);
  }

  onSelectedManufacturerCallRouteAddNew = (id: number, productTypeEdit: ProductTypeEdit) => {
    if (id == 0) {
      this.callRouterEditProductType(productTypeEdit);
      this.clearEntityToSendRoute('manufacturer');
    }
  }
  //end manufacturer

  //start model
  onSelectedModel(id: number) {
    // this.selectedModelId = id;
    ex_onSelectedModel(id, this.formMain, this.models$);
  }

  onSelectedModelCallRouteAddNew = (id: number, productTypeEdit: ProductTypeEdit) => {
    if (id == 0)
      this.callRouterEditProductType(productTypeEdit);
  }
  //end model

  selectedEntitiesAfterEdit = () => {
    this.productTypeFormControl.patchValue(this.productTypeAfterEditHandled.productTypesId);
    this.segmentFormControl.patchValue(this.productTypeAfterEditHandled.segmentId);
    this.manufacturerFormControl.patchValue(this.productTypeAfterEditHandled.manufacturerId);
    this.modelFormControl.patchValue(this.productTypeAfterEditHandled.modelId);
  }

  onSupplierSelected(supplier: PartnerDto) {
    this.formMain.get('supplierId').patchValue(supplier.id);
  }

  isTested(isTested: MatCheckboxChange) {
    isTested.checked ? this.formMain.get('isTested')?.patchValue(new Date()) : this.formMain.get('isTested')?.patchValue(this.minValue);
  }

  formControlReset = () => {
    this.segments$ = null;
    this.manufacturers$ = null;
    this.models$ = null;
    this.specificities$ = null;

    this.productTypeFormControl.reset();
    this.productTypeSearchFormControl.reset();

    this.segmentFormControl.reset();
    this.segmentSearchFormControl.reset();

    this.manufacturerFormControl.reset();
    this.manufacturerSearchFormControl.reset();

    this.modelFormControl.reset();
    this.modelSearchFormControl.reset();
  }


}
