import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatIconModule } from '@angular/material/icon';


import { LoginComponent } from 'src/components/authentication/login/login.component';
import { AuthenticationService } from 'src/components/authentication/services/authentication.service';
import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';
import { IScreen } from 'src/shared/components/inheritance/responsive/iscreen';
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
    // this._auth.openDialogLogin();
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
