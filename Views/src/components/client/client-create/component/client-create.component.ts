import { BreakpointObserver } from "@angular/cdk/layout";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BaseForm } from "src/shared/helpers/forms/base-form";
import { IScreen } from "src/shared/helpers/responsive/iscreen";
import { ValidatorsService } from "src/shared/helpers/validators/validators.service";
import { ClientCreateService } from "../services/client-create.service";



@Component({
  selector: 'client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.css'],
  providers: [
    ClientCreateService
  ]
})

export class ClientCreateComponent extends BaseForm implements OnInit {

  title: string = 'Cliente';
  subTitle: string = 'Cadastro';

  paymentDiscountExpirationCols: number = 3;
  paymentDiscountExpirationRowHeight: string = '120px';

  nameCnpjCpfCols: number = 2;
  nameCnpjCpfRowHeight: string = '120px';

  assuredClientTypeResponsibleCols: number = 3;
  assuredClientTypeResponsibleRowHeight: string = '140px';

  constructor(
    private _ClientService: ClientCreateService,
    private _Fb: FormBuilder,
    override _validatorsService: ValidatorsService,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_validatorsService, _breakpointObserver) }

  save() {
    this._ClientService.save(this.formMain);
  }

  valueDate() {
    return this._ClientService.valueAndDateChange();
  }

  get valueDateGet() {
    return this._ClientService.valueDateGet;
  }

  address($event?: any) {
    const evt: FormGroup = $event;
    return evt;
  }

  contact($event?: any) {
    const evt: FormGroup = $event;
    return evt;
  }

  formLoad(): FormGroup {
    return this.formMain = this._Fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      cnpj: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(14)]],
      responsible: ['', Validators.required, Validators.maxLength(100)],
      comments: ['', [Validators.maxLength(500)]],
      assured: ['', []],
      clientType: ['', []],
      payment: ['', []],
      expiration: ['', []],
      discount: [0, []],
      address: this.address(),
      contact: this.contact()
    })
  }

  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.paymentDiscountExpirationCols = 1;
            this.paymentDiscountExpirationRowHeight = '120px';
            this.nameCnpjCpfCols = 1;
            this.nameCnpjCpfRowHeight = '120px';
            this.assuredClientTypeResponsibleCols =1;
            this.assuredClientTypeResponsibleRowHeight ='140px'
            break;
          }
          case 'small': {
            this.paymentDiscountExpirationCols = 1;
            this.paymentDiscountExpirationRowHeight = '120px';
            this.nameCnpjCpfCols = 1;
            this.nameCnpjCpfRowHeight = '120px';
            this.assuredClientTypeResponsibleCols =1;
            this.assuredClientTypeResponsibleRowHeight ='140px'
            break;
          }
          case 'medium': {
            this.paymentDiscountExpirationCols = 2;
            this.paymentDiscountExpirationRowHeight = '120px';
            this.nameCnpjCpfCols = 2;
            this.nameCnpjCpfRowHeight = '120px';
            this.assuredClientTypeResponsibleCols =2;
            this.assuredClientTypeResponsibleRowHeight ='140px'
            break;
          }
          case 'large': {
            this.paymentDiscountExpirationCols = 3;
            this.paymentDiscountExpirationRowHeight = '120px';
            this.nameCnpjCpfCols = 2;
            this.nameCnpjCpfRowHeight = '120px';
            this.assuredClientTypeResponsibleCols =3;
            this.assuredClientTypeResponsibleRowHeight ='140px'
            break;
          }
          case 'xlarge': {
            this.paymentDiscountExpirationCols = 3;
            this.paymentDiscountExpirationRowHeight = '120px';
            this.nameCnpjCpfCols = 2;
            this.nameCnpjCpfRowHeight = '120px';
            this.assuredClientTypeResponsibleCols =3;
            this.assuredClientTypeResponsibleRowHeight ='140px'
            break;
          }
        }
      }
    })




  }

  ngOnInit(): void {
    this.formLoad();

  }

}







