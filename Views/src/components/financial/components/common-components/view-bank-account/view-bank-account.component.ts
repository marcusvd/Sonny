
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

import { MatSelectModule as MatSelectModule } from '@angular/material/select';
import { MatCardModule as MatCardModule } from '@angular/material/card';
import { MatFormFieldModule as MatFormFieldModule } from '@angular/material/form-field';



import { BankCardNumberPipe } from 'src/shared/pipes/bank-card-number.pipe';
import { BankAccountDto } from '../../bank-account-cards/dto/bank-account-dto';

@Component({
    selector: 'view-bank-account',
    standalone: true,
    imports: [
        CommonModule,
        MatSelectModule,
        MatCardModule,
        MatFormFieldModule,
        BankCardNumberPipe,
        CommonModule
    ],
    templateUrl: './view-bank-account.component.html',
    styles: [`
    .pipe-title {
        font-size: 30px;
        color: rgb(43, 161, 168);
        }


    .weight-title-space-left {
        font-weight: bolder;
        /* padding-right: 10px; */
        }
  `],
    providers: [],
})
export class ViewBankAccountComponent  implements OnInit {

    @Input() bankAccount: BankAccountDto = null;

    constructor(
    ) {}

    ngOnInit(): void {

    }
}
