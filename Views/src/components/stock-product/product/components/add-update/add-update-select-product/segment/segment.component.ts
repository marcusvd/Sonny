import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SegmentDto } from 'src/components/stock-product/product/dtos/segment-dto';


import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { ImportsModulesComponents } from '../imports-modules-components';


@Component({
  selector: 'segment-add-upd',
  standalone: true,
  imports: [
    ImportsModulesComponents
  ],
  templateUrl: './segment.component.html',
  styles: [`
  mat-form-field {
      width: 100%;
  }
  `],
})
export class SegmentComponent extends BaseForm implements OnChanges {


  constructor(
  ) {
    super()
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.segmentMatSelect)
  }

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  @Input('segments') segments$: Observable<SegmentDto[]>;
  @Input() override formMain: FormGroup;
  @Input() segmentInput = false;
  @Input() segmentMatSelect = false;
  @Input() noEntriesFoundLabel = '';
  @Input() placeholderProductType = '';
  @Input() productTypeNameAttribute = '';

  @Input() set segmentCheckbox(value: boolean) {
    this.segmentMatSelect = value;
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
