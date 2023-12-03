import { Component, OnInit } from '@angular/core';
import { GridListOptsGHelper } from './helpers/grid-list-opts-helper';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { BreakpointObserver } from '@angular/cdk/layout';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';

@Component({
  selector: 'grid-list-opts',
  templateUrl: './grid-list-opts.component.html',
  styleUrls: ['./grid-list-opts.component.css']
})

export class GridListOptsComponent extends BaseForm implements OnInit {

  constructor(
    _breakpointObserver: BreakpointObserver
  ) {
    super(_breakpointObserver);
  }

  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {

        switch (result.size) {
          case 'xsmall': {
            // document.body.style.zIndex
            // document.body.style.zoom
            // this.screenFieldPosition = 'column';
            break;
          }
          case 'small': {
            // this.screenFieldPosition = 'column';
            break;
          }
          case 'medium': {
            // this.screenFieldPosition = 'row';
            break;
          }
          case 'large': {
            // this.screenFieldPosition = 'row';
            break;
          }
          case 'xlarge': {
            // this.screenFieldPosition = 'row';
            break;
          }
        }
      }
    })
  }


  evenOdd(n: number) {
    if (n % 2 == 0) return 'tr_0';
    return 'tr_1';
  }

  ngOnInit(): void {
  }

}