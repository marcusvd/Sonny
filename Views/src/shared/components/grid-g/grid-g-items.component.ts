import { AfterViewInit, Component, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { Observable } from 'rxjs';


@Component({
  selector: 'grid-g-items',
  template: `
<div class="colors-body spacings-body" fxLayout="row" fxLayoutGap="100px" *ngFor="let entity of entities | async let i = index">

   <mat-card class="mat-card-body" fxFlex  (click)="clickedRows(i+(whatEntity(entity)))" [id]="i+(whatEntity(entity))">
     <!--  -->
         <td *ngFor="let field of fieldsInEnglish let xy = index" >
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

    background-color: rgba(82, 115, 0, 0.553);
    /* background-color: rgb(15, 110, 0); */
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

  clickedRows(id: string) {
    this.style(id);
  }

  whatEntity(entity: any) {
    if (entity.hasOwnProperty('businessLine')) return 'p';
    return '';
  }

  style(id: string) {
    this.entities.subscribe(x => {
      let partner = '';

      if(id.includes('p')) partner = 'p';

      for (let n = 0; n < x.length; n++) {
        document.getElementById(n.toString()+partner).style.backgroundColor = '';
        document.getElementById(n.toString()+partner).style.color = '';
      }

    })
    document.getElementById(id).style.backgroundColor = "rgb(8, 65, 0)";
    document.getElementById(id).style.color = "white";
  }

  ngOnInit(): void {

  }

}
