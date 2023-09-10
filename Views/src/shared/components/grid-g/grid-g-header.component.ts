import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'grid-g-header',
  template: `
<mat-card class="mat-card-header">
  <div fxLayout="row" fxLayoutAlign="start start" fxLayoutGap="100px">
    <div fxLayout="row" *ngFor="let field of titlesHeader">
      <div fxLayout="column">
        <td>
          <div class="grid-container-header" style="margin-bottom: -15px;">
            <h3> <b>{{field}}</b></h3>
          </div>
       </td>
      </div>
   </div>
  </div>
</mat-card>
  `,
    styles: [`
.mat-card-header {
    color: white;
    border: 1px solid rgb(0, 83, 26);
    background-color: rgb(8, 65, 0);
    box-shadow: none;
}
.grid-container-header {
    display: grid;
    grid-template-columns: 200px 50px 50px;
    grid-gap: 1px;
}
    `]
})
export class GridGHeaderComponent implements OnInit {

  @Input() titlesHeader: string[] = [];

  // @Input() entities: any[] = []

  constructor() { }

  ngOnInit(): void {
  }

}
