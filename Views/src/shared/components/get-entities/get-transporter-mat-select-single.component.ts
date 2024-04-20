import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PartnerDto } from 'src/components/main/partner/dto/partner-dto';
import { CustomersService } from 'src/components/out-sourced/collect-deliver/components/add/services/customers.service';
import { PartnerService } from 'src/components/out-sourced/collect-deliver/components/add/services/partner.service';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';

@Component({
  selector: 'get-transporter-matselect-single',
  standalone: true,
  imports: [
    MatSelectModule,
    NgxMatSelectSearchModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CommonModule
  ],
  template: `
 <div [formGroup]="formMain" fxLayout="column">
 <mat-form-field  appearance="outline" fxFlex>
        <mat-label>Transportador</mat-label>
        <mat-select [formControl]="selectTransporter" placeholder="Pesquise pelo nome" #singleSelect (blur)="onBlur()" (selectionChange)="onPartnerSelected(singleSelect.value)">
            <mat-option *ngFor="let transporter of $transporters | async" [value]="transporter">
                {{transporter.name}}
            </mat-option>
        </mat-select>

    </mat-form-field>
 </div>
  `,
  styles: [`

  `],
  providers: [PartnerService],
})
export class GetTransporterMatSelectSingleComponent extends BaseForm {


  constructor(
    private _partnerService: PartnerService,
    private _fb: FormBuilder,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  @Input() override formMain: FormGroup;

  companyId: number = JSON.parse(localStorage.getItem('companyId'));

  selectTransporter = new FormControl();
  $transporters = this._partnerService.getAllTransporters(this.companyId.toString())

  @Output() onBlurEvent = new EventEmitter<void>();
  onBlur() {
    this.onBlurEvent.emit();
  }

  @Output() transporterSelected = new EventEmitter<PartnerDto>();
  onPartnerSelected(value: PartnerDto) {
    this.formMain.get('transporterId').setValue(value.id);
    this.transporterSelected.emit(value)
  }

}
