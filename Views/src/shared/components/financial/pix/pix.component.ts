
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule as MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule as MatInputModule } from '@angular/material/input';
import { MatSelectModule as MatSelectModule } from '@angular/material/select';


import { MatCardModule as MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { NgxMaskModule } from 'ngx-mask';
import { PixDto } from 'src/components/financial/components/bank-account-cards/dto/pix-dto';
import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';


import { BtnGComponent } from '../../btn-g/btn-g.component';
import { PixValidator } from './pix.validator';

@Component({
  selector: 'pix',
  templateUrl: './pix.component.html',
  styleUrls: ['./pix.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatDividerModule,
    NgxMaskModule,
    BtnGComponent
  ]
})
export class PixComponent extends BaseForm implements OnInit, OnChanges {

  screenFieldPosition: string = 'column';

  @Input() noBeneficiaryField: boolean = false;
  @Input() override formMain: FormGroup;
  @Input() pixesEntities: PixDto[] = [];
  @Input() edit: boolean = false;

  constructor(

    private _fb: FormBuilder
  ) {super()}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.edit) {
      this.addEdit(this?.pixesEntities)
      this?.pixesFormArray?.controls.forEach((value, ind) => {

        if (value.get('key').value === 'E-MAIL')
          PixValidator.emailValidator(value as FormGroup, 'E-MAIL');

        if (value.get('key').value === 'CEL')
          PixValidator.celValidator(value as FormGroup, 'CEL');
        
      })
    }
  }

  add() {
    if (this.noBeneficiaryField)
      this.pixesFormArray.push(this.pixesFormGroupHolder())
    else
      this.pixesFormArray.push(this.pixesFormGroup())

  }

  addEdit(entities: PixDto[]) {
    entities.forEach((x: PixDto) => {
      if (this.noBeneficiaryField)
        this.pixesFormArray.push(this.pixesFormGroupHolder(x))
      else
        this.pixesFormArray.push(this.pixesFormGroup(x))
    })

  }

  remove(index: number) {
    this.pixesFormArray.controls.forEach((value, ind) => {

      if (index == ind) {

        value.get('deleted').setValue(true);

        if (!value.valid)
          this.pixesFormArray.removeAt(index);

        if (value.valid && value.value.id == 0)
          this.pixesFormArray.removeAt(index);
      }

    })
  }

  pixesFormGroup(entity?: PixDto) {
    return this.pixes = this._fb.group({
      id: [entity?.id || 0, [Validators.required]],
      key: [entity?.key || '', [Validators.required]],
      value: [entity?.value || '', [Validators.required]],
      deleted: [entity?.deleted || false, []]
    })
  }

  pixesFormGroupHolder(entity?: any) {
    return this.pixes = this._fb.group({
      id: [entity?.id || 0, [Validators.required]],
      key: [entity?.key || '', [Validators.required]],
      value: [entity?.value || '', [Validators.required]],
      holder: [entity?.holder, [Validators.maxLength(250)]],
      deleted: [entity?.deleted ?? this.minValue, []]
    })
  }

  pixes: FormGroup;
  get pixesFormArray() {
    return this?.formMain?.get('pixes') as FormArray
  }

  pixArray: any[] = [
    { id: 0, kindPix: 'CEL' },
    { id: 1, kindPix: 'E-MAIL' },
    { id: 2, kindPix: 'CPF' },
    { id: 3, kindPix: 'CNPJ' },

  ];

  pixValidator(form: FormGroup, selected: string, input: string) {
    PixValidator.pixValidator(form, selected, input);
  }

  pixValidatorSelected(form: FormGroup, selected: string) {
    PixValidator.pixValidatorSelected(form, selected);
  }

  pixInputMask(selected: string) {
    if (selected === 'CEL')
      return "00 0-0000-0000";

    if (selected === 'CPF')
      return "000.000.000-00";

    if (selected === 'CNPJ')
      return "00.000.000/0000-00";

    return null;
  }

  pixInputPlaceHolder(selected: string) {
    if (selected === 'CEL')
      return "Ex: (00) 0-0000-0000";

    if (selected === 'CPF')
      return "Ex: 000.000.000-00";

    if (selected === 'CNPJ')
      return "Ex: 00.000.000/0000-00";


    return null;
  }

  kidPixSelected: string = null;
  onPixSelected(selected: string) {
    this.kidPixSelected = selected;

    if (selected === 'NENHUM') {
      this.screenFieldPosition = 'column'
      this.kidPixSelected = null;
    }

    if (this.kidPixSelected != null)
      this.screenFieldPosition = 'row'

  }

  formCleanField(form: FormGroup) {
    form.get('value').setValue(null);
  }



  ngOnInit(): void {


    if (!this.edit)
      if (!this.noBeneficiaryField)
        this?.pixesFormArray?.push(this?.pixesFormGroupHolder())

  }



}
