import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';


import { View } from 'src/shared/components/inheritance/view/view';
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
        FlexLayoutModule,
        BankCardNumberPipe,
        CommonModule
    ],
    templateUrl: './view-bank-account.component.html',
    styles: [`
    .pipe-title {
        font-size: 30px;
        color: rgb(43, 161, 168);
        }
    
    .pipe-column-title {
        margin-top: -25px;
        }
    
    .weight-title-space-left {
        font-weight: bolder;
        /* padding-right: 10px; */
        }
    
    .space-right {
         padding-right: 10px;
        }   
  `],
    providers: [],
})
export class ViewBankAccountComponent extends View implements OnInit {

    @Input() bankAccount: BankAccountDto = null;

    constructor(override _breakpointObserver: BreakpointObserver
    ) { super(_breakpointObserver) }

    ngOnInit(): void {
       this.screen();
    }
}
