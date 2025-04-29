
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';


import { Add } from 'src/shared/components/inheritance/add/add';
import { IScreen } from 'src/shared/components/inheritance/responsive/iscreen';
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

  screenFieldPosition: string = 'row';
  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.screenFieldPosition = 'column'

            break;
          }
          case 'small': {
            this.screenFieldPosition = 'column'

            break;
          }
          case 'medium': {
            this.screenFieldPosition = 'row'

            break;
          }
          case 'large': {
            this.screenFieldPosition = 'row'


            break;
          }
          case 'xlarge': {
            this.screenFieldPosition = 'row'

            break;
          }
        }
      }
    })
  }

  ngOnInit(): void {

  }

}
