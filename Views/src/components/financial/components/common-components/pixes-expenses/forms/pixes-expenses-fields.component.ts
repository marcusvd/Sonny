import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';


import { AddDefaultImports } from 'src/components/imports/components-default.imports';
import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';

@Component({
  selector: 'pixes-expenses-fields',
  standalone: true,
  imports: [
    AddDefaultImports
  ],
  templateUrl: './pixes-expenses-fields.component.html',
  styleUrls: ['./pixes-expenses-fields.component.scss']
})

export class PixesExpensesFieldsComponent extends BaseForm {

  constructor() {super();}

  @Input({required:true}) override formMain: FormGroup;
  @Input({required:true}) showExpenseDay:boolean = false;
  @Input({required:true}) showPrice:boolean = false;
  @Input({required:false}) columnsWidth:string = '3';
}
