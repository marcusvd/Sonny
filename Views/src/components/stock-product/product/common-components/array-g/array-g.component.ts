import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';


import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { ImportsFiledsSelect } from '../fields-select/useful/imports-fileds-select';


@Component({
  selector: 'array-g',
  standalone: true,
  imports: [
    ImportsFiledsSelect
  ],
  templateUrl: './array-g.component.html',
  styles: [`
  mat-form-field {
      width: 100%;
  }
  `],
})

export class ArrayGComponent extends BaseForm implements OnChanges {

  constructor(
    override _breakpointObserver: BreakpointObserver,
  ) {
    super(_breakpointObserver)
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.arrayName)
    console.log(this.formArray)
    console.log(this.labelInput)
    console.log(this.formMain.value)
  }

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  @Input() override formMain: FormGroup;
  @Input() arrayName = '';
  @Input() formArray: FormArray = null;
  @Input() labelInput = '';
  @Input() entityToEdit = '';
  // @Input() nameAttribute = '';


  // @Input() set formControlReset(value: boolean) {
  //   if (value)
  //     this.selectFormControl.reset();
  // }

  // selectFormControl = new FormControl('', Validators.required);

  // @Output() outEntitiesSelected = new EventEmitter<number>()
  // onSelectedEntity(selectedId: number) {
  //   this?.outEntitiesSelected?.emit(selectedId);
  // }

  // @Output() outProductSelected = new EventEmitter<any>()
  // onSelectedProduct(selectedId: number) {
  //   this?.entities$?.subscribe(x => {
  //     const product = x.find(y => y.id === selectedId);
  //     this?.outProductSelected?.emit(product);
  //   })

  //   console.log(this.selectFormControl);
  // }

  // searchEntity() {
  //   this.entities$ = this.selectFormControl.valueChanges.pipe(
  //     x => this.entities$.pipe(
  //       map(xy => xy.filter(y => y.name.toLocaleLowerCase().includes(this.selectFormControl.value.toLocaleLowerCase()))))
  //   )
  // }

  // @Input() set formErrors(value: boolean) {
  //   if(this.selectFormControl.errors && value)
  //   this.selectFormControl.markAsTouched();
  // }


}
