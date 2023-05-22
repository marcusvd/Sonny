import { AfterViewChecked, AfterViewInit, Component, Injectable, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BaseForm } from 'src/shared/helpers/forms/base-form';

@Injectable({ providedIn: 'root' })

export class OtherFormService extends BaseForm implements OnInit {

  constructor(private _fb: FormBuilder) { super() }

  @Input() fxFlex: number;

  formLoad() {
   return this.formMain = this._fb.group({
      noRegisterName: ['', []],
      noRegisterAddress: ['', []]
    })
  }
  ngOnInit(): void {

  }



}
