import { BreakpointObserver } from '@angular/cdk/layout';
import { NgIf } from '@angular/common';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogModule as MatDialogModule, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';
import { SubTitleComponent } from 'src/shared/components/sub-title/default/sub-title.component';
import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { CaptchaComponent } from '../captcha/captcha.component';
import { RetryConfirmPassword } from '../dto/retry-confirm-password';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'resend-email-confirm-dialog',
  standalone: true,
  // encapsulation: ViewEncapsulation.None,
  imports: [
    MatDialogModule,
    
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    NgIf,
    SubTitleComponent,
    BtnGComponent,
    CaptchaComponent

  ],
  template: `
    <mat-card *ngIf="resend">
      <sub-title title class="font-title" [title]="'Email não confirmado!'" [styleContainerTitle]="'padding-top:8px;'" [titleStyle]="'font-family: Mynerve; font-size: 24px;'" [height]="'height:60px'"></sub-title>
         <mat-dialog-content style="padding-top: 20px" *ngIf="resend">
          <span class="font-body">{{messageBody}}</span><span class="itemToBeDelete">{{itemToBeDelete}}</span><span>?</span>
         </mat-dialog-content>
       <div   class="margin" fxLayoutGap="30px">
                <div  >
                </div>
                <div >
                 <btn-g mat-dialog-close [name]="'Cancelar'" [icon]="'cancel'" (btn)="clickedNo('cancel')"></btn-g>
                </div>
                <div >
                 <button class="btn-settings" mat-raised-button type="button" mat-raised-button (click)="clickedYes()">
                     <div >
                       <div  id="mat-icon-search-column">
                         <mat-icon>arrow_forward</mat-icon>
                       </div>
                       <div  id="vertical-line-divider">
                       </div>

                         <div >Reenviar </div>
                       </div>
                  </button>
              </div>
       </div>
</mat-card>

<mat-card *ngIf="!resend">
      <sub-title title class="font-title" [title]="'Email não confirmado!'" [styleContainerTitle]="'padding-top:8px;'" [titleStyle]="'font-family: Mynerve; font-size: 24px;'" [height]="'height:60px'"></sub-title>
      <div class="space-top"></div>
      <div  [formGroup]="formMain">
            <div >
            <mat-form-field  appearance="outline">
                    <mat-label>
                        <mat-icon id="email-icon">email</mat-icon> <b>Email</b>
                    </mat-label>
                    <input matInput type="text" formControlName="email" aria-label="Email">
                    <mat-error>
                        <span> {{validatorMessages.required(formMain,'email', '')}}</span>
                        <span> {{validatorMessages.mailField(formMain,'email')}}</span>
                    </mat-error>
                </mat-form-field>
            </div>


            <div  fxLayoutAlign="center center">
                <captcha #token [hidden]="!formMain.valid"></captcha>
            </div>
        </div>
        <div   class="margin" fxLayoutGap="30px">
                <div  >
                </div>
                <div >
                 <btn-g mat-dialog-close [name]="'Cancelar'" [icon]="'cancel'" (btn)="clickedNo('cancel')"></btn-g>
                </div>
                <div >
                 <button mat-dialog-close [disabled]="token.token == undefined" class="btn-settings" mat-raised-button type="button" mat-raised-button (click)="recovery(token.sendForm())">
                     <div >
                       <div  id="mat-icon-search-column">
                         <mat-icon>arrow_forward</mat-icon>
                       </div>
                       <div  id="vertical-line-divider">
                       </div>
                         <div >Reenviar</div>
                       </div>
                  </button>
              </div>
       </div>
</mat-card>
`,
  styles: [
    ` .delete-dialog-class {
      mat-dialog-container {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          border-top-right-radius: 20px;
          border-top-left-radius: 20px;
          padding: -330px;
          overflow: hidden;
          width: 100%;
          height: 100%;
      }
  }
  #mat-icon-search-column {
              margin-top:6px; margin-right:10px; margin-left:-5px;
            }
      mat-card{
       margin-top: -5px;
       margin-left: -25px;
       margin-right: -25px;
       margin-bottom: -25px
      }

      .font-body{
        font-family: Mynerve;
      }
      .margin{
        margin-top:30px;
      }
      .itemToBeDelete{
        font-family: Mynerve;
        font-weight: bold;
        color: rgb(156,33,29);

      }
      .space-top{
        padding-top:20px;
      }
      .btn-settings {
                        font-size: 15px;
                        color: white;
                        background-color: #2ba1a8;
                      }

   `
  ]
})
export class ResendEmailConfirmDialogComponent extends BaseForm implements OnInit {

  messageBody: string;
  email: string;
  btn1: string;
  btn2: string;
  id: number;
  resend: boolean = true;

  constructor(
    private _DialogRef: MatDialogRef<ResendEmailConfirmDialogComponent>, @Inject(MAT_DIALOG_DATA) private data: any,
    override _breakpointObserver: BreakpointObserver,
    private _auth: AuthenticationService,
  ) {
    super(_breakpointObserver)
    this.messageBody = this.data.messageBody;
    this.email = this.data.email;
    this.btn1 = this.data.btn1;
    this.btn2 = this.data.btn2;
    this.id = this.data.id;
  }
  private _validatorMessages = ValidatorMessages;
  get validatorMessages() {
    return this._validatorMessages
  }
  clickedYes() {
    this.resend = false;
  }
  clickedNo(no: string) {
    this._DialogRef.close(no);
  }
  recovery(tokenCaptcha: string) {
    if (this.formMain.controls['email'].valid && tokenCaptcha) {
      const retryConfirmPassword: RetryConfirmPassword = this.formMain.value;
      this._auth.retryConfirmEmailGenerateNewToken(retryConfirmPassword);
    }
  }

  formLoad() {
    return this.formMain = new FormGroup({
      email: new FormControl(this.email, [Validators.required, Validators.email]),
    });
  }
  ngOnInit(): void {
    this.formLoad();
  }

}
