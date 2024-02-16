import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IRadiosDictionary } from 'src/shared/components/radio-button-g/interfaces/Iradios-dictionary';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
// import { EquipamentCreateService } from '../services/equipament-manufacturer-create.service';


export class EquipamentHelper {

  constructor(private _fb: FormBuilder) { }



  formEquipament: FormGroup;
  formLoadEquipament() {
    this.formEquipament = this._fb.group({
      equipaments: this._fb.array([])
    })
  }

  subFormGroupEquipament: FormGroup;
  subFormMakerEquipament() {
    return this.subFormGroupEquipament = this._fb.group({
      equipament: ['', [Validators.required]],
      companyId: [JSON.parse(localStorage.getItem('companyId')), [Validators.required]],
    })
  }

  addEquipament() {
    this.equipaments.push(this.subFormMakerEquipament())
  }

  removeEquipament(index: number) {
    this.equipaments.removeAt(index);
  }

  get equipaments(): FormArray {
    return <FormArray>this.formEquipament.get('equipaments');
  }


}
