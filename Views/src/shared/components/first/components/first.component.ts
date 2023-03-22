import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogLoginRegisterComponent } from 'src/components/Authentication/login-register/components/helper/dialog/dialog-login-register.component';
import { LoginComponent } from 'src/components/Authentication/login/login.component';
import { AuthenticationService } from 'src/components/Authentication/services/authentication.service';

@Component({
  selector: 'first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css']
})
export class FirstComponent implements OnInit {

  animal:string;
  name:string;



  constructor(
    private _auth: AuthenticationService,
    private _dialog: MatDialog
    ) { }


  openDialogLogin(): void {
    const dialogRef = this._dialog.open(LoginComponent, {
      width: '250px',

      data:{name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('the dialog was closed');
      this.animal = result;
    })
  }



  ngOnInit(): void {
  }

}
