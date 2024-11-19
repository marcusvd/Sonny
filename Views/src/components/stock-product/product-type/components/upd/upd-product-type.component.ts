import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';


import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';
import { Add } from 'src/shared/components/inheritance/add/add';
import { SubTitleComponent } from 'src/shared/components/sub-title/sub-title.component';
import { TitleComponent } from 'src/shared/components/title/components/title.component';
import { ManufacturerDto } from '../../dtos/manufacturer-dto';
import { ModelDto } from '../../dtos/model-dto';
import { ProductTypeDto } from '../../dtos/product-type-dto';
import { SegmentDto } from '../../dtos/segment-dto';
import { ProductTypeGetService } from '../../services/product-type-get.service';
import { UpdManufacturerInputComponent } from './upd-input-product-type/upd-manufacturer/upd-manufacturer-input.updcomponent';
import { UpdModelInputComponent } from './upd-input-product-type/upd-model/upd-model-input.component';
import { UpdSegmentInputComponent } from './upd-input-product-type/upd-segment/upd-segment-input.component';
import { UpdManufacturerMatSelectSingleComponent } from './upd-select-product-type/upd-manufacturer/upd-manufacturer-mat-select-single.component';
import { UpdModelMatSelectSingleComponent } from './upd-select-product-type/upd-model/upd-model-mat-select-single.component';
import { UpdSegmentMatSelectSingleComponent } from './upd-select-product-type/upd-segment/upd-segment-mat-select-single.component';
import { UpdProductTypeGetMatSelectSingleComponent } from './upd-select-product-type/upd-type/upd-product-type-get-mat-select-single.component';


@Component({
  selector: 'upd-product-type',
  standalone: true,
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    TitleComponent,
    SubTitleComponent,
    BtnGComponent,
    UpdProductTypeGetMatSelectSingleComponent,
    UpdSegmentMatSelectSingleComponent,
    UpdManufacturerMatSelectSingleComponent,
    UpdModelMatSelectSingleComponent,
    UpdSegmentInputComponent,
    UpdManufacturerInputComponent,
    UpdModelInputComponent

  ],
  templateUrl: './upd-product-type.component.html',
  styleUrls: ['./upd-product-type.component.css'],
  providers: [ProductTypeGetService]
})
export class UpdProductTypeComponent extends Add implements OnInit {

  constructor(
    override _breakpointObserver: BreakpointObserver,
    private _fb: FormBuilder,
    private _productTypeService: ProductTypeGetService
  ) {
    super(_breakpointObserver)
  }

  productsTypes$ = new Observable<ProductTypeDto[]>();
  noEntriesFoundLabel = 'Nenhum registro encontrado.';
  placeholderProductType = 'Pesquise pelo nome';
  productTypeNameAttribute = 'pesquisa tipo de produto';
  
  productTypeSelected: ProductTypeDto = {} as ProductTypeDto;

  segments$: Observable<SegmentDto[]>;
  onSelectedProductType(productTypeSelected: ProductTypeDto) {
    this.productTypeSelected = productTypeSelected;
    this.segments$ = of(productTypeSelected.segments);
    this.formLoad(productTypeSelected);
  }

  formLoad(productType?: ProductTypeDto) {
    this.formMain = this._fb.group({
      id: [productType?.id, []],
      name: [productType?.name, [Validators.required]],
      companyId: [this.companyId, [Validators.required]],
      segments: this._fb.array([])
    })
  }

  segmentUpd = false;
  segment(checked: MatCheckboxChange) {
    this.segmentUpd = checked.checked
    this.manufacturerUpd = checked.checked
    this.modelUpd = checked.checked
    if (checked.checked) {
      this.clearAllFormArrays();
      this.addEmptyFormArrays();
    }
    else {
      this.clearAllFormArrays();
      this.manufacturers$ = null;
      this.models$ = null;
    }
  }

