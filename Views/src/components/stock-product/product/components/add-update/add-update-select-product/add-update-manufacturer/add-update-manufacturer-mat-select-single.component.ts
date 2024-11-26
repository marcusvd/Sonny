import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ManufacturerDto } from 'src/components/stock-product/product/dtos/manufacturer-dto';



import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';


@Component({
  selector: 'add-update-manufacturer-mat-select-single',
  standalone: true,
  imports: [
    MatSelectModule,
    NgxMatSelectSearchModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './add-update-manufacturer-mat-select-single.component.html',
  styles: [`
  mat-form-field {
      width: 100%;
  }
  `],
})
export class AddUpdateManufacturerMatSelectSingleComponent extends BaseForm {

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
  @Input() noEntriesFoundLabel = '';
  @Input() placeholderProductType = '';
  @Input() productTypeNameAttribute = '';
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
