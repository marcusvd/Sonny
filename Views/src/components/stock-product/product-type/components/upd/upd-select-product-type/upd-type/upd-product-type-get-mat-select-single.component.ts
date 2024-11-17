import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ModelDto } from 'src/components/stock-product/product-type/dtos/model-dto';
import { ProductTypeDto } from 'src/components/stock-product/product-type/dtos/product-type-dto';
import { SegmentDto } from 'src/components/stock-product/product-type/dtos/segment-dto';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { ManufacturerDto } from 'src/components/stock-product/product-type/dtos/manufacturer-dto';
import { ProductTypeGetService } from 'src/components/stock-product/product-type/services/product-type-get.service';
import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';


@Component({
  selector: 'upd-product-type-get-mat-select-single',
  standalone: true,
  imports: [
    MatSelectModule,
    NgxMatSelectSearchModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CommonModule,

  ],
  templateUrl: './upd-product-type-get-mat-select-single.component.html',
  styles: [`

  `],
  providers: [ProductTypeGetService],
})
export class UpdProductTypeGetMatSelectSingleComponent extends BaseForm {

  constructor(
    private _fb: FormBuilder,
    override _breakpointObserver: BreakpointObserver,
  ) {
    super(_breakpointObserver)
  }

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  // @Input() override formMain: FormGroup;

  @Input('productsTypes') productsTypes$ = new Observable<ProductTypeDto[]>();
  @Input() noEntriesFoundLabel = 'Nenhum registro encontrado.';
  @Input() placeholderProductType = 'Pesquise pelo nome';
  @Input() productTypeNameAttribute = 'pesquisa tipo de produto';

  // segments: SegmentDto[] = [];
  // manufacturers: ManufacturerDto[] = [];
  // models: ModelDto[] = [];


  selectFormControl = new FormControl('', Validators.required);

  @Output() outProductTypeSelected = new EventEmitter<ProductTypeDto>()
  onSelectedProductType(selectedId: number) {
    this?.productsTypes$?.subscribe(x => {
      const productType = x.find(y => y.id === selectedId);
      this?.outProductTypeSelected?.emit(productType);
    })
  }

  searchProductType() {
    this.productsTypes$ = this.selectFormControl.valueChanges.pipe(
      x => this.productsTypes$.pipe(
        map(xy => xy.filter(y => y.name.toLocaleLowerCase().includes(this.selectFormControl.value.toLocaleLowerCase()))))
    )
  }


  @Input() set formErrors(value: boolean) {
    if(this.selectFormControl.errors && value)
    this.selectFormControl.markAsTouched();
  }

}
