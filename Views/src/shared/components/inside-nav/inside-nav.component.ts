import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { ToolTips } from 'src/shared/services/messages/snack-bar.service';



@Component({
  selector: 'inside-nav',
  templateUrl: './inside-nav.component.html',
  styleUrls: ['./inside-nav.component.css'],
  providers: []
})
export class InsideNavComponent extends BaseForm implements OnInit {

  @Input() elements: any[] = [];

  rowHeight: string = '90px';
  height: string;

  cols: number = this.elements.length;


  constructor(override _breakpointObserver: BreakpointObserver,) {
    super(_breakpointObserver)
    // this.height = ` width:80px; height:${this.elements.length * 80};`;
    // this.elements.push(this.create);
    // this.elements.push(this.edit);
    // this.elements.push(this.delete);
  }

  messageToolTip = 'Para uma despesa nova, selecione "OUTROS" no menu acima.'
  private toolTipsMessages = ToolTips;
  get matTooltip() {
    return this.toolTipsMessages
  }

  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.cols = 1;
            this.height = ` width:80px; height:${this.elements.length * 100}px; padding-top:73px;`;

            break;
          }
          case 'small': {
            this.cols = 1;
            this.height = ` width:80px; height:${this.elements.length * 100}px; padding-top:73px;`;
            break;
          }
          case 'medium': {
            this.cols = this.elements.length;
            this.height = '';
            break;
          }
          case 'large': {
            this.cols = this.elements.length;
            this.height = '';
            break;
          }
          case 'xlarge': {
            this.cols = this.elements.length;
            this.height = '';
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
