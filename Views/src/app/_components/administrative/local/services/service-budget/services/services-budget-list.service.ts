import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CheckboxControlValueAccessor, FormBuilder, FormGroup } from "@angular/forms";
import { BackEndService } from "src/app/_shared/services/back-end/backend.service";
import { environment } from "src/environments/environment";
import { ServiceBudgetDto } from "../dto/service-budget-dto";
import { ClientDto } from 'src/app/_components/administrative/client/dto/client-dto'

import { ClientListService } from "src/app/_components/administrative/client/services/client-list.service";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { take } from "rxjs/operators";
import { ConfirmModalComponent } from "src/app/_shared/components/confirm-modal/confirm-modal.component";

import { ServiceBudgetCreateComponent } from "../service-budget-create/service-budget-create.component";
import { ServiceBudgetInfoEditComponent } from "../service-budget-info-edit/service-budget-info-edit.component";
import { MsgOperation } from "src/app/_shared/services/messages/snack-bar.service";
import { DatasheetDetailsComponent } from "../../service-bench/datasheet/datasheet-details/datasheet-details.component";



@Injectable()

export class ServicesBudgetListService extends BackEndService<ServiceBudgetDto, number>{


  recordsFromDb: ServiceBudgetDto[] = [];
  status: string[] = [
    'Em andamento...',
    'Aguardando peças',
    'Aguardando o cliente',
    'Tentando uma nova abordagem',
    'Sem reparo'
  ];

  _OsMakeChecked: boolean;

  private _mainForm: FormGroup;
  private _formPriceService: FormGroup;

  constructor(
    protected _Http: HttpClient,
    private _LoadClient: ClientListService,
    private _Fb: FormBuilder,
    private _Dialog: MatDialog,
    private _SnackBar: MsgOperation,

  ) {
    super(_Http, environment._SERVICES_BUDGET, environment._SERVICES_BUDGET_INCLUDED);
  }

  get formTest() {
    return this._mainForm;
  }
  get getRecordFromDb() {
    return this.recordsFromDb;
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
  get osMakeCheck() {
    return this._OsMakeChecked
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
              this._OsMakeChecked = false;
              console.log('you´ve clicked NO');
              this.loadAllFromDb();
            }
            if (item == "yes") {
              sb.osMake = true;
              sb.entryDateOs = new Date();

              let toSave: ServiceBudgetDto = sb;
              toSave.osMake = true;

              this.update$<ServiceBudgetDto>(toSave).subscribe((entity: ServiceBudgetDto) => {

              });

              this._SnackBar.msgCenterTop(`Parceiro ${toSave.client.name} O.S foi encaminhada.`, 0, 5);
              this.loadAllFromDb();
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


  datasheetDetailsModal(sb: ServiceBudgetDto) {

    const dialog = this._Dialog.open(DatasheetDetailsComponent, {
      width:'1000px',
      height:'1000px',
      data: sb,

    })

    dialog.afterClosed().pipe(take(1)).subscribe((item) => {

    })
  }

  loadControls(){
    this._mainForm = this._Fb.group({

    })
  }

}
