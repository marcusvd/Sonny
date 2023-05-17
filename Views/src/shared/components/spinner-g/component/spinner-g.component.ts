import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';



@Component({
  selector: 'spinner-g',
  template: `
    <div class="spinner-container">
        <mat-spinner></mat-spinner>
        <ng-content></ng-content>
    </div>
  `,
  styles: [`

  :host ::ng-deep .mat-progress-spinner circle, .mat-spinner circle {
    stroke: #0CC20C;
}

  `]
})
export class SpinnerGComponent implements OnInit {


  constructor(

  ) { }



  ngOnInit(): void {

  }



}
