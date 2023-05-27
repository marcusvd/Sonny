import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { IControlErrorsDictionary } from './interfaces/icontrols-errors-dictionary';

@Component({
  selector: 'form-error-panel',
  template: `
  <nav>
    <ul>
      <li>Motivo:</li>
        <br>
        <div *ngFor="let control of controlsToCheck | keyvalue">
           <div fxLayout="row">
                <mat-error>
                  <span>{{validatorMessages.required(form, control.key, control.value)}}</span>
                </mat-error>
            </div>
        </div>

</ul>
                <br>
</nav>
  `,
  styles: [`
.remove-text-decoration{
  text-decoration: none;
}
  `]
})

export class FormErrorPanelComponent implements OnInit {
  @Input() form: FormGroup;


  controlsToCheck: IControlErrorsDictionary<string> = {
    'subject': 'Motivo',
    'ownerResponsible': 'Responsável',
    'collect': 'Coleta',
    'deliver': 'Entrega',
    'customer': 'Cliente',
    'partner': 'Parceiro',
    'itemsCollected': 'Descrição dos itens coletados',
    'itemsDelivered': 'Descrição dos itens entregues',
    'comments': 'Observações',
    'start': 'Data',
    'price': 'Valor',
    'transporterNoregisterd': 'Transportador não cadastrado',
    'transporterId': 'Transportador',
    'noRegisterName': 'Não cadastrado',
    // 'noRegisterAddress':'Motivo',
  }


  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }
  ngOnInit(): void {
    console.log(this.form);
  }









}
