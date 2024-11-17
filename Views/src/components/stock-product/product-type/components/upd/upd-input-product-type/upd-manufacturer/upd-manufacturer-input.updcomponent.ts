import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';


import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';


@Component({
  selector: 'upd-manufacturer-input',
  standalone: true,
  imports: [
    MatSelectModule,
    MatInputModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './upd-manufacturer-input.component.html',
  styles: [`

  `],
})
export class UpdManufacturerInputComponent extends BaseForm {

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

  @Input() placeholderProductType = '';
  @Input() productTypeNameAttribute = '';

  @Output() outManufacturerSelected = new EventEmitter<number>()
  onSelectedManufacturer(selectedId: number) {
    this?.outManufacturerSelected?.emit(selectedId);
  }


}
