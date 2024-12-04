import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';


import { Observable } from 'rxjs/internal/Observable';
import { PartnerDto } from 'src/components/main/partner/commons-components/dtos/partner-dto';
import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { GetSupliersService } from './get-supliers.service';

@Component({
  selector: 'get-suppliers',
  standalone: true,
  imports: [
    MatSelectModule,
    NgxMatSelectSearchModule,
    ReactiveFormsModule,
    CommonModule
  ],
  template: `

 <mat-form-field  appearance="outline" [formGroup]="formMain" fxLayout="column">
        <mat-label>Fornecedor</mat-label>
        <mat-select  #singleSelect (blur)="onBlur()" (selectionChange)="onPartnerSelected(singleSelect.value)" formControlName="supplierId">
            <mat-option *ngFor="let supplier of suppliers$ | async" [value]="supplier.id">
                {{supplier.name}}
            </mat-option>
        </mat-select>
                <mat-error
                    *ngIf="this.formMain.get('supplierId').hasError('required') && this.formMain.get('supplierId').touched">
                    <span>{{validatorMessages.required(formMain, 'supplierId', 'Transportador')}}</span>
                </mat-error>
    </mat-form-field>

  `,
  styles: [`
    mat-form-field{
      width: 100%;
    }
    mat-select{
      width: 100%;
    }
  `],
  providers: [GetSupliersService],
})
export class GetSuppliersComponent extends BaseForm implements OnChanges {

  constructor(
    private _supliersService: GetSupliersService,
    private _fb: FormBuilder,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }


  ngOnChanges(changes: SimpleChanges): void {
    this.suppliers$ = this._supliersService.getAll(this.companyId.toString(), `partners/${this.urlBackEndApi}`);
  }


  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  @Input() override formMain: FormGroup;
  urlBackEndApi: string = 'GetAllHardwareSupplierByCompanyIdAsync';

  suppliers$: Observable<PartnerDto[]>;

  @Output() onBlurEvent = new EventEmitter<void>();
  onBlur() {
    this.onBlurEvent.emit();
  }

  @Output() supplierSelected = new EventEmitter<PartnerDto>();
  onPartnerSelected(value: number) {
    this?.suppliers$?.subscribe(x => {
      this?.supplierSelected?.emit(x.find(y => y.id === value));
    })
  }

}
