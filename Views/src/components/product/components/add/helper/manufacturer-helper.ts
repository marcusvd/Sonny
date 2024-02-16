import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IRadiosDictionary } from 'src/shared/components/radio-button-g/interfaces/Iradios-dictionary';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
// import { EquipamentCreateService } from '../services/equipament-manufacturer-create.service';


export class ManufacturerHelper {

  constructor(private _fb: FormBuilder) { }


  formManufacturer: FormGroup;
  formLoadManufacturer() {
    this.formManufacturer = this._fb.group({
      manufacturers: this._fb.array([])
    })
  }

  subFormGroupManufacturer: FormGroup;
  subFormMakerManufacturer() {
    return this.subFormGroupManufacturer = this._fb.group({
      manufacturer: ['', [Validators.required]],
      companyId: [JSON.parse(localStorage.getItem('companyId')), [Validators.required]],
    })
  }

  addManufacturer() {
    this.manufacturers.push(this.subFormMakerManufacturer())
  }

  removeManufacturer(index: number) {
    this.manufacturers.removeAt(index);
  }

  get manufacturers(): FormArray {
    return <FormArray>this.formManufacturer.get('manufacturers');
  }



}
