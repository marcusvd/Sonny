import { Component, OnInit } from '@angular/core';
import { FormController } from './form-controller';
import { ImportsModulesComponents } from './imports-modules-components';
import { FormBuilder } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-add-item-product',
  standalone: true,
  imports: [ImportsModulesComponents],
  templateUrl: './add-item-product.component.html',
  styleUrls: ['./add-item-product.component.css']
})
export class AddItemProductComponent extends FormController implements OnInit {

  constructor(private _fbMain: FormBuilder) {
    super(_fbMain)
  }
  ngOnInit(): void {
    this.formMain = this.formLoad(this.formMain, this.companyId, this.userId, null);
  }

  isUsed = false;
  onChangeIsUsed(selection: MatCheckboxChange) {
    this.isUsed = selection.checked;
  }

}
