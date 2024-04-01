import { Component, Input, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { MaterialModule } from 'src/shared/modules/material.module';


@Component({
  selector: 'sub-title',
  template: `
   <div class="around">
     <div class="small-space-horizontal"> </div>
 <h3 class="title-text">{{title}}</h3>

    <!-- <mat-divider class="mat-divider"></mat-divider> -->
   </div>
  `,
  // styleUrls:['./grid-list-common.component.css'],
  styles: [`
.around{
  background-color: rgb(43, 161, 168);
  border-top-right-radius: 20px; border-top-left-radius: 20px;
  height:35px;
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
export class SubTitleComponent implements OnInit {

  @Input() title: string;

  constructor() {

  }

  ngOnInit(): void {
  }

}
