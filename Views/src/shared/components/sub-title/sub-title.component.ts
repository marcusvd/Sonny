import { Component, Input, OnInit } from '@angular/core';
import { GridListCommonHelper } from './helpers/grid-list-common-helper';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MaterialModule } from 'src/shared/modules/material.module';


@Component({
  selector: 'grid-list-common-title',
  template: `
   <div class="around">
     <div class="small-space-horizontal"> </div>
 <h3 class="title-text">{{titleGrid}}</h3>

    <!-- <mat-divider class="mat-divider"></mat-divider> -->
   </div>
  `,
  // styleUrls:['./grid-list-common.component.css'],
  styles: [`
.around{
  background-color: rgb(43, 161, 168);
  border-top-right-radius: 20px; border-top-left-radius: 20px;
  height:50px;
  margin-top:-35px;
  margin-right:-16px;
  margin-left:-16px;
  top:18px
}
.title-text{

    font-family: Mynerve;
    color:white;
    vertical-align: middle;
    margin-left:50px;
    padding-top:10px;
}
.small-space-horizontal {
}


`],
standalone: true,
imports: [MaterialModule, NgFor, NgIf]
})
export class GridListCommonTitleComponent implements OnInit {

  @Input() titleGrid: string;

  constructor() {

  }

  ngOnInit(): void {
  }

}
