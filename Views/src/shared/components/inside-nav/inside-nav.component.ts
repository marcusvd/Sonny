
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';
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


  constructor() {

    // this.height = ` width:80px; height:${this.elements.length * 80};`;
    // this.elements.push(this.create);
    // this.elements.push(this.edit);
    // this.elements.push(this.delete);
    super()
  }

  messageToolTip = 'Para uma despesa nova, selecione "OUTROS" no menu acima.'
  private toolTipsMessages = ToolTips;
  get matTooltip() {
    return this.toolTipsMessages
  }



  ngOnInit(): void {

  }

}
