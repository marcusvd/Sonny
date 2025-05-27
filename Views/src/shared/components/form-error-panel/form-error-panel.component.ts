import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { IControlErrorsDictionary } from './interfaces/icontrols-errors-dictionary';

@Component({
  selector: 'form-error-panel',
  template: `
  <nav>
    <ul>
      <li>Motivo:</li>
        <br>
        <div *ngFor="let control of formTranslated.value | keyvalue">
           <div >
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
  @Input() formTranslated: FormGroup;

  controlsToCheck: IControlErrorsDictionary<string> = {

    'transporterId': 'Transportador',
    'subjectReason': 'Motivo',
    'contactName': 'Contato no local',
    'destinyCustomerId': 'Destino Cliente',
    'destinyPartnerId': 'Destino Parceiro',
    'destinyNoRegisterName': 'Destino não cadastrado',
    'destinyNoRegisterAddress': 'Destino não cadastrado',
    'collect': 'COLETA/ENTREGA/OUTROS',
    'deliver': 'COLETA/ENTREGA/OUTROS',
    'other': 'COLETA/ENTREGA/OUTROS',
    'taskOverView': 'Descrição',
    'base': 'Cobrar Esta empresa',
    'paymentPartnerId': 'Cobrar Parceiro',
    'paymentCustomerId': 'Cobrar Cliente',
  }


  
  ngOnInit(): void {
    console.log(this.form);
  }









}
