import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmModalComponent } from "src/shared/components/confirm-modal/confirm-modal.component";
import { ValidatorsService } from "src/shared/helpers/validators.service";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { MsgOperation } from "src/shared/services/messages/snack-bar.service";
import { environment } from "src/environments/environment";
import { ServiceBudgetDto } from "../dto/service-budget-dto";
import { SolutionPriceDto } from "../dto/solution-price-dto";
import { take } from "rxjs/operators";
import { ClientListService } from "src/components/administrative/client/services/client-list.service";
import { ClientDto } from "src/components/administrative/client/dto/client-dto";


@Injectable()

export class ServicesBudgetInfoEditService extends BackEndService<ServiceBudgetDto, number>{

  private _formMain: FormGroup;
  private _formPriceService: FormGroup;
  private _radioValue: string;
  private _both: boolean;
  private _pickup: boolean;
  // private _send: boolean;
  private _osMakeCheck: boolean;
  // private _emailField: boolean;
  private _total: number = 0;

  constructor(
    protected _Http: HttpClient,
    private _Fb: FormBuilder,
    private _SnackBar: MsgOperation,
    private _LoadClient: ClientListService,
    private _Dialog: MatDialog,
    public _ValidationMsg: ValidatorsService,

  ) {
    super(_Http, environment._SERVICES_BUDGET, environment._SERVICES_BUDGET_INCLUDED);

  }

  // get emailSend(): boolean {
  //   return this._send;
  // }
  // get osMakeCheck(): boolean {
  //   return this._send;
  // }
  get pricesServices(): FormArray {
    return <FormArray>this._formMain.get('solutionsPrices');
  }
  get pricesCalc(): number {

    let nResult: number = 0;
    let pArray: SolutionPriceDto[] =
      this._formMain.get('solutionsPrices').value as SolutionPriceDto[];

    let nPrices: number[] = pArray.map(x => x.priceService);
    nPrices

    nPrices.forEach((n) => {
      nResult += Number(n);
    })

    return nResult;

  }

  loadCalcs(loaded: SolutionPriceDto[]): number {
    const prices: number[] = loaded.map(x => x.priceService)
    prices.forEach((p: number) => {
      this._total += p;
    })
    const result = this._total;
    return result;
  }
  // loadNServices(loaded: SolutionPriceDto[]): number {
  //   const prices: number[] = loaded.map(x => x.priceService)
  //   prices.forEach((p: number) => {
  //     this._total += p;
  //   })
  //   const result = this._total;
  //   return result;
  // }
  makeMoney(id: number) {
    this.loadByIdIncluded$(id).subscribe(
      (sb: ServiceBudgetDto) => {

        //client: Client
        const dialogRef = this._Dialog.open(ConfirmModalComponent, {
          width: '500px',
          // height: '1000px',
          data: {
            sb, msg: `Será gerado uma COBRANÇA no financeiro para: ${sb.client.name.toLocaleUpperCase()},
            se clicar em sim, este serviço só poderá ser visualizado na área de financeiro.
            Tem certeza que deseja continuar?`, btn1: 'Sim', btn2: 'Não'
          },
        });

        dialogRef.disableClose = true;
        // dialogConfig.autoFocus = true;

        dialogRef.afterClosed()
          .pipe(take(1))
          .subscribe((item) => {

            if (item == "no") {

              console.log('you´ve clicked NO');
              //this.loadAllFromDb();
            }
            if (item == "yes") {

              let toSave: ServiceBudgetDto = sb;
              toSave.finished = true;

              this.update$<ServiceBudgetDto>(toSave).subscribe((entity: ServiceBudgetDto) => {
                this._SnackBar.msgCenterTop(`Parceiro ${toSave.client.name} O.S foi encaminhada.`, 0, 5);
                this.loadAllFromDb();
              });

            }


          })

      },
      (err: Error) => { console.log(err) },
      () => { }
    )



  }

  loadAllFromDb() {
    this.recordsFromDb = [];
    this.loadAll$().subscribe((srvget: ServiceBudgetDto[]) => {

      srvget.forEach((srvBudget: ServiceBudgetDto) => {

        // console.log(srvBudget)
        const tmp: ServiceBudgetDto = srvBudget;

        this._LoadClient.getCliAsyncById(srvBudget.clientId).subscribe(
          (cli: ClientDto) => {
            tmp.client = cli

            this.recordsFromDb.push(tmp);
          },
          (err: Error) => { console.log(err) },
          () => { }
        )
      })

    });
  }

  recordsFromDb: ServiceBudgetDto[] = [];
  status: string[] = [
    'Em andamento...',
    'Aguardando peças',
    'Aguardando o cliente',
    'Tentando uma nova abordagem',
    'Sem reparo',
    'Finalizado'
  ];

  get formGet(): FormGroup {
    return this._formMain;
  }

  add() {
    this.pricesServices.push(this.formPricesServices())
  }

  remove(i: number) {
    this.pricesServices.removeAt(i);
  }

  formMain(loaded: ServiceBudgetDto) {
    this._formMain = this._Fb.group({
      client: [loaded.client, []],
      clientId: [loaded.clientId, []],
      entryDate: [loaded.entryDate, []],
      entryDateOs: [loaded.entryDateOs, []],
      clientProblems: [loaded.clientProblems, []],
      status: [loaded.status, []],
      visually: [loaded.visually, []],
      osMake: [loaded.osMake, []],
      finished: [false, []],
      solutionsPrices: this._Fb.array([]),
    })

    this.seeding(loaded.solutionsPrices);

  }

  formPricesServices(): FormGroup {
    return this._formPriceService = this._Fb.group({
      technician: ['', []],
      dateService: [new Date(), []],
      priceService: ['', []],
      technicalSolution: ['', []],
      remote: [false, []],
      solved: [false, []],
      authorized: [false, []],
      comment: ['', []],
    })
  }

  seeding(loaded: SolutionPriceDto[]) {
    loaded.forEach((item: SolutionPriceDto) => {
      this.pricesServices.push(this._Fb.group(item))
    })

  }

  save(id: number) {

    this._formMain.value.id = id;
    const toSave: ServiceBudgetDto = { ...this._formMain.value }
    console.log(this._formMain.value)
    this.update$<ServiceBudgetDto>(toSave).subscribe(
      (srvBudgetDto: ServiceBudgetDto) => {
        this._SnackBar.msgCenterTop(`Orçamento`, 0, 5);
        this._ValidationMsg.cleanAfters(['contact', 'addresss'], this._formMain);
      },
      (error) => { console.log(error) },
      () => {
        console.log('complete')
      },

    )
  }






}
