import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
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
  template:
    `
    <div fxLayout="column">
    <mat-card class="mat-card-sub-title" fxFlex>
        <div id="body" fxLayout="column">
            <!-- data bank -->
            <div [fxLayout]="''" fxLayoutGap="10">
                <div fxLayout="column">
                    <div fxLayout="row">
                        <div fxLayout="column" class="pipe-column-title">
                            <p class="pipe-title"> <span>|</span></p>
                        </div>

                        <div fxLayout="column" class="space-right weight-title-space-left">
                            <p>Banco:</p>
                        </div>
                        <div fxLayout="column">
                            <p>{{bankAccount.institution}}</p>
                        </div>
                    </div>
                </div>
                <div fxLayout="column">
                    <div fxLayout="row">
                        <div fxLayout="column" class="pipe-column-title">
                            <p class="pipe-title"> <span>|</span></p>
                        </div>

                        <div fxLayout="column" class="space-right weight-title-space-left">
                            <p>Conta:</p>
                        </div>
                        <div fxLayout="column">
                            <p>{{bankAccount?.account}}</p>
                        </div>
                    </div>
                </div>
                <div fxLayout="column">
                    <div fxLayout="row">
                        <div fxLayout="column" class="pipe-column-title">
                            <p class="pipe-title"> <span>|</span></p>
                        </div>

                        <div fxLayout="column" class="space-right weight-title-space-left">
                            <p>Agência:</p>
                        </div>
                        <div fxLayout="column">
                            <p>{{bankAccount?.agency}}</p>
                        </div>
                    </div>
                </div>
                <div fxLayout="column">
                    <div fxLayout="row">
                        <div fxLayout="column" class="pipe-column-title">
                            <p class="pipe-title"> <span>|</span></p>
                        </div>
                        <div fxLayout="column" class="space-right weight-title-space-left">
                            <p>Titular:</p>
                        </div>
                        <div fxLayout="column">
                            <p>{{bankAccount?.holder}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </mat-card>
</div>
    `,

  styles: [`
            .warning{
                  color:red;
                  margin-top:-10px;
                  padding-bottom:-10px;
            }
            mat-error{
              margin-bottom:100px;
            }
  `],
  providers: [],
})
export class ViewBankAccountComponent extends View {

  @Input() bankAccount: BankAccountDto = null;

  constructor(override _breakpointObserver: BreakpointObserver
  ) { super(_breakpointObserver) }







}
