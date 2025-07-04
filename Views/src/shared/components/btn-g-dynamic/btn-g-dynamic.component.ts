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
  select = new FormControl();

  @Output() btn = new EventEmitter<void>();
  @Output() outAction = new EventEmitter<boolean>();

  @Input({ required: true }) name: string = '';
  @Input() btnType: string = '';

  @Input() btn_bg_txt_color_size_cls = '!bg-main-color !text-white';
  @Input() btn_w_h_cls = '!w-[150px]';

  @Input() box_inside_btn = 'grid grid-cols-[25px_1px_110px] items-center space-x-1';
  @Input() no_icon = false;

  @Input() actClosed: string = 'keyboard_arrow_up';
  @Input() actOpened: string = 'keyboard_arrow_down';

  @Input() pipe_box: string = 'btn-pipe-main';

  @Input() isDisabled: boolean = false;

  // @Input() actClosedScssClasses: string = '!bg-remove-color !text-white !w-[150px]';
  // @Input() actOpenedScssClasses: string = '!bg-main-color !text-white !w-[150px]';









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

  onMouseOverMtd() {
    // if (!this.action)
    //   // this.btnClassList += ' btnMouseOverMain';

    // if (this.action)
    //   // this.btnClassList += ' btnMouseOverRed';
  }

  onMouseOutMtd() {
    // if (!this.action)
    //   // this.btnClassList = this.btnClassList.replace('btnMouseOverMain', '');

    // if (this.action)
    //   // this.btnClassList = this.btnClassList.replace('btnMouseOverRed', '');
  }

//   screenWidth: number = window.innerWidth;
//     responsive(event?: Event) {
// console.log('responsive', event);

// this.actOpened = 'close';
// // this.btnClassList = this.actClosedScssClasses;
// this.pipeBox = 'btn-pipe-red';

// // if (this.screen(event) <= 640) {

//       // }

//       // if (this.secondAct == 'removeFilter-simple') {
//       //   if (this.action) {
//       //     this.actOpened = 'close';
//       //     this.btnClassList = this.actClosedScssClasses;
//       //     this.pipeBox = 'btn-pipe-red';
//       //   }

//       //   if (!this.action) {
//       //     this.actOpened = 'keyboard_arrow_up';
//       //     this.btnClassList = this.actOpenedScssClasses;
//       //     this.pipeBox = 'pipe-box';
//       //   }
//       // }


//       // if (this.secondAct == 'removeFilter') {
//       //   if (this.action) {
//       //     this.actOpened = 'close';
//       //     this.btnClassList = this.actClosedScssClasses;
//       //     this.pipeBox = 'btn-pipe-red';
//       //   }

//       //   if (!this.action) {
//       //     this.actOpened = 'keyboard_arrow_up';
//       //     this.btnClassList = this.actOpenedScssClasses;
//       //     this.pipeBox = 'pipe-box';
//       //   }
//       // }
//     }

    // screen(event?: Event) {
    //   const target = event.target as Window;
    //   this.screenWidth = target.innerWidth;
    //   return this.screenWidth
    // }

  btnGMtd() {
    this.btn.emit();
  }

}
