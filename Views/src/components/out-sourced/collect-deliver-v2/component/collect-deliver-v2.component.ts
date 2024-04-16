import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { CustomersService } from '../services/customers.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, observable, of } from 'rxjs';
import { CustomerDto } from 'src/components/main/customer/dtos/customer-dto';
import { map } from 'rxjs/operators';
import { CollectDeliverDto } from '../../collect-deliver/collect-deliver-create/dto/collect-deliver-dto';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { BreakpointObserver } from '@angular/cdk/layout';
import { PartnerService } from '../services/partner.service';
import { PartnerDto } from 'src/components/main/partner/dto/partner-dto';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';

@Component({
  selector: 'collect-deliver-v2',
  standalone: true,
  imports: [MatSelectModule, NgxMatSelectSearchModule, CommonModule, ReactiveFormsModule, MatDividerModule],
  templateUrl: './collect-deliver-v2.component.html',
  styleUrls: ['./collect-deliver-v2.component.css'],
  providers: [CustomersService, PartnerService],
})
export class CollectDeliverV2Component extends BaseForm implements OnInit {

  constructor(
    private _customersService: CustomersService,
    private _partnerService: PartnerService,
    private _fb: FormBuilder,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {

            break;
          }
          case 'small': {

            break;
          }
          case 'medium': {

            break;
          }
          case 'large': {

            break;
          }
          case 'xlarge': {

            break;
          }
        }
      }
    })
  }


  companyId: number = JSON.parse(localStorage.getItem('companyId'));

  selectTransporter = new FormControl();
  $transporters = this._partnerService.getAllTransporters(this.companyId.toString())

  $customers = this._customersService.getAll(this.companyId.toString())
  $customersResult = new Observable<CustomerDto[]>();

  selectCustomer = new FormControl();
  selectFilterCustomer = new FormControl();

  searchCustomer() {
    this.$customersResult = this.selectFilterCustomer.valueChanges.pipe(

      x => this.$customers.pipe(
        map(xy => xy.filter(y => y.name.toLocaleLowerCase().includes(this.selectFilterCustomer.value.toLocaleLowerCase()))))

    )
  }


  $partners = this._partnerService.getAllPartners(this.companyId.toString())
  $partnersResult = new Observable<PartnerDto[]>();

  selectPartner = new FormControl();
  selectFilterPartner = new FormControl();
  searchPartner() {
    this.$partnersResult = this.selectFilterPartner.valueChanges.pipe(

      x => this.$partners.pipe(
        map(xy => xy.filter(y => y.name.toLocaleLowerCase().includes(this.selectFilterPartner.value.toLocaleLowerCase()))))

    )
  }








  clearResult() {
    this.$customersResult = of([]);
  }


  destiny: FormGroup;

  formLoad(entity?: CollectDeliverDto) {
    return this.formMain = this._fb.group({
      id: [entity?.id || 0, []],
      companyId: [entity?.companyId || localStorage.getItem("companyId"), [Validators.required]],
      userId: [entity?.userId || localStorage.getItem("userId"), [Validators.required]],
      transporterId: [entity?.transporterId || '', [Validators.required]],
      subjectReason: [entity?.subjectReason || '', [Validators.required, Validators.maxLength(150)]],
      contactName: [entity?.contactName || '', [Validators.required, Validators.maxLength(50)]],
      price: [entity?.price || 0, [Validators.required]],
      collect: [entity?.collect || false, []],
      deliver: [entity?.deliver || false, []],
      other: [entity?.other || false, []],
      taskOverView: [entity?.taskOverView || '', [Validators.required, Validators.maxLength(1000)]],
      billingFrom: this.subForm = this._fb.group({
        partnerId: [entity?.billingFrom?.partnerId || null, []],
        customerId: [entity?.billingFrom?.customerId || null, []],
        base: [entity?.billingFrom?.base || true, []]
      }),
      destiny: this.destiny = this._fb.group({
        customerId: [entity?.destiny?.customerId ||  null, []],
        partnerId: [entity?.destiny?.partnerId || null, []],
        noRegisterName: [entity?.destiny?.noRegisterName || null, []],
        noRegisterAddress: [entity?.destiny?.noRegisterAddress || null, []]
      }),
    })
  }

  ngOnInit(): void {
    this.formLoad();
  }

}
