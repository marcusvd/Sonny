import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})

export class MsgOperation {
  constructor(private snackBar: MatSnackBar) { }


  private actions: string[] = ['ADICIONADO!', 'EXCLUÍDO!', 'ATUALIZOU!', 'EDITADO!']

  private _hPStart: MatSnackBarHorizontalPosition = 'start';
  private _hPCenter: MatSnackBarHorizontalPosition = 'center';
  private _hPEnd: MatSnackBarHorizontalPosition = 'end';
  private _hPLeft: MatSnackBarHorizontalPosition = 'left';
  private _hPRight: MatSnackBarHorizontalPosition = 'right';



  private vPTop: MatSnackBarVerticalPosition = 'top';
  private vPBottom: MatSnackBarVerticalPosition = 'bottom';


  communication(message: string, action: number, delay: number, positionVertical: any, positionHorizontal: any) {
    const horizontal: MatSnackBarHorizontalPosition = positionHorizontal;
    //start
    // center
    // end
    // left
    // right
    const vertical: MatSnackBarVerticalPosition = positionVertical;
    //top
    // bottom

    const actions: string[] = ['ADICIONADO!', 'EXCLUÍDO!', 'ATUALIZOU!', 'EDITADO!']
    //0 = ADICIONADO
    //1 = EXCLUÍDO
    //2 = ATUALIZOU
    //3 = EDITADO

    this.snackBar.open(message, actions[action], {

      duration: delay * 1000,
      horizontalPosition: horizontal,
      verticalPosition: vertical,

    })

  }

  msgCenterTop(message: string, act: number, time: number) {

    this.snackBar.open(message, this.actions[act], {
      duration: time * 10000,
      horizontalPosition: this._hPCenter,
      verticalPosition: this.vPTop

    })
  }
  msgCenterBottom(message: string, act: number, time: number) {

    this.snackBar.open(message, this.actions[act], {
      duration: time * 1000,
      horizontalPosition: this._hPCenter,
      verticalPosition: this.vPBottom

    })
  }


}
@Injectable({
  providedIn: 'root'
})
export class CommunicationAlerts {
  constructor(private snackBar: MatSnackBar) { }

  communication(message: string, action: number, delay: number, positionVertical: any, positionHorizontal: any) {
    const horizontal: MatSnackBarHorizontalPosition = positionHorizontal;
    //start    // center    // end    // left    // right
    const vertical: MatSnackBarVerticalPosition = positionVertical;
    //top    // bottom
    const actions: string[] = ['ADICIONADO!', 'EXCLUÍDO!', 'ATUALIZOU!', 'EDITADO!']
    // actions[action]
    //message
    this.snackBar.open(actions[action], '', {
      duration: delay * 1000,
      horizontalPosition: horizontal,
      verticalPosition: vertical,
      panelClass: ['green-snackBar']
    })

  }
  communicationError(message: string, action: number, delay: number, positionVertical: any, positionHorizontal: any) {
    const horizontal: MatSnackBarHorizontalPosition = positionHorizontal;
    //start    // center    // end    // left    // right
    const vertical: MatSnackBarVerticalPosition = positionVertical;
    //top    // bottom
    const actions: string[] = ['ADICIONADO!', 'EXCLUÍDO!', 'ATUALIZOU!', 'EDITADO!', 'ERRO']
    // actions[action]
    //message
    this.snackBar.open(`${actions[action]} ${message}`, 'Fechar', {
      // duration: delay * 1000,
      horizontalPosition: horizontal,
      verticalPosition: vertical,
      panelClass: ['green-snackBar']
    })

  }
}
