import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule as MatInputModule } from '@angular/material/input';
import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';





@Component({
  selector: 'others-destinies',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,

  ],
  template: `
<div>
      <div>
        <mat-label>Nome / Identificação</mat-label>
        <mat-form-field class="w-full" appearance="outline" >
          <input matInput type="text"  [formControl]="noRegisterName">
          <mat-error>
              <span>{{validatorMessages.required(form, 'noRegisterName', 'Nome / Identificação')}}</span>
              <span>{{validatorMessages.minMaxLength(form,'noRegisterName', 'Nome / Identificação',null,250)}}</span>
          </mat-error>
        </mat-form-field>
    </div>

    <div>
      <mat-label>Endereço / Contatos</mat-label>
        <mat-form-field class="w-full" appearance="outline" >
          <input matInput type="text"  [formControl]="noRegisterAddress">
          <mat-error>
              <span>{{validatorMessages.required(form, 'noRegisterAddress', 'Endereço / Contatos')}}</span>
              <span>{{validatorMessages.minMaxLength(form,'noRegisterAddress', 'Endereço / Contatos',null,250)}}</span>
          </mat-error>
        </mat-form-field>
    </div>
</div>
<br>
  `,
  styles: []
})
export class OthersDestiniesComponent extends BaseForm implements OnInit {

  constructor() { super() }



  @Input() form: FormGroup;

  @Input() noRegisterName = new FormControl();

  @Input() noRegisterAddress = new FormControl();

  ngOnInit(): void {

  }



}
