import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'btn-g-dynamic',
  templateUrl: './btn-g-dynamic.component.html',
  styleUrls: ['./btn-g-dynamic.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
  ]
})

export class BtnGDynamicComponent {

  action: boolean = false;

  @Output() btn = new EventEmitter<void>();
  @Input({ required: true }) name: string = '';
  @Input() actClosed: string = 'keyboard_arrow_up';
  @Input() actOpened: string = 'keyboard_arrow_down';

  @Input() actClosedScssClasses: string = '!bg-remove-color !text-white !w-[150px]';
  @Input() actOpenedScssClasses: string = '!bg-main-color !text-white !w-[150px]';


  @Input() pipeBox: string = 'pipe-box';
  @Input() btnNameScssClasses: string = '';
  // @Input() secondAct: string = '';
  @Input() btnType: string = '';
  @Input() btnClassListAroundIco = 'flex items-center space-x-1';
  @Input() btnClassListInsideButton = 'grid grid-cols-[25px_1px_110px] items-center space-x-1';
  @Input() btnClassList = '!bg-main-color !text-white !w-[150px]';
  @Input() hideIcon: boolean = false;
  @Input() isDisabled: boolean = false;

  select = new FormControl();

  @Output() outAction = new EventEmitter<boolean>();

  filterMtd() {
    this.action = !this.action;

    // if (this.secondAct == 'removeFilter-simple') {
    //   if (this.action) {
    //     this.actOpened = 'close';
    //     this.btnClassList = this.actClosedScssClasses;
    //     this.pipeBox = 'btn-pipe-red';
    //   }

    //   if (!this.action) {
    //     this.actOpened = 'keyboard_arrow_up';
    //     this.btnClassList = this.actOpenedScssClasses;
    //     this.pipeBox = 'pipe-box';
    //   }
    // }


    // if (this.secondAct == 'removeFilter') {
    //   if (this.action) {
    //     this.actOpened = 'close';
    //     this.btnClassList = this.actClosedScssClasses;
    //     this.pipeBox = 'btn-pipe-red';
    //   }

    //   if (!this.action) {
    //     this.actOpened = 'keyboard_arrow_up';
    //     this.btnClassList = this.actOpenedScssClasses;
    //     this.pipeBox = 'pipe-box';
    //   }
    // }

    this.outAction.emit(this.action)
  }

  // onMouseOverMtd() {
  //   if (!this.action)
  //     this.btnClassList += ' btnMouseOverMain';

  //   if (this.action)
  //     this.btnClassList += ' btnMouseOverRed';
  // }

  // onMouseOutMtd() {
  //   if (!this.action)
  //     this.btnClassList = this.btnClassList.replace('btnMouseOverMain', '');

  //   if (this.action)
  //     this.btnClassList = this.btnClassList.replace('btnMouseOverRed', '');
  // }

  

  btnGMtd() {
    this.btn.emit();
  }

}
