import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import validator from 'cpf-cnpj-validator';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { SegmentDto } from 'src/components/stock-product/product-type/dtos/segment-dto';
import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';


@Component({
  selector: 'segment-mat-select-single',
  standalone: true,
  imports: [
    MatSelectModule,
    NgxMatSelectSearchModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './segment-mat-select-single.component.html',
  styles: [`

  `],
})
export class SegmentMatSelectSingleComponent extends BaseForm {

  constructor(
    override _breakpointObserver: BreakpointObserver,
  ) {
    super(_breakpointObserver)
  }

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  @Input('segments') segments$: Observable<SegmentDto[]>;
  @Input() noEntriesFoundLabel = '';
  @Input() placeholderProductType = '';
  @Input() productTypeNameAttribute = '';
  segmentFormControl = new FormControl('', Validators.required);


  @Output() outSegmentSelected = new EventEmitter<number>()
  onSelectedSegment(selectedId: number) {
    this?.outSegmentSelected?.emit(selectedId);
  }

  searchSegment() {
    this.segments$ = this.segmentFormControl.valueChanges.pipe(
      x => this.segments$.pipe(
        map(xy => xy.filter(y => y.name.toLocaleLowerCase().includes(this.segmentFormControl.value.toLocaleLowerCase()))))
    )
  }


}
