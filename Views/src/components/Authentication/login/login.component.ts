import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CompanyDto } from 'src/shared/components/table-g/dtos/company-dto';
import { BaseForm } from 'src/shared/helpers/forms/base-form';


import { ValidatorsCustom } from 'src/shared/helpers/validators/validators-custom';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { Login } from '../dto/login';
import { MyUser } from '../dto/myUser';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseForm implements OnInit {


  // formMain: FormGroup;

  constructor(
    private _auth: AuthenticationService,
    private _fb: FormBuilder,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }
  formMain: FormGroup;


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


  login() {

    const login: MyUser = this.formMain.value;
    if (this.alertSave(this.formMain)) {
      this._auth.login(login);
    }





    // console.log(this.formMain)
    // const user: MyUser = this.formMain.value;
    // if (this.formMain.value) {
    //   const user: MyUser = this.formMain.value;
    //   this._auth.login(user);
    }


  formLoad() {
    return this.formMain = this._fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.formLoad();
  }
}
