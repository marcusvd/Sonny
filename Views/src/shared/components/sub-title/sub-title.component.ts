import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'sub-title',
  template: `
   <div fxLayout="column" class="around" [style]="height">
    <div fxLayout="row">
      <div fxLayout="column">
     <mat-icon class="icon">{{icon}}</mat-icon>
    </div>
    <div fxLayout="column"[style]="styleContainerTitle">
      <h3 class="title-text" [style]="titleStyle">{{title}}</h3>
      <!-- <h1 *ngIf="titleH1" class="title-text" [style]="titleStyle">{{title}}</h1> -->
    </div>
    <div fxLayout="column" [fxFlex]="spaceItem" *ngIf="plus">

      </div>
      <div fxLayout="column" *ngIf="plus">
      <ng-content select="[plus]"></ng-content>
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
    position:absolute;

}
.icon{
     font-size:18px;
    color:white;
    margin-top:7px;
    margin-top:8px;
    margin-left:10px;
}

`],
  standalone: true,
  imports: [MatIconModule, FlexLayoutModule, NgIf]
})

export class SubTitleComponent {

  @Input() title: string;
  @Input() titleStyle: string;
  @Input() styleContainerTitle: string;
  @Input() icon: string;
  @Input() height: string;
  @Input() plus: boolean = false;
  // @Input() titleH1: boolean = false;
  @Input() spaceItem: number = 100;

}