  manufacturers$: Observable<ManufacturerDto[]>
  onSelectedSegment(segmentId: number) {

    this.manufacturers$ = this.segments$.pipe(
      map(x => x.find(segment => segment.id == segmentId).manufacturers)
    )
    this.segments$.subscribe(
      x => {
        const setSegment = x.find(segment => segment.id == segmentId)
        this.segments.push(this.formLoadSegment(setSegment));
      }
    )
  }

  get segments() {
    return this.formMain.get('segments') as FormArray
  }
  segmentForm: FormGroup;
  formLoadSegment(segment?: SegmentDto, segmentForm?: FormGroup) {
    return segmentForm = this._fb.group({
      id: [segment?.id, []],
      name: [segment?.name, [Validators.required]],
      companyId: [this.companyId, []],
      productTypeId: [segment?.productTypeId, []],
      manufacturers: this._fb.array([])
    })
  }
 
  manufacturerUpd = false;
  manufacturer(checked: MatCheckboxChange) {

    this.manufacturerUpd = checked.checked
    this.modelUpd = checked.checked

    if (checked.checked) {
      this.manufacturers.clear();
      this.models.clear();

      this.manufacturers.push(this.formLoadManufacturer())
      this.models.push(this.formLoadModel())
    }
    else {
      this.manufacturers.clear();
      this.models.clear();
    }
  }

  models$: Observable<ModelDto[]>
  onSelectedManufacturer(manufacturerId: number) {
    this.models$ = this.manufacturers$.pipe(
      map(x => x.find(manufacturer => manufacturer.id == manufacturerId).models)
    )
    this.manufacturers$.subscribe(
      x => {
        const manufacturer = x.find(manufacturer => manufacturer.id == manufacturerId)
        this.manufacturers.push(this.formLoadManufacturer(manufacturer));
      }
    )
  }

  get manufacturers() {
    return this.segmentForm.get('manufacturers') as FormArray
  }
  manufacturerForm: FormGroup;
  formLoadManufacturer(manufacturer?: ManufacturerDto) {
    return this.manufacturerForm = this._fb.group({
      id: [manufacturer?.id ?? 0, []],
      name: [manufacturer?.name ?? '', [Validators.required]],
      companyId: [this.companyId, []],
      segmentId: [manufacturer?.segmentId ?? 0, []],
      models: this._fb.array([])
    })
  }

  onSelectedModel(modelId: number) {
    this.models$.subscribe(
      x => {
        const model = x.find(model => model.id == modelId);
        this.models.push(this.formLoadModel(model));
      }
    )
  }

  modelUpd = false;
  model(checked: MatCheckboxChange) {
    this.modelUpd = checked.checked

    if (checked.checked) {
      this.models.clear();
      this.models.push(this.formLoadModel())
    }
    else
      this.models.clear();
  }

  get models() {
    return this.manufacturerForm.get('models') as FormArray
  }
  modelForm: FormGroup;
  formLoadModel(model?: ModelDto) {
    return this.modelForm = this._fb.group({
      id: [model?.id ?? 0, []],
      name: [model?.name ?? '', [Validators.required]],
      companyId: [this.companyId, []],
      manufacturerId: model?.manufacturerId ?? 0,
      description: [model?.description ?? '', [Validators.required]],
    })
  }


  addEmptyFormArrays() {
    this.segments.push(this.formLoadSegment())
    this.manufacturers.push(this.formLoadManufacturer())
    this.models.push(this.formLoadModel())
  }

  clearAllFormArrays() {
    this.segments.clear();
    this.manufacturers.clear();
    this.models.clear();
  }

  formErrosValidation = false;
  save() {

    if (this.alertSave(this.formMain)) {
      this.saveBtnEnabledDisabled = true;
      this._productTypeService.save(this.formMain);
    }
    else
      this.formErrosValidation = true;

  }

  ngOnInit(): void {
    this.formLoad();
    this.addEmptyFormArrays();
    this.productsTypes$ = this._productTypeService.getAll(this.companyId.toString());
  }

}
