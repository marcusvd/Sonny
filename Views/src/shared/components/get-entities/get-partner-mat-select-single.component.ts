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
import { CustomersService } from 'src/components/out-sourced/collect-deliver/services/customers.service';
import { PartnerService } from 'src/components/out-sourced/collect-deliver/services/partner.service';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';

@Component({
  selector: 'get-partner-matselect-single',
  standalone: true,
  imports: [
    MatSelectModule,
    NgxMatSelectSearchModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CommonModule
  ],
  template: `
 <div  [formGroup]="formMain" fxLayout="column">
 <mat-form-field  appearance="outline" fxFlex>
        <mat-label>Parceiros</mat-label>
        <mat-select  [formControl]="selectPartner" placeholder="Pesquise pelo nome" #singleSelect name="partnerId" (blur)="onBlur()" (selectionChange)="onPartnerSelected(singleSelect.value)">
            <mat-option>
                <ngx-mat-select-search [formControl]="selectFilterPartner" (input)="searchPartner()" placeholderLabel="Pesquise pelo nome" name="searchPartner"></ngx-mat-select-search>
            </mat-option>
            <mat-option *ngFor="let partner of $partnersResult | async" [value]="partner">
                {{partner.name}}
            </mat-option>
        </mat-select>
    </mat-form-field>
 </div>
  `,
  styles: [`

  `],
  providers: [PartnerService],
})
export class GetPartnerMatSelectSingleComponent extends BaseForm {

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

  $partners = this._partnerService.getAllPartners(this.companyId.toString())
  $partnersResult = new Observable<PartnerDto[]>();

  @Output() partnerSelected = new EventEmitter<PartnerDto>();
  onPartnerSelected(value: PartnerDto) {
    this.formMain.get('partnerId').setValue(value.id);
    this.partnerSelected.emit(value)
  }

  @Output() onBlurEvent = new EventEmitter<void>();
  onBlur() {
    this.onBlurEvent.emit();
  }

  selectPartner = new FormControl();
  selectFilterPartner = new FormControl();
  searchPartner() {
    this.$partnersResult = this.selectFilterPartner.valueChanges.pipe(

      x => this.$partners.pipe(
        map(xy => xy.filter(y => y.name.toLocaleLowerCase().includes(this.selectFilterPartner.value.toLocaleLowerCase()))))

    )
  }

}
