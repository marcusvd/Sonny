import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { IScreen } from 'src/shared/components/inheritance/responsive/iscreen';
import { View } from 'src/shared/components/inheritance/view/view';
import { HtmlDataInfoDto } from './dtos/html-data-info-dto';



@Component({
    selector: 'screen-data-info',
    imports: [
        CommonModule,
        NgFor,
        NgIf
    ],
    templateUrl: './screen-data-info.component.html',
    styles: [`
  .span-pipe {
    font-size: 30px;
    color: rgb(43, 161, 168);
  }
  .span-title {
    font-weight: bolder;
  }
`],
    providers: []
})

export class ScreenDataInfoComponent extends View implements OnInit, OnChanges {

  @Input() fields: HtmlDataInfoDto[] = [];
  @Input() reiceverThisComponentToDisplay: string;

  
  constructor(
    override _breakpointObserver: BreakpointObserver,

  ) {
    super(_breakpointObserver);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.fields)
  }

  fxLayout: string = 'row';
  override screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.fxLayout = 'column';
            break;
          }
          case 'small': {
            this.fxLayout = 'column';
            break;
          }
          case 'medium': {
            this.fxLayout = 'row';
            break;
          }
          case 'large': {
            this.fxLayout = 'row';
            break;
          }
          case 'xlarge': {
            this.fxLayout = 'row';
            break;
          }
        }
      }
    })
  }

  ngOnInit(): void {


  }

}
