import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';

@Component({
  selector: 'form-error-panel-collect-deliver',
 template:`<div *ngFor="let formTranslated of formTranslateds">
 <div *ngFor="let control of formTranslated?.value | keyvalue">
     <div *ngFor="let form of forms">
         <div fxLayout="row">
             <mat-error>
                 <span>{{validatorMessages.required(form, control?.key, control?.value)}}</span>
             </mat-error>
         </div>
     </div>
 </div>
</div>`,
  styles: [`
.remove-text-decoration{
  text-decoration: none;
}
  `]
})

export class FormErrorPanelCollectDeliverComponent implements OnInit {
  @Input() forms: FormGroup[];
  @Input() formTranslateds: FormGroup[];


  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }
  ngOnInit(): void {
    // console.log(this.form);
  }









}
