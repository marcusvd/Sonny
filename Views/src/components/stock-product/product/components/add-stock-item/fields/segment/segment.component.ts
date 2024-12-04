import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SegmentDto } from 'src/components/stock-product/product/dtos/segment-dto';


import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { ImportsModulesComponentsFields } from '../imports-modules-components-fields';


@Component({
  selector: 'segment-add-upd',
  standalone: true,
  imports: [
    ImportsModulesComponentsFields
  ],
  templateUrl: './segment.component.html',
  styles: [`

  mat-form-field {
      width: 100%;
  }
  `],
})
export class SegmentComponent extends BaseForm {


  constructor(
  ) {
    super()
  }

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  @Input('segments') segments$: Observable<SegmentDto[]>;
  @Input() override formMain: FormGroup;
  @Input() noEntriesFoundLabel = '';
  @Input() placeholderProductType = '';
  @Input() productTypeNameAttribute = '';

  @Input() set formControlReset(value: boolean) {
    if (value)
      this.selectFormControl.reset();
  }

  selectFormControl = new FormControl('', Validators.required);


  @Output() outSegmentSelected = new EventEmitter<number>()
  onSelectedSegment(selectedId: number) {
    this?.outSegmentSelected?.emit(selectedId);
  }

  searchSegment() {
    this.segments$ = this.selectFormControl.valueChanges.pipe(
      x => this.segments$.pipe(
        map(xy => xy.filter(y => y.name.toLocaleLowerCase().includes(this.selectFormControl.value.toLocaleLowerCase()))))
    )
  }

  @Input() set formErrors(value: boolean) {
    if (this.selectFormControl.errors && value)
      this.selectFormControl.markAsTouched();
  }

}
