
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { MatCardModule as MatCardModule } from '@angular/material/card';
import { MatDialog as MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';


 import { LoginComponent } from '../../../../../src/components/authentication/login/login.component';
import { AuthenticationService } from '../../../../../src/components/authentication/services/authentication.service';
import { BaseForm } from '../../../../../src/shared/components/inheritance/forms/base-form';

import { SubTitleComponent } from '../../sub-title/default/sub-title.component';

@Component({
  selector: 'first',
  standalone:true,
  // encapsulation: ViewEncapsulation.None,
  imports:[
    MatCardModule,
    MatIconModule,

    SubTitleComponent
  ],
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css']
})
export class FirstComponent extends BaseForm implements OnInit {


  constructor(
    private _auth: AuthenticationService,
    private _dialog: MatDialog,

  ) {super()}


  openDialogLogin(): void {
    // this._auth.openDialogLogin();
  }

  ngOnInit(): void {

  }

}
