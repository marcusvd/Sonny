import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AccountEditService } from 'src/components/profile/services/account-edit.service';
import { BaseForm } from 'src/shared/helpers/forms/base-form';

@Component({
  selector: 'address-get-edit',
  templateUrl: './address-get-edit.component.html',
  styleUrls: ['./address-get-edit.component.css']
})
export class AddressGetEditComponent extends BaseForm implements OnInit {

  constructor(
    private _accountEditService: AccountEditService,
    private _fb: FormBuilder,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }


  formLoad() {
    return this.formMain = this._fb.group({

    })
  }

  ngOnInit(): void {

  }

}
