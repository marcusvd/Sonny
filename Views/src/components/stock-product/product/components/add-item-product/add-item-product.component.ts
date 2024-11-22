import { Component } from '@angular/core';
import { FormController } from './form-controller';
import { ImportsModulesComponents } from './imports-modules-components';

@Component({
  selector: 'app-add-item-product',
  standalone: true,
  imports: [ImportsModulesComponents],
  templateUrl: './add-item-product.component.html',
  styleUrls: ['./add-item-product.component.css']
})
export class AddItemProductComponent extends FormController{

}
