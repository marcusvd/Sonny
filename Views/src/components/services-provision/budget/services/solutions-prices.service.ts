import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { ValidatorsService } from "src/shared/helpers/validators.service";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { MsgOperation } from "src/shared/services/messages/snack-bar.service";
import { environment } from "src/environments/environment";


import { SolutionPriceDto } from "../../dtos/solution-price-dto";
import { MatDialog } from "@angular/material/dialog";
import { DialogQuizComponent } from "src/shared/components/dialog-quiz/dialog-quiz.component";
@Injectable()
export class SolutionsPricesServices extends BackEndService<SolutionPriceDto, number>{

  constructor(
    protected _Http: HttpClient,
    private _SnackBar: MsgOperation,
    private _dialog: MatDialog,
    public _ValidationMsg: ValidatorsService,
  ) {
    super(_Http, environment._SOLUTIONS_PRICES_DELETE);
  }


  dialogManager(solutionPriceDto: SolutionPriceDto){
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
      if (result == 'Sim')
        this.delete(solutionPriceDto);
    })

  }


  delete(solutionPriceDto: SolutionPriceDto) {
    this.delete$<SolutionPriceDto>(solutionPriceDto).subscribe(() => {
      this._SnackBar.msgCenterTop(`Orçamento foi excluido.`, 0, 5);
    },
      (error) => { console.log(error) },
      () => {
        console.log('complete')
      },
    )
  }


}
