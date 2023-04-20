import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { CaptchaService } from './services/captcha.service';

@Component({
  selector: 'captcha', template: `
   <div fxLayout="column" (click)="this.check(form)" >
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
                <button mat-button color="primary" (click)="teste()">
test
                </button>
            </div>
        </form>
    </div>
`,
  styles: [
    `
.error-message {
  color:red;
}

`
  ]
})

export class CaptchaComponent {
  @Input() retorno: boolean = false;
  @Output() result:EventEmitter<string> = new EventEmitter<string>();


  // formSend: NgForm;

  // @Input() change: boolean;
  token: string | undefined;
  constructor(private _captchaService: CaptchaService,

    ) {
    this.token = undefined;
  }

  teste() {
    this.result.emit(this.token)
    console.log(this.token)
  }

  // get token():string {
  //   return
  // }

  check(form: NgForm) {
    this._captchaService.token = this.token
    if (form.invalid) {
      for (const control of Object.keys(form.controls)) {
        form.controls[control].markAsTouched();
      }

      this.result.emit(this.token)
    }
    else {
      this.result.emit(this.token)
    }
  }
  formFlag() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.result.emit(this.token)

  }




}
