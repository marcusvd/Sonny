import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { ProductDto } from 'src/components/stock-product/product/dtos/product-dto';
import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';


@Component({
  selector: 'add-update-product-get-mat-select-single',
  standalone: true,
  imports: [
    MatSelectModule,
    NgxMatSelectSearchModule,
    ReactiveFormsModule,
    CommonModule,

  ],
  templateUrl: './add-update-product-get-mat-select-single.component.html',
  styles: [`
    mat-form-field {
      width: 100%;
  }
  `],

})
export class AddUpdateProductGetMatSelectSingleComponent extends BaseForm {

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

  @Input('products') products$ = new Observable<ProductDto[]>();
  @Input() noEntriesFoundLabel = 'Nenhum registro encontrado.';
  @Input() placeholderProductType = 'Pesquise pelo nome';
  @Input() productTypeNameAttribute = 'pesquisa tipo de produto';

  selectFormControl = new FormControl('', Validators.required);

  @Output() outProductTypeSelected = new EventEmitter<ProductDto>()
  onSelectedProductType(selectedId: number) {
    this?.products$?.subscribe(x => {
      const productType = x.find(y => y.id === selectedId);
      this?.outProductTypeSelected?.emit(productType);
    })
  }

  searchProductType() {
    this.products$ = this.selectFormControl.valueChanges.pipe(
      x => this.products$.pipe(
        map(xy => xy.filter(y => y.name.toLocaleLowerCase().includes(this.selectFormControl.value.toLocaleLowerCase()))))
    )
  }

  @Input() set formErrors(value: boolean) {
    if (this.selectFormControl.errors && value)
      this.selectFormControl.markAsTouched();
  }

}
