import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Observable } from 'rxjs';
import { ModelDto } from 'src/components/stock-product/product/dtos/model-dto';



import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';


@Component({
  selector: 'add-update-model-input',
  standalone: true,
  imports: [
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './add-update-model-input.component.html',
  styles: [`
  mat-form-field {
      width: 100%;
  }
  `],
})
export class AddUpdateModelInputComponent extends BaseForm {

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

  @Input() override formMain: FormGroup;
  @Input() placeholderProductType = '';
  @Input() productTypeNameAttribute = '';


  @Output() outModelSelected = new EventEmitter<number>()
  onSelectedModel(selectedId: number) {
    this?.outModelSelected?.emit(selectedId);
  }


}
