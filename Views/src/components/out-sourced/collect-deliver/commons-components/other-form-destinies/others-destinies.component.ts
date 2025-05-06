import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule as MatInputModule } from '@angular/material/input';


import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';


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
      <div >
        <mat-form-field appearance="outline" >
            <mat-label>Nome / Identificação</mat-label>
          <input matInput type="text"  [formControl]="noRegisterName">
          <mat-error>
              <span>{{validatorMessages.required(form, 'noRegisterName', 'Nome / Identificação')}}</span>
              <span>{{validatorMessages.minMaxLength(form,'noRegisterName', 'Nome / Identificação',null,250)}}</span>
          </mat-error>
        </mat-form-field>
    </div>
    <br>
    <div>
        <mat-form-field appearance="outline" >
            <mat-label>Endereço / Contatos</mat-label>
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
  styles: [`

::ng-deep .mat-focused .mat-form-field-label {
    /*change color of label*/
    color: green !important;
}
::ng-deep .mat-form-field-appearance-outline.mat-focused .mat-form-field-outline-thick {
  color: green !important;
}

  `]
})
export class OthersDestiniesComponent implements OnInit {

  constructor(

  ) { }

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  @Input() form: FormGroup;

  @Input() noRegisterName = new FormControl();

  @Input() noRegisterAddress = new FormControl();

  ngOnInit(): void {

  }



}
