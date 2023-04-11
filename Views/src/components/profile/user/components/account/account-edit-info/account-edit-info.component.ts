import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { MyUser } from 'src/components/authentication/dto/myUser';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';

@Component({
  selector: 'account-edit-info',
  templateUrl: './account-edit-info.component.html',
  styleUrls: ['./account-edit-info.component.css']
})
export class AccountEditInfoComponent extends BaseForm implements OnInit {

  @Input() user: MyUser

  companyUserNameEmailCols: number;
  companyUserNameEmailRowHeight: string = '150px';
  btnChangeTitleRowHeight: string = '40px';
  btnChangeTitleCols:number;


  constructor(override _breakpointObserver: BreakpointObserver) { super(_breakpointObserver) }


  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {

            this.companyUserNameEmailCols = 1;
            this.btnChangeTitleCols =1;


            break;
          }
          case 'small': {


            this.companyUserNameEmailCols = 1;
            this.btnChangeTitleCols =1;
            break;
          }
          case 'medium': {


            this.companyUserNameEmailCols = 3;
            this.btnChangeTitleCols =2;
            break;
          }
          case 'large': {

            this.btnChangeTitleCols =2;
            this.companyUserNameEmailCols = 3;


            break;
          }
          case 'xlarge': {
            this.btnChangeTitleCols =2;
            this.companyUserNameEmailCols = 3;



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
