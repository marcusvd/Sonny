import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ManufacturerDto } from 'src/components/stock-product/product-type/dtos/manufacturer-dto';


import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';


@Component({
  selector: 'manufacturer-mat-select-single',
  standalone: true,
  imports: [
    MatSelectModule,
    NgxMatSelectSearchModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './manufacturer-mat-select-single.component.html',
  styles: [`

  `],
})
export class ManufacturerMatSelectSingleComponent extends BaseForm {

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
  manufacturerFormControl = new FormControl();

  @Output() outManufacturerSelected = new EventEmitter<number>()
  onSelectedManufacturer(selectedId: number) {
    this?.outManufacturerSelected?.emit(selectedId);
  }

  searchManufacturer() {
    this.manufacturers$ = this.manufacturerFormControl.valueChanges.pipe(
      x => this.manufacturers$.pipe(
        map(xy => xy.filter(y => y.name.toLocaleLowerCase().includes(this.manufacturerFormControl.value.toLocaleLowerCase()))))
    )
  }


}
