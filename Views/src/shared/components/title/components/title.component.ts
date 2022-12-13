import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { TitleContainerComponent } from './title-container.component';

@Component({
  selector: 'title-component',
  template: `
<mat-grid-list (window:resize)="onResize()" [cols]="2" [rowHeight]="rowHeight">
    <mat-grid-tile>
    <div  [style]="titleStyle">{{titleComponent}}</div>
    </mat-grid-tile>
    <mat-grid-tile>
    <div  [style]="subTitleStyle">{{subTitleComponent}}</div>
    </mat-grid-tile>
  </mat-grid-list>
  `
})
export class TitleComponent implements OnInit {

  titleComponent: string;
  subTitleComponent: string;
  rowHeight:string= '100px';

  titleStyle: string = 'font-size:85px; color:darkgreen; ';
  subTitleStyle: string = 'font-size:60px; color:green; font-weight:bold;';

  constructor(
    private _title: TitleContainerComponent,
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
        this.rowHeight = '30px';
      }
      else if (breakpoint[Breakpoints.Small]) {
        this.titleStyle = 'font-size:55px; color:darkgreen; ';
        this.subTitleStyle = 'font-size:30px; color:green; font-weight:bold;';
        this.rowHeight = '60px'
      }
      else if (breakpoint[Breakpoints.Medium]) {
        this.titleStyle = 'font-size:75px; color:darkgreen; ';
        this.subTitleStyle = 'font-size:40px; color:green; font-weight:bold;';
        this.rowHeight = '80px';
      }
      else if (breakpoint[Breakpoints.Large]) {
        this.titleStyle = 'font-size:95px; color:darkgreen; ';
        this.subTitleStyle = 'font-size:50px; color:green; font-weight:bold;';
        this.rowHeight = '100px';
      }
      else if (breakpoint[Breakpoints.XLarge]) {
        this.titleStyle = 'font-size:95px; color:darkgreen; ';
        this.subTitleStyle = 'font-size:60px; color:green; font-weight:bold;';
        this.rowHeight = '100px';
      }

    })
  }

  ngOnInit(): void {

    this.titleComponent = this._title.titleString.toUpperCase();
    this.subTitleComponent = this._title.subTitleString;


  }

}
