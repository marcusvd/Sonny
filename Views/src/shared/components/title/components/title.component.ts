import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'title-component',
  template: `
<div fxLayout="row" fxLayoutGap="2" fxLayoutAlign="start start">

<div fxLayout="column"  fxLayoutAlign="start start" *ngIf="btnNewRoute">
  <button  mat-button  class="btn-title" [routerLink]="[btnNewRoute]">{{'Novo'}}</button>
</div>

<div fxLayout="column" fxLayoutAlign="start start" >
    <button  class="btn-title" mat-button (click)="back()">{{'Voltar'}}</button>
  </div>

</div>

<div fxLayout="row" fxLayoutAlign="center center">
    <div style="font-size: 25px; color:darkgreen;"> {{titleString.toUpperCase()}}</div>
</div>
<div fxLayout="row" fxLayoutAlign="center center">
  <div style="font-size: 15px; color:darkgreen; padding-left:180px;"> {{subTitleString}}</div>
</div>
<mat-divider class="mat-divider"></mat-divider>
<div class="middle-space-horizontal-beteween-fields"> </div>
  `,
  styles: [
    `
    .mat-divider {
    border: 1px dashed rgb(224, 224, 224);
}

.middle-space-horizontal-beteween-fields {
    padding-top: 20px;
}
    `
  ]
})
export class TitleComponent implements OnInit {

  @Input() titleString: string;
  @Input() subTitleString: string;
  @Input() btnNewRoute: string =null;

  titleStyle: string = 'font-size:65px; color:darkgreen; ';
  subTitleStyle: string = 'font-size:30px; color:green; font-weight:bold;';

  constructor(

    private _responsive: BreakpointObserver
  ) {
  }

  back() {
    window.history.back();
  }

  ngOnInit(): void {
  }

}
