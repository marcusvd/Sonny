import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen} from 'src/shared/helpers/responsive/iscreen';

@Component({
  selector: 'app-nav-financial',
  templateUrl: './nav-financial.component.html',
  styleUrls: ['./nav-financial.component.css']
})
export class NavFinancialComponent extends BaseForm implements OnInit {

  indexTabContentField: number = 0;

  title: string = 'FINANCEIRO';
  subTitle: string = 'Cadastros';

  checkingAccountTypePaymentCols: number;
  checkingAccountTypePaymentRowHeight: string;

  openCloseOption: boolean;
  showType: boolean = false;
  showCard: boolean = false;

  constructor(override _breakpointObserver: BreakpointObserver)
  { super(_breakpointObserver) }

  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.checkingAccountTypePaymentCols = 1;
            this.checkingAccountTypePaymentRowHeight = '50px';
            break;
          }
          case 'small': {
            this.checkingAccountTypePaymentCols = 1;
            this.checkingAccountTypePaymentRowHeight = '50px';
            break;
          }
          case 'medium': {
            this.checkingAccountTypePaymentCols = 2;
            this.checkingAccountTypePaymentRowHeight = '50px';
            break;
          }
          case 'large': {
            this.checkingAccountTypePaymentCols = 2;
            this.checkingAccountTypePaymentRowHeight = '50px';
            break;
          }
          case 'xlarge': {
            this.checkingAccountTypePaymentCols = 2;
            this.checkingAccountTypePaymentRowHeight = '50px';
            break;
          }
        }
      }
    })
  }


  tabContentIndex($event:any) {
    this.indexTabContentField = $event;
  }


  ngOnInit(): void {
    this.screen();
  }

  showTypeAction() {
    this.showType = !this.showType;
    this.showCard = false;
  }

  showCardAction() {
    this.showCard = !this.showCard;
    this.showType = false;
  }

}
