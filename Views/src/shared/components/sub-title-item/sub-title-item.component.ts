import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';


@Component({
  selector: 'sub-title-item',
  template: `
   <div fxLayout="column" class="around" [style]="stylePerItem">
    <div fxLayout="row">
      <div fxLayout="column">
     <mat-icon class="icon">{{icon}}</mat-icon>
      </div>
      <div fxLayout="column">
      <h3 class="title-text">{{title}}</h3>
      </div>
    </div>
   </div>
  `,
  styles: [`
.around{
  background-color: rgb(43, 161, 168);
  border-top-left-radius: 15px;
  height:35px;
  width: 200px;
  margin-top:-35px;
  margin-left:-16.5px;
}
.title-text{
    font-family: Mynerve;
    font-size:14.3px;
    color:white;
    margin-top:8px;
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
  imports: [MatIconModule, FlexLayoutModule]
})
export class SubTitleItemComponent {

  @Input() title: string;
  @Input() icon: string;
  @Input() stylePerItem: string;

}
