import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';
import { Add } from 'src/shared/components/inheritance/add/add';
import { SubTitleComponent } from 'src/shared/components/sub-title/sub-title.component';
import { TitleComponent } from 'src/shared/components/title/components/title.component';
import { ManufacturerDto } from '../../dtos/manufacturer-dto';
import { ModelDto } from '../../dtos/model-dto';
import { ProductTypeDto } from '../../dtos/product-type-dto';
import { SegmentDto } from '../../dtos/segment-dto';
import { ProductTypeGetService } from '../../services/product-type-get.service';
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
    ReactiveFormsModule,
    TitleComponent,
    SubTitleComponent,
    BtnGComponent,
    ProductTypeGetMatSelectSingleComponent,
    SegmentMatSelectSingleComponent,
    ManufacturerMatSelectSingleComponent,
    ModelMatSelectSingleComponent

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

  productTypeSelected: ProductTypeDto = {} as ProductTypeDto;

  segments$: Observable<SegmentDto[]>;
  onSelectedProductType(productTypeSelected: ProductTypeDto) {
    this.productTypeSelected = productTypeSelected
    this.segments$ = of(productTypeSelected.segments)
  }

  manufacturers$: Observable<ManufacturerDto[]>
  onSelectedSegment(segmentId: number) {
    this.manufacturers$ = this.segments$.pipe(
      map(x => x.find(segment => segment.id == segmentId).manufacturers)
    )

    this.segments$.subscribe(
      x => {
        const segment = x.find(segment => segment.id == segmentId)
        this.segments.push(this.formLoadSegment(segment))
      }
    )


  }

  models$: Observable<ModelDto[]>
  onSelectedManufacturer(manufacturerId: number) {
    this.models$ = this.manufacturers$.pipe(
      map(x => x.find(manufacturer => manufacturer.id == manufacturerId).models)
    )

    this.manufacturers$.subscribe(
      x => {
        const manufacturer = x.find(manufacturer => manufacturer.id == manufacturerId)
        this.manufacturers.push(this.formLoadManufacturer(manufacturer))
      }
    )
  }

  onSelectedModel(modelId: number) {
    this.models$.subscribe(
      x => {
        const model = x.find(model => model.id == modelId)
        this.models.push(this.formLoadModel(model))
      }
    )
  }



  formLoad() {
    this.formMain = this._fb.group({
      id: [0, []],
      name: ['', []],
      companyId: [this.companyId, []],
      segments: this._fb.array([])
    })
  }

  get segments() {
    return this.formMain.get('segments') as FormArray
  }
  segmentForm: FormGroup;
  formLoadSegment(Segment?: SegmentDto) {
    return this.segmentForm = this._fb.group({
      id: [Segment.id, []],
      name: [Segment.name, []],
      companyId: [this.companyId, []],
      productTypeId: [Segment.productTypeId, []],
      manufacturers: this._fb.array([])
    })
  }

  get manufacturers() {
    return this.segmentForm.get('manufacturers') as FormArray
  }
  manufacturerForm: FormGroup;
  formLoadManufacturer(manufacturer?: ManufacturerDto) {
    return this.manufacturerForm = this._fb.group({
      id: [manufacturer.id, []],
      name: [manufacturer.name, []],
      companyId: [this.companyId, []],
      segmentId: [manufacturer.segmentId, []],
      models: this._fb.array([])
    })
  }

  get models() {
    return this.manufacturerForm.get('models') as FormArray
  }
  modelForm: FormGroup;
  formLoadModel(model:ModelDto) {
    return this.modelForm = this._fb.group({
      id: [model.id, []],
      name: [model.name, []],
      companyId: [this.companyId, []],
      manufacturerId: this._fb.array([]),
      description: [model.description, []],
    })
  }

  save() {

  }

  ngOnInit(): void {
    this.formLoad();
    this.productsTypes$ = this._productTypeService.getAll(this.companyId.toString());
  }

}
