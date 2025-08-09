import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

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

export class BtnGDynamicComponent implements OnChanges {

  constructor(){
  }
  ngOnChanges(changes: SimpleChanges): void {

    if(this.btnType == 'dynamic-default' || this.btnType == ''){
     this.boxInsideBtn += ' btnMouseOverMain';
    }
  }

  action: boolean = false;
  select = new FormControl();

  @Output() btn = new EventEmitter<void>();
  @Output() outAction = new EventEmitter<boolean>();

  @Input({ required: true }) name: string = '';
  @Input() btnType: string = '';

  @Input() btnBgTxtColorSizeCls = '!bg-main-color !text-white';
  @Input() btnWithHeightCls = '!w-[150px]';

  @Input() boxInsideBtn = 'grid grid-cols-[25px_1px_110px] items-center space-x-1';
  @Input()   = 'btnMouseOverMain btnMouseOverRed';
  @Input() hideIcon = false;

  @Input() actClosed: string = 'keyboard_arrow_up';
  @Input() actOpened: string = 'keyboard_arrow_down';

  @Input() pipeBox: string = 'btn-pipe-main';

  @Input() isDisabled: boolean = false;

  filterMtd() {
    this.action = !this.action;

    this.outAction.emit(this.action)
  }

  btnGMtd() {
    this.btn.emit();
  }

}
