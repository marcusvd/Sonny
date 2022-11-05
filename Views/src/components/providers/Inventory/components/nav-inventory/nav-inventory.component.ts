import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen} from 'src/shared/helpers/responsive/iscreen';

@Component({
  selector: 'nav-inventory',
  templateUrl: './nav-inventory.component.html',
  styleUrls: ['./nav-inventory.component.css']
})
export class NavInventoryComponent extends BaseForm implements OnInit {

  indexTabContentField: number = 0;

  title: string = 'Estoque';
  subTitle: string = 'Hardware';

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


  tabContentIndex($event) {
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
