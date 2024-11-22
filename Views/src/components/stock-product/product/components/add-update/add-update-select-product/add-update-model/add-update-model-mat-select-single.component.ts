import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ModelDto } from 'src/components/stock-product/product/dtos/model-dto';


import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';


@Component({
  selector: 'add-update-model-mat-select-single',
  standalone: true,
  imports: [
    MatSelectModule,
    NgxMatSelectSearchModule,
    MatInputModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './add-update-model-mat-select-single.component.html',
  styles: [`

  `],
})
export class AddUpdateModelMatSelectSingleComponent extends BaseForm {

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

  selectFormControl = new FormControl('', Validators.required);

  selectedId = 0;
  @Output() outModelSelected = new EventEmitter<number>()
  onSelectedModel(selectedId: number) {
    this?.outModelSelected?.emit(selectedId);
    this.selectedId = selectedId;
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
