import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ManufacturerDto } from 'src/components/stock-product/product/dtos/manufacturer-dto';



import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { ImportsModulesComponents } from '../imports-modules-components';


@Component({
  selector: 'manufacturer-add-upd',
  standalone: true,
  imports: [
    ImportsModulesComponents
  ],
  templateUrl: './manufacturer.component.html',
  styles: [`
  mat-form-field {
      width: 100%;
  }
  `],
})
export class ManufacturerComponent extends BaseForm {

  constructor(
    override _breakpointObserver: BreakpointObserver,
  ) {
    super(_breakpointObserver)
  }

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  @Input() override formMain: FormGroup;

  @Input('manufacturers') manufacturers$: Observable<ManufacturerDto[]>;
  @Input() manufacturerInput = false;
  @Input() manufacturerMatSelect = false;
  @Input() noEntriesFoundLabel = '';
  @Input() placeholderProductType = '';
  @Input() productTypeNameAttribute = '';

  @Input() set formControlReset(value: boolean) {
    if (value) 
      this.selectFormControl.reset();
    
   
  }

  selectFormControl = new FormControl('', Validators.required);

  @Output() outManufacturerSelected = new EventEmitter<number>()
  onSelectedManufacturer(selectedId: number) {
    this?.outManufacturerSelected?.emit(selectedId);
  }

  searchManufacturer() {
    this.manufacturers$ = this.selectFormControl.valueChanges.pipe(
      x => this.manufacturers$.pipe(
        map(xy => xy.filter(y => y.name.toLocaleLowerCase().includes(this.selectFormControl.value.toLocaleLowerCase()))))
    )
  }


  @Input() set formErrors(value: boolean) {
    if(this.selectFormControl.errors && value)
    this.selectFormControl.markAsTouched();
  }


}
