import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



@Component({
  selector: 'spinner-g',
  template: `
  <div *ngIf="spinner" class="middle-space-horizontal-beteween-fields"> </div>
  <div *ngIf="spinner" fxLayout="row" fxLayoutAlign="center center">
    <mat-spinner fxLayout="row" diameter="30"></mat-spinner>&nbsp;&nbsp;
    <div id="space-top" fxLayout="row">{{'Carregando...'}} &nbsp; {{optionalTitle}}</div>
  </div>
  <div *ngIf="spinner" class="middle-space-horizontal-beteween-fields"> </div>
  <div *ngIf="empty" fxLayout="row" fxLayoutAlign="center center">
  <div  id="space-top" fxLayout="row">{{'Nenhum registro encontrado!'}}</div>
  </div>
  `,
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    FlexLayoutModule,
    NgIf
  ],

  styles: [`
    .mat-spinner::ng-deep circle {
          stroke: #2ba1a8;
    }
    
    #space-top{
    padding-top:5px;
    }
  `]
})
export class SpinnerGComponent implements OnChanges {

  @Input() entities = new Observable<any[]>();
  @Input() optionalTitle = '';

  spinner = true;

  @Input() set _empty(value: boolean){
    this.empty = false;
  }

  empty = false;

  @Output() spinnerStatusOut = new EventEmitter<boolean>();
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    const length = this?.entities?.pipe(
      map(x => {

        const timeout = setTimeout(() => {
          if (this.spinner)
            this.empty = true;
            this.spinner = false;
        }, 10000)

        if (x.length > 0) {
          this.spinner = false
          this.spinnerStatusOut.emit(this.spinner)
          clearTimeout(timeout)
        }

        if(x.length == 0)
          this.spinner = true;
      }),
    ).subscribe();

  }



  ngOnInit(): void {

  }



}