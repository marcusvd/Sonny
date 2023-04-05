import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable, Output } from "@angular/core";

import { BackEndService } from "src/shared/services/back-end/backend.service";
import { MsgOperation } from "src/shared/services/messages/snack-bar.service";
import { environment } from "src/environments/environment";


import { SolutionPriceDto } from "../../dtos/solution-price-dto";
import { MatDialog } from "@angular/material/dialog";
import { DialogQuizComponent } from "src/shared/components/dialog-quiz/dialog-quiz.component";
import { PanelServicesBudgetComponent } from "../panel-services-budget/panel-services-budget.component";
@Injectable()
export class SolutionsPricesServices extends BackEndService<SolutionPriceDto, number>{

  private _resultRemoveServicePrice: EventEmitter<boolean> = new EventEmitter<false>();

  constructor(
    protected _http: HttpClient,
    private _snackBar: MsgOperation,
    private _dialog: MatDialog,
      ) {
    super(_http, environment._SOLUTIONS_PRICES);
  }


  dialogManager(solutionPriceDto: SolutionPriceDto): EventEmitter<boolean> {
    const dialogRef = this._dialog.open(DialogQuizComponent, {
      width: '500px;',
      height: '300px;',
      data: {
        title: 'Deleção de orçamento',
        messageBody: 'Tem certeza que deseja deletar esse serviço?',
        btn1: 'Sim',
        btn2: 'Cancelar',
      }
    })

    dialogRef.afterClosed().subscribe((result: string) => {
      console.log(result);
      if (result == 'Sim') {
        this._resultRemoveServicePrice =  this.delete(solutionPriceDto);
      }
    })
    return this._resultRemoveServicePrice;
  }


  delete(solutionPriceDto: SolutionPriceDto): EventEmitter<boolean> {
    this.delete$<SolutionPriceDto>('',solutionPriceDto.id).subscribe(() => {
      this._snackBar.msgCenterTop(`Orçamento foi excluido.`, 0, 5);
      this._resultRemoveServicePrice.emit(true);
    },
      (error) => { console.log(error) },
      () => {
        console.log('complete')
      },
    )

    return this._resultRemoveServicePrice;
  }




}
