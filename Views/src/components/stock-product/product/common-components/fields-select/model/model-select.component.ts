import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ModelDto } from 'src/components/stock-product/product/dtos/model-dto';


import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { ImportsFiledsSelect } from '../useful/imports-fileds-select';


@Component({
  selector: 'model-select-field',
  standalone: true,
  imports: [
    ImportsFiledsSelect
  ],
  templateUrl: './model-select.component.html',
  styles: [`
  mat-form-field {
      width: 100%;
  }

  `],
})
export class ModelSelectComponent extends BaseForm {


  constructor(
    override _breakpointObserver: BreakpointObserver,
  ) {
    super(_breakpointObserver)
  }

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  @Input('models') models$: Observable<ModelDto[]>;

  @Input() noEntriesFoundLabel = '';
  @Input() placeholderProductType = '';
  @Input() productTypeNameAttribute = '';

  @Input() override formMain: FormGroup;


  @Input() set formControlReset(value: boolean) {
    if (value) 
      this.selectFormControl.reset();
  }

  selectFormControl = new FormControl('', Validators.required);

  // selectedId = 0;
  @Output() outModelSelected = new EventEmitter<number>()
  onSelectedModel(selectedId: number) {
    this?.outModelSelected?.emit(selectedId);
    // this.selectedId = selectedId;
  }

  searchModel() {
    this.models$ = this.selectFormControl.valueChanges.pipe(
      x => this.models$.pipe(
        map(xy => xy.filter(y => y.name.toLocaleLowerCase().includes(this.selectFormControl.value.toLocaleLowerCase()))))
    )
  }

  @Input() set formErrors(value: boolean) {
    if (this.selectFormControl.errors && value)
      this.selectFormControl.markAsTouched();
  }


}
