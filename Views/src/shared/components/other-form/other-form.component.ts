import { AfterViewChecked, AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { OtherFormService } from './other-form.service';

@Component({
  selector: 'other-form',
  template: `
<div fxLayout="column" [formGroup]="formMain">
      <div fxLayout="row">
        <mat-form-field appearance="outline" [fxFlex]="fxFlex">
            <mat-label>Nome / Identificação</mat-label>
          <input matInput type="text" formControlName="noRegisterName">
        </mat-form-field>
    </div>
    <div fxLayout="row" >
        <mat-form-field appearance="outline" [fxFlex]="fxFlex">
            <mat-label>Endereço / Contatos</mat-label>
          <input matInput type="text" formControlName="noRegisterAddress">
        </mat-form-field>
    </div>
</div>
  `,
  styles: [`
  `]
})
export class OtherFormComponent implements OnInit, OnChanges {

  constructor(private _otherFormService: OtherFormService) { }

  ngOnChanges(changes: SimpleChanges): void {

  }

  @Input() fxFlex: number;

  get formMain() {
    return this._otherFormService.formMain
  }

  ngOnInit(): void {
    this._otherFormService.formLoad();
  }



}
