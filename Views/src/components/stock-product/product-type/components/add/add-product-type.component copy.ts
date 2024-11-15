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
import { ManufacturerInputComponent } from './input-product-type/manufacturer/manufacturer-input.component';
import { ModelInputComponent } from './input-product-type/model/model-input.component';
import { SegmentInputComponent } from './input-product-type/segment/segment-input.component';
import { ProductTypeInputComponent } from './input-product-type/type/product-type-input.component';
import { ManufacturerMatSelectSingleComponent } from './select-product-type/manufacturer/manufacturer-mat-select-single.component';
import { ModelMatSelectSingleComponent } from './select-product-type/model/model-mat-select-single.component';
import { SegmentMatSelectSingleComponent } from './select-product-type/segment/segment-mat-select-single.component';
import { ProductTypeGetMatSelectSingleComponent } from './select-product-type/type/product-type-get-mat-select-single.component';

@Component({
  selector: 'add-product-type',
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
    ProductTypeGetMatSelectSingleComponent,
    SegmentMatSelectSingleComponent,
    ManufacturerMatSelectSingleComponent,
    ModelMatSelectSingleComponent,
    ProductTypeInputComponent,
    SegmentInputComponent,
    ManufacturerInputComponent,
    ModelInputComponent

  ],
  templateUrl: './add-product-type.component.html',
  styleUrls: ['./add-product-type.component.css'],
  providers: [ProductTypeGetService]
})
export class AddProductTypeComponent extends Add implements OnInit {

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
  add = false;
  productTypeSelected: ProductTypeDto = {} as ProductTypeDto;

  addNew(checked: MatCheckboxChange) {
    this.add = checked.checked
    this.cleanForm();

    if (checked.checked) {
      this.addNewProductType();
    }
    else
      this.cleanForm();
  }

  cleanForm() {
    this.segments.clear();
    this.manufacturers.clear();
    this.models.clear();
    this.formMain.get('name').setValue('');
    this.formMain.get('id').setValue(0);
  }

  segments$: Observable<SegmentDto[]>;
  onSelectedProductType(productTypeSelected: ProductTypeDto) {
    this.productTypeSelected = productTypeSelected
    this.segments$ = of(productTypeSelected.segments)
    this.formMain.get('id').setValue(productTypeSelected.id)
    this.formMain.get('name').setValue(productTypeSelected.name)
    this.formMain.get('companyId').setValue(this.companyId)

    // this.segments.push(this.formLoadSegment(segmen))
  }

  manufacturers$: Observable<ManufacturerDto[]>
  onSelectedSegment(segmentId: number) {
    this.manufacturers$ = this.segments$.pipe(
      map(x => x.find(segment => segment.id == segmentId).manufacturers)
    )
    this.segments$.subscribe(
      x => {
        const segment = x.find(segment => segment.id == segmentId)
        console.log(segment)
        this.segmentForm.get('id').setValue(segment.id)
       // this.segmentForm.get('name').setValue(segment.name)
        this.segmentForm.get('companyId').setValue(this.companyId)
      }
    )
    // this.segments$.subscribe(
    //   x => {
    //     const segment = x.find(segment => segment.id == segmentId)
    //     this.segments.push(this.formLoadSegment(segment))
    //   }
    // )
  }

  addNewProductType() {
    this.segments.push(this.formLoadSegment())
    this.manufacturers.push(this.formLoadManufacturer())
    this.models.push(this.formLoadModel())
  }

  models$: Observable<ModelDto[]>
  onSelectedManufacturer(manufacturerId: number) {
    this.models$ = this.manufacturers$.pipe(
      map(x => x.find(manufacturer => manufacturer.id == manufacturerId).models)
    )

    // this.manufacturers$.subscribe(
    //   x => {
    //     const manufacturer = x.find(manufacturer => manufacturer.id == manufacturerId)
    //     this.manufacturers.push(this.formLoadManufacturer(manufacturer))
    //   }
    // )
    this.manufacturers$.subscribe(
      x => {
        const manufacturer = x.find(manufacturer => manufacturer.id == manufacturerId)

        this.manufacturerForm.get('id').setValue(manufacturer.id)
        this.manufacturerForm.get('name').setValue(manufacturer.name)
        this.manufacturerForm.get('companyId').setValue(this.companyId)
      }
    )
  }

  onSelectedModel(modelId: number) {
    this.models$.subscribe(
      x => {
        const model = x.find(model => model.id == modelId)
        this.modelForm.get('id').setValue(model.id)
        this.modelForm.get('name').setValue(model.name)
        this.modelForm.get('companyId').setValue(this.companyId)
        this.modelForm.get('description').setValue(model.description)
        // this.models.push(this.formLoadModel(model))
      }
    )
  }

  formLoad() {
    this.formMain = this._fb.group({
      id: [0, []],
      name: ['', [Validators.required]],
      companyId: [this.companyId, [Validators.required]],
      segments: this._fb.array([])
    })
  }

  get segments() {
    return this.formMain.get('segments') as FormArray
  }
  segmentForm: FormGroup;
  formLoadSegment(Segment?: SegmentDto) {
    console.log(Segment)
    return this.segmentForm = this._fb.group({
      id: [Segment?.id ?? 0, []],
      name: [Segment?.name ?? '', [Validators.required]],
      companyId: [this.companyId, []],
      productTypeId: [Segment?.productTypeId ?? 0, []],
      manufacturers: this._fb.array([])
    })
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

  save() {

    if (this.alertSave(this.formMain)) {
      this.saveBtnEnabledDisabled = true;
      this._productTypeService.save(this.formMain);
    }
  }

  ngOnInit(): void {
    this.formLoad();
    this.addNewProductType();
    this.productsTypes$ = this._productTypeService.getAll(this.companyId.toString());
  }

}
