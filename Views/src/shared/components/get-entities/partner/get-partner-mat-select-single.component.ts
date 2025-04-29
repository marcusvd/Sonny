import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { Observable } from 'rxjs';


import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { map } from 'rxjs/operators';
import { PartnerDto } from 'src/components/main/partner/commons-components/dtos/partner-dto';
import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { PartnerGetService } from './partner-get.service';

@Component({
  selector: 'get-partner-matselect-single',
  standalone: true,
  imports: [
    MatSelectModule,
    NgxMatSelectSearchModule,
    ReactiveFormsModule,
    
    CommonModule
  ],
  template: `
 <div  [formGroup]="formMain" >
 <mat-form-field  appearance="outline" >
        <mat-label>Parceiros</mat-label>
      <mat-select placeholder="Pesquise pelo nome" #singleSelect name="partnerId" (blur)="onBlur()" (selectionChange)="onPartnerSelected(singleSelect.value)" formControlName="partnerId">
            <mat-option>
                <ngx-mat-select-search [formControl]="selectFilterPartner" (input)="searchPartner()" placeholderLabel="Pesquise pelo nome" name="searchPartner"></ngx-mat-select-search>
            </mat-option>
            <mat-option *ngFor="let partner of $partnersResult | async" [value]="partner.id">
                {{partner.name}}
            </mat-option>
        </mat-select>
        <mat-error>
                    <span>{{validatorMessages.required(formMain, 'partnerId', 'Parceiro')}}</span>
                </mat-error>
    </mat-form-field>
 </div>
  `,
  styles: [`

  `],
  providers: [PartnerGetService],
})
export class GetPartnerMatSelectSingleComponent extends BaseForm implements OnChanges {

  constructor(
    private _partnerService: PartnerGetService,
    private _fb: FormBuilder,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }


  ngOnChanges(changes: SimpleChanges): void {
    this.$partners = this._partnerService.getAll(this.companyId.toString(), `partners/${this.urlBackEndApi}`);

    if (this.editEntityField)
      this.$partnersResult = this.$partners;
  }

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  @Input() override formMain: FormGroup;
  @Input() urlBackEndApi: string = null;

  editEntityField: boolean = false;
  @Input() set editEntity(edit: boolean) {
    this.editEntityField = edit;
  }

  $partners: Observable<PartnerDto[]>;
  $partnersResult = new Observable<PartnerDto[]>();

  @Output() partnerSelected = new EventEmitter<PartnerDto>();
  onPartnerSelected(value: number) {
    this.$partnersResult.subscribe(x => {
      this.partnerSelected.emit(x.find(y => y.id === value));
    })
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
