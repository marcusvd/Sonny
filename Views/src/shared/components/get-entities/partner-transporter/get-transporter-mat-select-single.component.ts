import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';


import { Observable } from 'rxjs/internal/Observable';
import { PartnerDto } from 'src/components/main/partner/commons-components/dtos/partner-dto';
import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { PartnerTransporterGetService } from './partner-transporter-get.service';

@Component({
  selector: 'get-transporter-matselect-single',
  standalone: true,
  imports: [
    MatSelectModule,
    NgxMatSelectSearchModule,
    ReactiveFormsModule,
    CommonModule
  ],
  template: `
 <div [formGroup]="formMain" >
 <mat-form-field  appearance="outline" >
        <mat-label>Transportador</mat-label>
        <mat-select placeholder="Pesquise pelo nome" #singleSelect (blur)="onBlur()" (selectionChange)="onPartnerSelected(singleSelect.value)" formControlName="transporterId">
            <mat-option *ngFor="let transporter of $transporters | async" [value]="transporter.id">
                {{transporter.name}}
            </mat-option>
        </mat-select>
<mat-error
                    *ngIf="this.formMain.get('transporterId').hasError('required') && this.formMain.get('transporterId').touched">
                    <span>{{validatorMessages.required(formMain, 'transporterId', 'Transportador')}}</span>
                </mat-error>
    </mat-form-field>
 </div>
  `,
  styles: [`

  `],
  providers: [PartnerTransporterGetService],
})
export class GetTransporterMatSelectSingleComponent extends BaseForm implements OnChanges {

  constructor(
    private _partnerService: PartnerTransporterGetService,
    private _fb: FormBuilder,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }


  ngOnChanges(changes: SimpleChanges): void {
    this.$transporters = this._partnerService.getAll(this.companyId.toString(), `partners/${this.urlBackEndApi}`);
  }


  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  @Input() override formMain: FormGroup;
  urlBackEndApi: string = 'GetAllTransportersByCompanyIdAsync';

  $transporters: Observable<PartnerDto[]>;

  @Output() onBlurEvent = new EventEmitter<void>();
  onBlur() {
    this.onBlurEvent.emit();
  }

  @Output() transporterSelected = new EventEmitter<PartnerDto>();
  onPartnerSelected(value: number) {
    this?.$transporters?.subscribe(x => {
      this?.transporterSelected?.emit(x.find(y => y.id === value));
    })
  }

}
