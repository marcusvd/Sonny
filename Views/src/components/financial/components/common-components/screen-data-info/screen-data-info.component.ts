
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { HtmlDataInfoDto } from './dtos/html-data-info-dto';



@Component({
  selector: 'screen-data-info',
  standalone: true,
  imports: [
    CommonModule,
    NgFor,
    NgIf
  ],
  templateUrl:'./screen-data-info.component.html',
  styles: [`
  .span-pipe {
    font-size: 30px;
    color: rgb(43, 161, 168);
  }
  .span-title {
    font-weight: bolder;
  }
`],
  providers: [

  ]
})

export class ScreenDataInfoComponent  implements OnInit, OnChanges {

  @Input() fields: HtmlDataInfoDto[] = [];
  @Input() reiceverThisComponentToDisplay: string;


  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.fields)
  }

  ngOnInit(): void {

  }

}
