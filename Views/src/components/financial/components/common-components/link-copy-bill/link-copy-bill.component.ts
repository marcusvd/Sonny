
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule as MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule as MatInputModule } from '@angular/material/input';


import { Add } from 'src/shared/components/inheritance/add/add';

import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
@Component({
  selector: 'link-copy-bill',
  templateUrl: './link-copy-bill.component.html',
  standalone: true,
  imports: [
    CommonModule,

    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  styles: [``],

})
export class LinkCopyBillComponent extends Add implements OnInit {

  @Input() override formMain: FormGroup;

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  ngOnInit(): void {

  }

}
