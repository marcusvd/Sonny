
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { Observable } from 'rxjs/internal/Observable';


import { PartnerDto } from '../../../../components/main/partner/dtos/partner-dto';
import { BaseForm } from '../../../../shared/components/inheritance/forms/base-form';
import { PartnerTransporterGetService } from './partner-transporter-get.service';

@Component({
  selector: 'get-transporter-matselect-single',
  standalone: true,
  templateUrl: './get-transporter-mat-select-single.component.html',
  styleUrls: ['./get-transporter-mat-select-single.component.scss'],
  imports: [
    MatSelectModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [PartnerTransporterGetService],
})
export class GetTransporterMatSelectSingleComponent extends BaseForm implements OnChanges {

  constructor(
    private _partnerService: PartnerTransporterGetService,
    private _fb: FormBuilder,
  ) { super() }


  ngOnChanges(changes: SimpleChanges): void {
    this.$transporters = this._partnerService.getAll(this.companyId.toString(), `partners/${this.urlBackEndApi}`);
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
