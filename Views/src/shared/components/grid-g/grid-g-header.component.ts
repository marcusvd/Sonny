import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'grid-g-header',
  template: `
<mat-card [style]="styleGridMatCardHeader">
  <div fxLayout="row" fxLayoutAlign="start start" fxLayoutGap="100px">
    <div fxLayout="row" *ngFor="let field of titlesHeader">
      <div fxLayout="column">
        <td>
          <div  [style]="styleGridContainerHeader">
            <h3> <b>{{field}}</b></h3>
          </div>
       </td>
      </div>
   </div>
  </div>
</mat-card>
  `,
  styles: [``]
})
export class GridGHeaderComponent implements OnInit {

  @Input() titlesHeader: string[] = [];
  @Input() styleGridContainerHeader: string = '';
  @Input() styleGridMatCardHeader: string = '';
  constructor() { }

  ngOnInit(): void {
  }

}
