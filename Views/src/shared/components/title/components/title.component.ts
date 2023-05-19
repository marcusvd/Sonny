import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { TitleContainerComponent } from './title-container.component';

@Component({
  selector: 'title-component',
  template: `





<mat-grid-list fxLayout="column" (window:resize)="onResize()" [cols]="column" [rowHeight]="rowHeight">
    <mat-grid-tile>
    <div  [style]="titleStyle">
    <div fxLayout="row" fxLayoutAlign="center center">
<div   [style]="subTitleStyle">{{subTitleString}}</div>
</div>
    </div>

    </mat-grid-tile>
    <mat-grid-tile>
    <div fxLayout="row" fxLayoutAlign="center center">
<mat-icon class="mat-icon-style" fontSet="material-icons-outlined">{{titleString}}</mat-icon>
</div>

    </mat-grid-tile>
  </mat-grid-list>
  `,
  styles: [
    `
    .mat-icon-style {
    color: green;
    /* background-color: rgba(68, 184, 93, 0.397); */
    border: 12px solid transparent;
    /* border-radius: 80px; */
    /* margin-top: -40px; */
    height: 100px;
    width: 200px;
    font-size: 100px;
    /* padding: -24px; */
}
.mat-icon-style:hover {
  color: rgb(255, 128, 0);
}
.position{
  text-align: center;
}
    `
  ]
})
export class TitleComponent implements OnInit {


  @Input() titleString: string;
  @Input() subTitleString: string;
  rowHeight: string = '100px';
  column: number = 2;

  titleStyle: string = 'font-size:65px; color:darkgreen; ';
  subTitleStyle: string = 'font-size:30px; color:green; font-weight:bold;';

  constructor(

    private _responsive: BreakpointObserver
  ) {
  }

  onResize() {
    this._responsive.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]).subscribe(result => {
      const breakpoint = result.breakpoints;

      if (breakpoint[Breakpoints.XSmall]) {
        this.titleStyle = 'font-size:25px; color:darkgreen;';
        this.subTitleStyle = 'font-size:15px; color:green; font-weight:bold; ';
        this.rowHeight = '130px';
        this.column =1;
      }
      else if (breakpoint[Breakpoints.Small]) {
        this.titleStyle = 'font-size:55px; color:darkgreen; ';
        this.subTitleStyle = 'font-size:30px; color:green; font-weight:bold;';
        this.rowHeight = '160px'
        this.column =1;
      }
      else if (breakpoint[Breakpoints.Medium]) {
        this.titleStyle = 'font-size:75px; color:darkgreen; ';
        this.subTitleStyle = 'font-size:40px; color:green; font-weight:bold;';
        this.rowHeight = '190px';
        this.column =2;
      }
      else if (breakpoint[Breakpoints.Large]) {
        this.titleStyle = 'font-size:95px; color:darkgreen; ';
        this.subTitleStyle = 'font-size:50px; color:green; font-weight:bold;';
        this.rowHeight = '210px';
        this.column =2;
      }
      else if (breakpoint[Breakpoints.XLarge]) {
        this.titleStyle = 'font-size:95px; color:darkgreen; ';
        this.subTitleStyle = 'font-size:60px; color:green; font-weight:bold;';
        this.rowHeight = '240px';
        this.column =2;
      }

    })
  }

  ngOnInit(): void {

    // this.titleComponent = this._title.titleString.toUpperCase();
    // this.subTitleComponent = this._title.subTitleString;


  }

}
