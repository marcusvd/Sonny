import { Component, OnInit } from '@angular/core';
import { FormController } from './form-controller';

import { FormBuilder } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ImportsModulesComponents } from './imports-modules-components';


@Component({
  selector: 'add-item-product',
  standalone: true,
  imports: [ImportsModulesComponents],
  templateUrl: './add-item-product.component.html',
  styleUrls: ['./add-item-product.component.css']
})
export class AddItemProductComponent extends FormController implements OnInit {


  constructor(public _fbMain: FormBuilder) {
    super(_fbMain)


  }
  ngOnInit(): void {
    this.formMain = this.formLoad(this.formMain, this.companyId, this.userId, null);
    const test = this.formMain?.controls['isUsed']?.valueChanges?.subscribe(x => console.log(x))
  }

  // isUsed = false;
  onChangeIsUsed(selection: MatCheckboxChange) {
    if (selection.checked)
      this.formMain.get('usedHistoricalOrSupplier').enable();
    else
      this.formMain.get('usedHistoricalOrSupplier').disable();
  }

}
