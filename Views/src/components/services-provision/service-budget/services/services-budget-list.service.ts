import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CheckboxControlValueAccessor, FormBuilder, FormGroup } from "@angular/forms";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { environment } from "src/environments/environment";
import { ServiceBudgetDto } from "../dto/service-budget-dto";
import { ClientDto } from 'src/components/client/dto/client-dto'

import { ClientListService } from "src/components/client/client-list/services/client-list.service";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { take } from "rxjs/operators";
import { ConfirmModalComponent } from "src/shared/components/confirm-modal/confirm-modal.component";

import { ServiceBudgetCreateComponent } from "../service-budget-create/component/service-budget-create.component";
import { ServiceBudgetInfoEditComponent } from "../service-budget-info-edit/service-budget-info-edit.component";
import { MsgOperation } from "src/shared/services/messages/snack-bar.service";
import { DatasheetDetailsComponent } from "../../service-bench/datasheet/component/datasheet-details.component";
import { SolutionPriceDto } from "../dto/solution-price-dto";



@Injectable()

export class ServicesBudgetListService extends BackEndService<ServiceBudgetDto, number>{

  recordsFromDb: ServiceBudgetDto[] = [];
  status: string[] = [
    'Em andamento...',
    'Aguardando peças',
    'Aguardando o cliente',
    'Tentando uma nova abordagem',
    'FINALIZADO',
    // 'Sem reparo',
    // 'Finalizado'
  ];

  public _checkBoxChecked: boolean;
  public _spinnerShowHide: boolean;

  constructor(
    protected _Http: HttpClient,
    private _LoadClient: ClientListService,
    private _Fb: FormBuilder,
    private _Dialog: MatDialog,
    private _SnackBar: MsgOperation,

  ) {
    super(_Http, environment._SERVICES_BUDGET, environment._SERVICES_BUDGET_ALL_INCLUDED);
  }

  get getRecordFromDb() {
    return this.recordsFromDb;
  }
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

              toSave.status = 'FINALIZADO';

              this.update$<ServiceBudgetDto>(toSave).subscribe((entity: ServiceBudgetDto) => {
                this._SnackBar.msgCenterTop(`Parceiro ${toSave.client.name} Toda a parte técnica está concluida.`, 0, 5);
                this.loadAllFromDb();
              });

            }


          })

      },
      (err: Error) => { console.log(err) },
      () => { }
    )



  }
  loadAllFromDb(): boolean {
    this.recordsFromDb = [];
    this.loadAll$().subscribe((srvget: ServiceBudgetDto[]) => {

      srvget.forEach((srvBudget: ServiceBudgetDto) => {
        const serviceBudget: ServiceBudgetDto = srvBudget;

        this._LoadClient.getCliAsyncById(srvBudget.clientId).subscribe(
          (cli: ClientDto) => {
            serviceBudget.client = cli
            this.recordsFromDb.push(serviceBudget);
          },
          (err: Error) => { console.log(err) },
          () => { }
        )

      })


    });
    return false;
  }
  statusSave(id: number, status: string) {
    this.loadByIdIncluded$(id).subscribe(
      (sb: ServiceBudgetDto) => {

        //client: Client
        let toSave: ServiceBudgetDto = sb;
        toSave.status = status;

        this.update$<ServiceBudgetDto>(toSave).subscribe((entity: ServiceBudgetDto) => {
          this._SnackBar.msgCenterTop(`Status Atualizado`, 0, 5);
        });

        this.loadAllFromDb();


      },
      (err: Error) => { console.log(err) },
      () => { }
    )



  }
  createOs(id: number) {


    this.loadByIdIncluded$(id).subscribe(
      (sb: ServiceBudgetDto) => {

        //client: Client
        const dialogRef = this._Dialog.open(ConfirmModalComponent, {
          width: '500px',
          // height: '1000px',
          data: {
            sb, msg: `Será gerado uma ORDEM DE SERVIÇO para: ${sb.client.name.toLocaleUpperCase()},
            se clicar em sim, este orçamento só poderá ser visualizado na bancada.
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

              sb.osMake = false;
              this.loadAllFromDb();
            }
            if (item == "yes") {
              sb.osMake = true;

              sb.entryDateOs = new Date();

              let toSave: ServiceBudgetDto = sb;
              toSave.osMake = true;

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
  details(id: number) {

    let record: ServiceBudgetDto;

    this.loadByIdIncluded$(id).subscribe(
      (sb: ServiceBudgetDto) => {
        console.log(sb)
        record = sb;
        //client: Client
        const dialogRef = this._Dialog.open(ServiceBudgetInfoEditComponent, {
          width: '1000px',
          // height: '1000px',
          data: sb,
        });

        //const dialogConfig = new MatDialogConfig();
        //disable closing window when clicking outside screen.(click)="openDialogEdit(client.id)"
        dialogRef.disableClose = true;
        // dialogConfig.autoFocus = true;
        dialogRef.afterClosed()
          .pipe(take(1))
          .subscribe(item => {
            // this.getDevs();
            //  this.getClientById();
            // console.log('subscribe of addNewDevice when is closed', item);
          })

      },
      (err: Error) => { console.log(err) },
      () => { console.log('complete') }
    )




  }
  datasheetDetailsModal(id: number) {
    this.loadByIdIncluded$(id).subscribe(
      (sb: ServiceBudgetDto) => {


        const dialog = this._Dialog.open(DatasheetDetailsComponent, {
          width: '1000px',
          //  height:'1000px',
          data: sb,
        })
        dialog.afterClosed().pipe(take(1)).subscribe((item) => {
        })
      },
      (err: Error) => { console.log(err) },
      () => { console.log('complete') }
    )









  }
  get spinnerShowHide() {
    return this._spinnerShowHide
  }








}
