import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { MatButtonModule as MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'btn-g',
  templateUrl: './btn-g.component.html',
  styleUrls: ['./btn-g.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatIconModule, NgIf]
})

export class BtnGComponent {

  @Output() btn = new EventEmitter<void>();
  @Input() name: string = '';
  @Input() haveIcon: boolean = true;
  @Input() icon: string = 'add';
  @Input() btnType: string = 'green'; //green, red, onlyIconGreen
  @Input() customizeBtn: string = '!w-[150px]';



  // @Input() btnGreenClassList = '!bg-main-color !text-white !w-[150px]';
  // @Input() btnRedClassList = '!bg-main-color !text-white !w-[150px]';
  // @Input() btnPipeStyle = 'border-left: solid 1px #b5f4ff; background-color: #558486;border-right: solid 1px #2ba1a8;height: 35px;width: 3px;box-shadow: 0 0 0.5px rgba(0, 0, 0, 0.5);';
  @Input() isDisabled: boolean = false;

  btnGMtd() {
    this.btn.emit();
  }
}
