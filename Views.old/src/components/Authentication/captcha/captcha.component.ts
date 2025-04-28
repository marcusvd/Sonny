import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { Form, FormsModule, NgForm, NgModel } from '@angular/forms';
import { CaptchaService } from './services/captcha.service';
import { CommonModule, NgIf } from '@angular/common';
import { RecaptchaComponent, RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';

@Component({
  selector: 'captcha', template: `
   <div fxLayout="column">
        <form #form="ngForm" >
            <div fxLayout="row">
                <re-captcha  id="recaptcha" name="recaptcha" #recaptcha="ngModel" [(ngModel)]="token" required [class.is-invalid]="recaptcha.invalid && (recaptcha.dirty || recaptcha.touched)"></re-captcha>
            </div>
            <br>
            <div fxLayout="row" class="error-message">
                <div *ngIf="recaptcha.invalid && (recaptcha.dirty || recaptcha.touched)" class="invalid-feedback">
                    <div *ngIf="recaptcha.errors?.['required']">Resposta incorreta para o desafio do captcha.</div>
                    <div *ngIf="recaptcha.errors?.['required']">Tente novamente.</div>
                </div>
            </div>
        </form>
    </div>

    <!-- <div>{{token}}</div> -->
`,
  styles: [
    `
.error-message {
  color:red;
}

`,
  ],
  standalone: true,
  imports: [
    NgIf,
    CommonModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    FormsModule
  ]
})

export class CaptchaComponent {

  token: string | undefined;
  @ViewChild('form') ngFormNode: NgForm

  constructor() {
    this.token = undefined;
  }

  sendForm(): string {
    if (this.ngFormNode.invalid) {
      for (const control of Object.keys(this.ngFormNode.controls)) {
        this.ngFormNode.controls[control].markAsTouched();
      }
      return this.token
    }
    else {
      return this.token
    }
  }





}
