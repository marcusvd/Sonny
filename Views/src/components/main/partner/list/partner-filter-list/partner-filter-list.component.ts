import { JsonPipe, NgFor, NgIf } from '@angular/common';
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

import { ValidatorMessagesCustomer } from 'src/components/main/customer/validators/customer/validators-messages-customer';
import { FilterSearch } from './interface/filter-search';

@Component({
  selector: 'partner-filter-list',
  templateUrl: './partner-filter-list.component.html',
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

           #refresh-icon{
            padding-top:7px; margin-left:-10px;
           }
           #space-refresh-icon-text-button{
             width:10px;
          }
          #mat-card{
            background-color: rgb(249,249,249);
          }
          #entityType{
            margin-top: 30px;
          }
          #assured{
            margin-top: 40px;
          }
          #notassured{
            margin-top: 40px;
          }
          #btn-apply{
            margin-top: 35px;
          }`],
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    MatButtonModule,
    
    MatIconModule,
    MatDividerModule,
    MatInputModule,
    MatCardModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatSelectModule,
    NgxMaskModule,
    JsonPipe,
  ]
})

export class PartnerFilterListGComponent implements OnInit {

  constructor(private _fb: FormBuilder) { }

  

  private valMessagesCustomer = ValidatorMessagesCustomer;
  get validatorMessagesCustomer() {
    return this.valMessagesCustomer
  }

  formMain: FormGroup = new FormGroup({});

  entities: FilterSearch[] = [{ key: 'PJ', value: '0' }, {key:'PF', value:'1'}, {key:'Selecione', value:'Selecione'}];
  assureds: FilterSearch[] = [{ key: 'Assegurado', value: 'true' }, {key:'Não Assegurado', value:'false'}, {key:'Selecione', value:'Selecione'}];


select = new FormControl();
arrow: boolean = false;
@Output() filterFormOut = new EventEmitter<FormGroup>();
@Input() showHideFilter: boolean;
filterMtd() {
  this.arrow = !this.arrow;
  this.filterFormOut.emit(this.formMain);
  this.formMain.reset();
  this.formLoad();
}

entitySelected: string;
entitySelect(value: string) {
  this.entitySelected = value;
}

assuredSelected: string;
assuredSelect(value: string) {
  this.assuredSelected = value;

}

formLoad() {
  this.formMain = this._fb.group({
    assured: ['Selecione', []],
    entity: ['Selecione', []]
  })
}

ngOnInit(): void {
  this.formLoad();
}
}
