import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { take } from "rxjs/operators";

import { BackEndService } from "src/shared/services/back-end/backend.service";
import { MsgOperation } from "src/shared/services/messages/snack-bar.service";
import { environment } from "src/environments/environment";
import { ServiceBudgetDto } from "../dto/service-budget-dto";
import { SolutionPriceDto } from "../../dtos/solution-price-dto";
import { DialogQuizComponent } from "src/shared/components/dialog-quiz/dialog-quiz.component";
import { CustomerDto } from "src/components/customer/dto/customer-dto";
import { ClientListService } from "src/components/customer/components/client-list/services/client-list.service";



@Injectable()
export class ServicesBudgetInfoEditService extends BackEndService<ServiceBudgetDto, number>{

  private _formMain: UntypedFormGroup;
  private _formPriceService: UntypedFormGroup;
  private _radioValue: string;
  private _both: boolean;
  private _pickup: boolean;
  // private _send: boolean;
  private _osMakeCheck: boolean;
  // private _emailField: boolean;
  private _total: number = 0;

  constructor(
    protected _Http: HttpClient,
    private _Fb: UntypedFormBuilder,
    private _SnackBar: MsgOperation,
    private _LoadClient: ClientListService,
    private _Dialog: MatDialog,

  ) {
    super(_Http, environment._SERVICES_BUDGET, environment._SERVICES_BUDGET_BY_ID_INCLUDED);

  }

  get pricesServices(): UntypedFormArray {
    return <UntypedFormArray>this._formMain.get('solutionsPrices');
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

        //customer: Client
        const dialogRef = this._Dialog.open(DialogQuizComponent, {
          width: '500px',
          // height: '1000px',
          data: {
            sb, msg: `Será gerado uma COBRANÇA no financeiro para: ${sb.customer.name.toLocaleUpperCase()},
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
              // toSave.finished = true;

              this.update$<ServiceBudgetDto>(toSave).subscribe((entity: ServiceBudgetDto) => {
                this._SnackBar.msgCenterTop(`Parceiro ${toSave.customer.name} O.S foi encaminhada.`, 0, 5);
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

        this._LoadClient.getCliAsyncById(srvBudget.customerId).subscribe(
          (cli: CustomerDto) => {
            tmp.customer = cli

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
    'Aguardando o customere',
    'Tentando uma nova abordagem',
    'Sem reparo',
    'Finalizado'
  ];

  get formGet(): UntypedFormGroup {
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
      customer: [loaded.customer, []],
      customerId: [loaded.customerId, []],
      budgetStartedIn: [loaded.budgetStartedIn, []],
      benchStartedIn: [loaded.benchStartedIn, []],
      customerProblems: [loaded.customerProblems, []],
      status: [loaded.status, []],
      visually: [loaded.visually, []],
      // osMake: [loaded.osMake, []],
      finished: [false, []],
      solutionsPrices: this._Fb.array([]),
    })

    this.seeding(loaded.solutionsPrices);

  }

  formPricesServices(): UntypedFormGroup {
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
             },
      (error) => { console.log(error) },
      () => {
        console.log('complete')
      },

    )
  }

}
