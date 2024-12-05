import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



import { ProductTypeDto } from 'src/components/stock-product/product/dtos/product-type-dto';
import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { ImportsFiledsSelect } from '../useful/imports-fileds-select';


@Component({
  selector: 'product-select-field',
  standalone: true,
  imports: [
    ImportsFiledsSelect
  ],
  templateUrl: './product-select.component.html',
  styles: [`

    mat-form-field {
      width: 100%;
  }
  `],

})
export class ProductSelectComponent extends BaseForm {

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

  @Input('products-types') productsTypes$ = new Observable<ProductTypeDto[]>();
  @Input() noEntriesFoundLabel = 'Nenhum registro encontrado.';
  @Input() placeHolderProduct = 'Pesquise pelo nome';
  @Input() productNameAttribute = 'pesquisa tipo de produto';
  @Input() override formMain: FormGroup;

  @Input() set formControlReset(value: boolean) {
    if (value) 
      this.selectFormControl.reset();
  }

  

  selectFormControl = new FormControl('', Validators.required);
  

  @Output() outProductSelected = new EventEmitter<ProductTypeDto>()
  onSelectedProduct(selectedId: number) {
    this?.productsTypes$?.subscribe(x => {
      const product = x.find(y => y.id === selectedId);
      this?.outProductSelected?.emit(product);
    })

    console.log(this.selectFormControl);
  }

  searchProductType() {
    this.productsTypes$ = this.selectFormControl.valueChanges.pipe(
      x => this.productsTypes$.pipe(
        map(xy => xy.filter(y => y.name.toLocaleLowerCase().includes(this.selectFormControl.value.toLocaleLowerCase()))))
    )
  }

  @Input() set formErrors(value: boolean) {
    if (this.selectFormControl.errors && value)
      this.selectFormControl.markAsTouched();
  }

}
