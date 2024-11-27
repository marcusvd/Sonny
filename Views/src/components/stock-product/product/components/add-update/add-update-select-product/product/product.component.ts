import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { ProductDto } from 'src/components/stock-product/product/dtos/product-dto';
import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { ImportsModulesComponents } from '../imports-modules-components';


@Component({
  selector: 'product-add-upd',
  standalone: true,
  imports: [
    ImportsModulesComponents
  ],
  templateUrl: './product.component.html',
  styles: [`
    mat-form-field {
      width: 100%;
  }
  `],

})
export class ProductComponent extends BaseForm {

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
  @Input() override formMain: FormGroup;

  @Input() set productCheckbox(value: boolean) {
    this.productView = value;
    this.selectFormControl.reset();
  }

  productView = false;


  selectFormControl = new FormControl('', Validators.required);

  @Output() outProductSelected = new EventEmitter<ProductDto>()
  onSelectedProduct(selectedId: number) {
    this?.products$?.subscribe(x => {
      const product = x.find(y => y.id === selectedId);
      this?.outProductSelected?.emit(product);
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
