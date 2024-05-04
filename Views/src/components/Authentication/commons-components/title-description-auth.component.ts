import { Component, Input, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { MaterialModule } from 'src/shared/modules/material.module';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';


@Component({
  selector: 'title-description-auth',
  template: `
   <div fxLayout="column" fxLayoutAlign="start start"class="around" [style]="height">
    <div fxLayout="row">
      <div fxLayout="column">
     <mat-icon class="logo">{{icon}}</mat-icon>
      </div>
      <div  fxLayout="column"[style]="styleContainerTitle">
      <h3 class="title-text" [style]="titleStyle">{{title}}</h3>
      </div>
    </div>
   </div>
  `,
  styles: [`
.around{
  background-color: rgb(43, 161, 168);
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
  height:35px;
  margin-top:-35px;
  margin-right:-16px;
  margin-left:-16px;
  top:18px
}
.title-text{
    font-family: Mynerve;
    font-size:14.3px;
    color:white;
    /*margin-top:7px;*/
    margin-top:8px;

}
.icon{
     font-size:18px;
    color:white;
    margin-top:7px;
    margin-top:8px;
    margin-left:10px;
}
.logo {
    font-size: 50px;
    width: 50px;
    height: 50px;
    color: #216b6e;
    padding-top:5px;
    padding-left:5px;
    padding-right:10px;
}

`],
  standalone: true,
  imports: [MatIconModule, FlexLayoutModule]
})
export class TitleDescriptionAuthComponent {

  @Input() title: string;
  @Input() titleStyle: string;
  @Input() styleContainerTitle: string;
  @Input() icon: string;
  @Input() height: string;

}
