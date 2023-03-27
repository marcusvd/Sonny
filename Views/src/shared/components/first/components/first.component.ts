import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';


import { LoginComponent } from 'src/components/Authentication/login/login.component';
import { AuthenticationService } from 'src/components/Authentication/services/authentication.service';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';

@Component({
  selector: 'first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css']
})
export class FirstComponent extends BaseForm implements OnInit {

  navCols: number;
  navRowHeight: string = '100px';

  informationCols: number;
  informationRowHeight: string = '400px';


  constructor(
    private _auth: AuthenticationService,
    private _dialog: MatDialog,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }


  openDialogLogin(): void {
    const dialogRef = this._dialog.open(LoginComponent, {
      width: '250px',

      data: { '': '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('the dialog was closed');
      // this.animal = result;
    })
  }

  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.informationCols = 1;
            this.navCols = 1;

            break;
          }
          case 'small': {
            this.informationCols = 1;
            this.navCols = 1;
            break;
          }
          case 'medium': {
            this.informationCols = 3;
            this.navCols = 3;
            break;
          }
          case 'large': {
            this.informationCols = 3;
            this.navCols = 3;
            break;
          }
          case 'xlarge': {
            this.informationCols = 3;
            this.navCols = 3;
            break;
          }
        }
      }
    })




  }

  ngOnInit(): void {
    this.screen();
  }

}
