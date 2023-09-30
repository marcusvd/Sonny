import { AfterViewInit, Component, Input, OnInit, Output, EventEmitter, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, FormControlName, FormGroup } from '@angular/forms';
import { MatCard } from '@angular/material/card';
import { Observable } from 'rxjs';


@Component({
  selector: 'grid-g-items',
  template: `
<div class="colors-body spacings-body" fxLayout="row"  fxLayoutGap="100px" *ngFor="let entity of entities | async let i = index">

   <mat-card class="mat-card-body" fxFlex (click)="clickSelectedEntityRow(entity)" (click)="selectedRow(i+(whatEntity(entity)))" [id]="i+(whatEntity(entity))">
     <!--  -->
         <td *ngFor="let field of fieldsInEnglish let xy = index" >
             <div fxLayout="column">
               <div [style]="styleGridContainerItem">
                 {{entity[fieldsInEnglish[xy]]}}
               </div>
             </div>
         </td>
     </mat-card>

</div>
  `,
  styles: [`
.spacings-body {
    padding-bottom: 3px;
}

.mat-card-body:hover {
    border-top: 1px solid rgb(7, 83, 0);
    border-bottom: 1px solid rgb(7, 83, 0);
    color: white;

    background-color: rgba(82, 115, 0, 0.553);
    box-shadow: none;
    border-radius: 0%;
    font-weight: bolder;
}

`]
})
export class GridGItemsComponent implements OnInit {

  @Input() entities = new Observable<any[]>();
  @Input() fieldsInEnglish: string[] = [];
  @Input() styleGridContainerItem: string = '';
  @Output() outSelectedEntity = new EventEmitter<any>();

  constructor() { }

  clickSelectedEntityRow(entity: any) {
    const entityPassed = entity;
    this.outSelectedEntity.emit(entityPassed);
  }

  selectedRow(id: string) {
    this.style(id);
  }

  whatEntity(entity: any) {

    const entityPassed = entity;

    if (entityPassed.hasOwnProperty('businessLine')) return 'p';

    return '';
  }

  style(id: string) {
    this.entities.subscribe(x => {
      let partner = '';

      if (id.includes('p')) partner = 'p';

      for (let n = 0; n < x.length; n++) {
        document.getElementById(n.toString() + partner).style.backgroundColor = '';
        document.getElementById(n.toString() + partner).style.color = '';
      }

    })
    document.getElementById(id).style.backgroundColor = "rgb(8, 65, 0)";
    document.getElementById(id).style.color = "white";
  }

  ngOnInit(): void {

  }

}
