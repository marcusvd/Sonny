import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ClientDto } from "src/components/client/dto/client-dto";
import { ClientListService } from "src/components/client/client-list/services/client-list.service";
import { SupplierDto } from "src/components/providers/supplier/dto/supplier-dto";
import { TypePaymentCrudService } from "src/components/providers/supplier/services/supplier-crud.service";
import { ValidatorsService } from "src/shared/helpers/validators.service";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { MsgOperation } from "src/shared/services/messages/snack-bar.service";
import { environment } from "src/environments/environment";
import { CardDto } from "../../../card/dto/card-dto";
import { CheckingAccountDto } from "../../../../dto/checking-account-dto";
import { CheckingAccountService } from "../../../../services/checking-account.service";
import { TypePaymentDto } from "../../../../dto/type-payment-dto";
import { DailyInFlowDto } from "../dto/daily-in-flow-dto";
import { ServiceBudgetDto } from "src/components/services-provision/service-budget/dto/service-budget-dto";

@Injectable()
export class InflowCrudService extends BackEndService<DailyInFlowDto, number> {

  private formMain: FormGroup;
  // private _arrayOfTypes: string[] = [];
  private _suppliers: SupplierDto[] = [];
  private _typePaymentDto: TypePaymentDto[] = [];
  private _clients: ClientDto[] = [];
  private _checkingAccountDto: CheckingAccountDto[] = [];
  // private readonly _API_URL_INFLOW: string = `${environment._INFLOW}`
  // private readonly _API_URL_CLIENTS: string = `${environment._CLIENTS}`
  startDate = new Date();


  constructor(
    protected _Http: HttpClient,
    private _ValidationMsg: ValidatorsService,
    private _SnackBar: MsgOperation,
    private _FormBuilder: FormBuilder,
    private _PaymentCrudT: TypePaymentCrudService,
    private _CrudCCount: CheckingAccountService,
    private _ClientList: ClientListService,
  ) {
    super(_Http, environment._INFLOW)
  }

  _serviceBudget: ServiceBudgetDto[] = [];

  get getServiceBudget() {
    return this._serviceBudget;
  }

  callAll() {
    this._PaymentCrudT.loadAll$<TypePaymentDto>().subscribe({
      next: ((_typePaymentDto: TypePaymentDto[]) => { this._typePaymentDto = _typePaymentDto }), error: (err) => {
        console.log('erro', err)
      }, complete: () => {
        console.log('completo')
      }
    })

    this._ClientList.loadAll$<ClientDto>().subscribe({
      next: ((_client: ClientDto[]) => {
        this._clients = _client;
      }), error: (err) => {
        console.log('client', err)
      }, complete: () => {
        console.log('completo')
      }
    })

    this._CrudCCount.loadAll$<CheckingAccountDto>().subscribe({
      next: ((_ckacc: CheckingAccountDto[]) => {
        this._checkingAccountDto = _ckacc;
      }), error: (err) => {
        console.log('erro', err)
      }, complete: () => {
        console.log('completo')
      }
    })

    this._Http.get(environment._SERVICES_BUDGET).subscribe((srvget: ServiceBudgetDto[]) => {
      this._serviceBudget = srvget;
      console.log(srvget)


    })




    // return false;





  }


  get formGet(): FormGroup {
    return this.formMain;
  }

  get clients(): ClientDto[] {
    return this._clients;
  }
  get cckAcc(): CheckingAccountDto[] {
    return this._checkingAccountDto;
  }
  get typePay(): TypePaymentDto[] {
    return this._typePaymentDto;
  }

  get beginDate(): Date {
    return this.startDate;
  }

  formLoad() {
    return this.formMain = this._FormBuilder.group({
      today: ['', []],
      clientid: ['', []],
      typepaymentid: ['', []],
      checkingaccountid: ['', []],
      service: ['', []],
      amount: ['', []],
      description: ['', []],

    })
  }
  save() {

    if (this.formMain.valid) {


      const InFlow: DailyInFlowDto = { ...this.formMain.value };
      console.log(InFlow);


      this.add$<DailyInFlowDto>(InFlow).subscribe(item => {
        this._SnackBar.msgCenterTop(`Quantia de ${InFlow.amount} foi adicionado a ${InFlow}`, 0, 5);
        //CLEAN Fields and forms for the next new insertion
        this._ValidationMsg.cleanAfters(['contact', 'addresss'], this.formMain)
        // this._RouteList.navigate(['/supplier']);
        console.log(item);
      })
    }

  }

}
