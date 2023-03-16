import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CompanyDto } from 'src/shared/components/table-g/dtos/company-dto';
import { BaseForm } from 'src/shared/helpers/forms/base-form';


import { ValidatorsCustom } from 'src/shared/helpers/validators/validators-custom';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { MyUser } from '../dto/myUser';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent extends BaseForm implements OnInit {


  // formMain: FormGroup;

  constructor(
    private _auth: AuthenticationService,
    private _fb: FormBuilder,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }


  // ngAfterViewInit(): void {
  //   this.formLoad();
  // }

  private _validatorMessages = ValidatorMessages;

  get validatorMessages() {
    return this._validatorMessages
  }

  private _validatorCustom = ValidatorsCustom;

  get validatorCustom() {
    return this._validatorCustom
  }


  register() {

    const user: MyUser = this.formMain.value;
    if (this.alertSave(this.formMain)) {
      this._auth.register(user);
    }

    // if (this.formMain.value) {
    //   const company: CompanyDto = new CompanyDto();
    //   company.name = this.formMain.get('name').value

    //   user.company = company




    // }

  }

  formLoad() {
    return this.formMain = this._fb.group({
      company: this.formCompany(),
      userName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    })
}

  formCompany() {
    return this.subForm = this._fb.group({
      name: ['', [Validators.required]]
    })

  }


  ngOnInit(): void {
    this.formLoad();
  }

}
