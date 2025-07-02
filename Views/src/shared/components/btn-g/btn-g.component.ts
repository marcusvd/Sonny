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
  @Input() btnType: string = 'green';
  @Input() customizeBtn: string = '!w-[150px]';
  @Input() isDisabled: boolean = false;

  btnGMtd() {
    this.btn.emit();
  }
}
