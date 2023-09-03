import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';

@Component({
  selector: 'form-error-panel-collect-deliver',
 templateUrl:'tmp.html',
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
