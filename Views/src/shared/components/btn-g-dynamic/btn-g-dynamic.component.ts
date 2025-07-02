import { CommonModule, JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule as MatButtonModule } from '@angular/material/button';
import { MatCardModule as MatCardModule } from '@angular/material/card';
import { MatCheckbox as MatCheckbox, MatCheckboxModule as MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule as MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule as MatInputModule } from '@angular/material/input';
import { MatSelectModule as MatSelectModule } from '@angular/material/select';
import { NgxMaskModule } from 'ngx-mask';
import { NameCpfCnpjComponent } from '../administrative/name-cpf-cnpj/name-cpf-cnpj.component';

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

  @Input() pipeBox: string = 'pipe-box';
  @Input() btnNameScssClasses: string = '';
  @Input() secondAct: string = '';
  @Input() btnType: string = 'dynamic-simple';
  @Input() btnClassList = '!bg-main-color !text-white !w-[150px]';
  @Input() isDisabled: boolean = false;

  select = new FormControl();

  @Output() outAction = new EventEmitter<boolean>();

  filterMtd() {
    this.action = !this.action;

    if (this.secondAct == 'removeFilter') {
      if (this.action) {
        this.actOpened = 'close';
        this.btnClassList = '!bg-remove-color !text-white !w-[150px]';
        this.pipeBox = 'btn-pipe-red';
      }

      if (!this.action) {
        this.actOpened = 'keyboard_arrow_up';
        this.btnClassList = '!bg-main-color !text-white !w-[150px]';
        this.pipeBox = 'pipe-box';
      }
    }

    this.outAction.emit(this.action)
  }

  onMouseOverMtd() {
    if (this.secondAct == 'removeFilter') {
      if (!this.action)
        this.btnClassList += ' btnMouseOverMain';

      if (this.action) {
        this.btnClassList += ' btnMouseOverRed';
      }
    }
  }

  onMouseOutMtd() {
    if (this.secondAct == 'removeFilter') {
      if (!this.action)
        this.btnClassList = this.btnClassList.replace('btnMouseOverMain', '');

      if (this.action)
        this.btnClassList = this.btnClassList.replace('btnMouseOverRed', '');
    }
  }

  btnGMtd() {
    this.btn.emit();
  }

}
