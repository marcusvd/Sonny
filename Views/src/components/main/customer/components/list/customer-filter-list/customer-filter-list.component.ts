import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
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
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { ValidatorMessagesCustomer } from 'src/components/main/customer/validators/customer/validators-messages-customer';

@Component({
  selector: 'customer-filter-list',
  templateUrl: './customer-filter-list.component.html',
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
    NgFor,
    MatButtonModule,
    FlexLayoutModule,
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

export class CustomerFilterListGComponent implements OnInit {

  constructor(private _fb: FormBuilder) { }

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  private valMessagesCustomer = ValidatorMessagesCustomer;
  get validatorMessagesCustomer() {
    return this.valMessagesCustomer
  }

  formMain: FormGroup = new FormGroup({});
  entities: string[] = ['PJ', 'PF', 'Selecione'];
  select = new FormControl();
  arrow: boolean = false;
  @Output() filterFormOut = new EventEmitter<FormGroup>();
  @Input() showHideFilter: boolean;
  filterMtd() {
    this.arrow = !this.arrow;

    this.formMain.get('entity').setValue(this.valueParams(this.formMain.get('entity').value));

    this.filterFormOut.emit(this.formMain);
    this.formMain.reset();
    this.formLoad();
  }

  valueParams(value: string) {
    if (value == 'Selecione')
      return null;

    if (value == 'PJ')
      return true;
    else
      return false;
  }

  formLoad() {
    this.formMain = this._fb.group({
      email: ['', []],
      cnpj: ['', []],
      assured: ['', []],
      notassured: ['', []],
      entity: ['Selecione', []]
    })
  }

  ngOnInit(): void {
    this.formLoad();
  }
}
