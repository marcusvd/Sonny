import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';


import { CommonModule } from '@angular/common';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';


@Component({
  selector: 'array-g',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule
  ],
  templateUrl: './array-g.component.html',
  styleUrls:['./array-g.component.css'],
})

export class ArrayGComponent extends BaseForm {

  constructor(
    override _breakpointObserver: BreakpointObserver,
  ) {
    super(_breakpointObserver)
  }
  
  @Input() override formMain: FormGroup;
  @Input() arrayName = '';
  @Input() formArray: FormArray = null;
  @Input() labelInput = '';
  @Input() entityToEdit = '';



  removeItemArray = (arrayEntity: string, index: number, formArray: FormArray) => {

    if (arrayEntity == 'type')
      this.removeItemArrayHelper(index, formArray);

    if (arrayEntity == 'segment')
      this.removeItemArrayHelper(index, formArray);

    if (arrayEntity == 'manufacturer')
      this.removeItemArrayHelper(index, formArray);

    if (arrayEntity == 'model')
      this.removeItemArrayHelper(index, formArray);

  }

  private removeItemArrayHelper = (index: number, formArray: FormArray) => {

    formArray.controls.forEach((value, i) => {
      console.log(value.valid)
      if (index == i) {
        value.get('deleted').setValue(new Date());

        if (!value.valid)
          formArray.removeAt(index);

        if (value.valid && value.value.id == 0)
          formArray.removeAt(index);
      }
    })

  }

  isDeleted(deletedValue: string) {
    const deleted = new Date(deletedValue).getFullYear();
    return deleted > 1;
  }


}
