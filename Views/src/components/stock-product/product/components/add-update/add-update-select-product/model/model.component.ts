import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ModelDto } from 'src/components/stock-product/product/dtos/model-dto';


import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { ImportsModulesComponents } from '../imports-modules-components';


@Component({
  selector: 'model-add-upd',
  standalone: true,
  imports: [
    ImportsModulesComponents
  ],
  templateUrl: './model.component.html',
  styles: [`
  mat-form-field {
      width: 100%;
  }
  `],
})
export class ModelComponent extends BaseForm implements OnChanges {


  constructor(
    override _breakpointObserver: BreakpointObserver,
  ) {
    super(_breakpointObserver)
  }
  ngOnChanges(changes: SimpleChanges): void {
   console.log(this.modelInput)
  }

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  @Input('models') models$: Observable<ModelDto[]>;

  @Input() modelInput = false;
  @Input() modelMatSelect = false;
  @Input() noEntriesFoundLabel = '';
  @Input() placeholderProductType = '';
  @Input() productTypeNameAttribute = '';

  @Input() override formMain: FormGroup;


  @Input() set modelCheckbox(value: boolean) {
    this.modelMatSelect = value;
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
