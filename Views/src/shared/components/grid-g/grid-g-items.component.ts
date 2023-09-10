import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'grid-g-items',
  template: `
<div class="colors-body spacings-body" fxLayout="row" fxLayoutGap="100px" *ngFor="let entity of entities | async">
  <mat-card class="mat-card-body" fxFlex>
      <td *ngFor="let field of fieldsInEnglish let xy = index">
          <div fxLayout="column">
            <div class="grid-container-body">
               {{entity[fieldsInEnglish[xy]]}}
            </div>
          </div>
      </td>
  </mat-card>
</div>
  `,
styles: [`
.grid-container-body {
    display: grid;
    grid-template-columns: 300px 50px 50px;
    grid-gap: 1px;
}

.spacings-body {
    padding-bottom: 3px;
}
.mat-card-header {
    color: white;
    border: 1px solid rgb(0, 83, 26);
    background-color: rgb(8, 65, 0);
    box-shadow: none;
}

.mat-card-body:hover {
    border-top: 1px solid rgb(7, 83, 0);
    border-bottom: 1px solid rgb(7, 83, 0);
    color: white;
    background-color: rgb(15, 110, 0);
    box-shadow: none;
    border-radius: 0%;
    font-weight: bolder;
}

`]
})
export class GridGItemsComponent implements OnInit {

  @Input() entities = new Observable<any[]>();
  @Input() fieldsInEnglish: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
