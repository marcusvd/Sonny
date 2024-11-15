import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ModelDto } from 'src/components/stock-product/product-type/dtos/model-dto';


import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';


@Component({
  selector: 'model-mat-select-single',
  standalone: true,
  imports: [
    MatSelectModule,
    NgxMatSelectSearchModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './model-mat-select-single.component.html',
  styles: [`

  `],
})
export class ModelMatSelectSingleComponent extends BaseForm {

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
  
  modelFormControl = new FormControl('', Validators.required);

  @Output() outModelSelected = new EventEmitter<number>()
  onSelectedModel(selectedId: number) {
    this?.outModelSelected?.emit(selectedId);
  }

  searchModel() {
    this.models$ = this.modelFormControl.valueChanges.pipe(
      x => this.models$.pipe(
        map(xy => xy.filter(y => y.name.toLocaleLowerCase().includes(this.modelFormControl.value.toLocaleLowerCase()))))
    )
  }


}
