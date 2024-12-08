import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { ImportsFiledsSelect } from '../useful/imports-fileds-select';


@Component({
  selector: 'field-select-g',
  standalone: true,
  imports: [
    ImportsFiledsSelect
  ],
  templateUrl: './field-select-g.component.html',
  styles: [`
  mat-form-field {
      width: 100%;
  }
  `],
})

export class FieldSelectGComponent extends BaseForm {

  constructor(
    override _breakpointObserver: BreakpointObserver,
  ) {
    super(_breakpointObserver)
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //  this.entities$.forEach(x =>{
  //   console.log(x)
  //  })
  // }

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  // @Input() override formMain: FormGroup;

  @Input('entities') entities$: Observable<any[]>;
  @Input() noEntriesFoundLabel = '';
  @Input() placeHolder = '';
  @Input() nameAttribute = '';
  @Input() labelInput = '';

  @Input() set formControlReset(value: boolean) {
    if (value)
      this.selectFormControl.reset();
  }

  selectFormControl = new FormControl('', Validators.required);

  @Output() outEntitiesSelected = new EventEmitter<number>()
  onSelectedEntity(selectedId: number) {
    this?.outEntitiesSelected?.emit(selectedId);
  }

  // @Output() outProductSelected = new EventEmitter<any>()
  // onSelectedProduct(selectedId: number) {
  //   this?.entities$?.subscribe(x => {
  //     const product = x.find(y => y.id === selectedId);
  //     this?.outProductSelected?.emit(product);
  //   })

  //   console.log(this.selectFormControl);
  // }

  searchEntity() {
    this.entities$ = this.selectFormControl.valueChanges.pipe(
      x => this.entities$.pipe(
        map(xy => xy.filter(y => y.name.toLocaleLowerCase().includes(this.selectFormControl.value.toLocaleLowerCase()))))
    )
  }

  @Input() set formErrors(value: boolean) {
    if(this.selectFormControl.errors && value)
    this.selectFormControl.markAsTouched();
  }


}
