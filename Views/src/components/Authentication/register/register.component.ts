import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CompanyDto } from 'src/shared/components/table-g/dtos/company-dto';
import { BaseForm } from 'src/shared/helpers/forms/base-form';


import { ValidatorsCustom } from 'src/shared/helpers/validators/validators-custom';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { MyUser } from '../dto/myUser';
import { LoginComponent } from '../login/login.component';
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
    private _dialog: MatDialog,
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

  // openDialogLogin(): void {
  //   const dialogRef = this._dialog.open(LoginComponent, {
  //     width: '250px',

  //     data: { name: this.name, animal: this.animal }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('the dialog was closed');
  //     this.animal = result;
  //   })
  // }

  // dontClose: boolean = false;
  openDialogLogin(){
    this._auth.openDialogLogin()
  }
  register() {

    const user: MyUser = this.formMain.value;
    if (this.alertSave(this.formMain)) {
      this._dialog.closeAll();
      this._auth.register(user);

     setTimeout(()=>{
      this._auth.openDialogLogin()
     }, 3000);
    }
    else {
      // this.dontClose = true;
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
