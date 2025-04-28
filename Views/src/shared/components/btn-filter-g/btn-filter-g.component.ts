import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaskModule } from 'ngx-mask';
import { NameCpfCnpjComponent } from '../administrative/name-cpf-cnpj/name-cpf-cnpj.component';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { ValidatorMessagesCustomer } from 'src/components/main/customer/validators/customer/validators-messages-customer';

@Component({
  selector: 'btn-filter-g',
  templateUrl: './btn-filter-g.component.html',
  styles: [`

            .btn-settings {
              font-size: 15px;
              color: white;
              background-color: #2ba1a8;
            }

            #mat-icon-search-column {
              margin-top:6px; margin-right:10px; margin-left:-5px;
            }
            #vertical-line-divider{
              border-left: 0.5px solid silver;
            }
            #space-items-rigt-vertical-line{
              margin-right:15px;
            }
            #icons-arrow-up-down
            {
              margin-top:6px; margin-left:-7px; width: 18px;
            }
            #space-items-left-vertical-line{
              margin-right:10px;
            }
            ::ng-deep .mat-form-field-appearance-outline.mat-focused
            ::ng-deep .mat-form-field-outline-thick {
              color: #2ba1a8;
            box-shadow: 0 2px 2px #2ba1a8;
            border-radius: 10px;
           }
           #button-arrow-space{
            height:15px;
           }
           #refresh-icon{
            padding-top:7px; margin-left:-10px;
           }
           #space-refresh-icon-text-button{
             width:10px;
          }
          #mat-card{
            background-color: rgb(249,249,249);
          }


  `],
  standalone: true,
  imports: [
    NgIf,
    MatButtonModule,
    MatIconModule,
  ]
})

export class BtnFilterGComponent implements OnInit {

  constructor(private _fb: FormBuilder) { }

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  private valMessagesCustomer = ValidatorMessagesCustomer;
  get validatorMessagesCustomer() {
    return this.valMessagesCustomer
  }

  entities: string[] = ['PJ', 'PF']
  select = new FormControl();
  arrow: boolean = false;
  styleSize ='width: 75px;'
  @Output() arrowOut = new EventEmitter<boolean>();
  filterMtd() {
    this.arrow = !this.arrow;
    this.arrowOut.emit(this.arrow)
  }


  ngOnInit(): void {

  }
}
