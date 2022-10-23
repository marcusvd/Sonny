import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';
import * as _moment from 'moment';
import { environment } from 'src/environments/environment';
import { ClientDto } from 'src/components/client/dto/client-dto';
import { OutflowCrudService, OutTypePaymentCrudService } from '../services/outflow-crud.service';
import { SupplierDto } from 'src/components/providers/supplier/dto/supplier-dto';
import { TypePaymentDto } from '../../../../dto/type-payment-dto';
import { CheckingAccountService } from '../../../../services/checking-account.service';
import { CheckingAccountDto } from '../../../../dto/checking-account-dto';
import { DailyOutFlowDto } from './dto/daily-outflow-dto';
import { MsgOperation } from 'src/shared/services/messages/snack-bar.service';




const moment = _moment;



@Component({
  selector: 'outflow-create',
  templateUrl: './daily-outflow-create.component.html',
  styleUrls: ['./daily-outflow-create.component.css'],
})
export class DailyOutflowCreateComponent implements OnInit {


  public _formOutflow: FormGroup;
  public _arrayOfTypes: string[] = [];
  public _suppliers: SupplierDto[] = [];
  public _typePaymentDto: TypePaymentDto[] = [];
  public _clients: ClientDto[] = [];
  public _chekingAccountDto: CheckingAccountDto[] = [];
  private readonly _API_URL_INFLOW: string = `${environment._INFLOW}`
  private readonly _API_URL_CLIENTS: string = `${environment._CLIENTS}`

  constructor(
    private _SnackBar: MsgOperation,
     private _FormBuilder: FormBuilder,
    protected _CrudCCount:CheckingAccountService,
    // private _InFlowServices: InFlowServices,
    private _OutflowCrud: OutflowCrudService,
    private _PaymentCrudT: OutTypePaymentCrudService,

    // private _CliService: ClientService,
    // private _InventoriesService: InventoryService
  ) { }

  _form() {
    return this._formOutflow = this._FormBuilder.group({
      today: ['', []],
      name: ['', []],
      personorplace: ['', []],
      amount: ['', []],
      typepaymentid: ['', []],
      checkingaccountid: ['', []],
      description: ['', []],
    })
  }
  startDate = new Date(1986, 0, 1);
  save() {

    if (this._formOutflow.valid) {
      const OutFlow: DailyOutFlowDto = {...this._formOutflow.value}

      this._OutflowCrud.add$<DailyOutFlowDto>(OutFlow).subscribe(item => {


        this._SnackBar.msgCenterTop(`Quantia de ${OutFlow.amount} foi retirada como retirada`, 0, 5);
        //CLEAN Fields and forms for the next new insertion
        // this._RouteList.navigate(['/supplier']);


      })
    }

  }



  ngOnInit(): void {

    this._form();
    this._arrayOfTypes.push('Serviço', 'Venda');

    this._CrudCCount.loadAll$<CheckingAccountDto>().subscribe((_ckacc: CheckingAccountDto[]) => {
      this._chekingAccountDto = _ckacc;
      console.log(_ckacc);
    })

    this._PaymentCrudT.loadAll$<TypePaymentDto>().subscribe((_typePaymentDto: TypePaymentDto[]) => {
      this._typePaymentDto = _typePaymentDto
      console.log(_typePaymentDto)
    })



  }



  // this._ClientCrud.loadAll$<ClientDto>().subscribe((_client: ClientDto[]) => {
  //   this._clients = _client;
  //   console.log(_client)
  //   // console.log(_client);
  // })

}


