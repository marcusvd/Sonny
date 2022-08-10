import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})

export class MsgOperation {
  constructor(private snackBar: MatSnackBar) { }

  private readonly actions: string[] = ['ADICIONADO!', 'EXCLUÍDO!', 'ATUALIZOU!', 'EDITADO!']

  private hPStart: MatSnackBarHorizontalPosition = 'start';
  private hPCenter: MatSnackBarHorizontalPosition = 'center';
  private hPEnd: MatSnackBarHorizontalPosition = 'end';
  private hPLeft: MatSnackBarHorizontalPosition = 'left';
  private hPRight: MatSnackBarHorizontalPosition = 'right';



  private vPTop: MatSnackBarVerticalPosition = 'top';
  private vPBottom: MatSnackBarVerticalPosition = 'bottom';


  msgCenterTop(message: string, act: number, time: number) {

    this.snackBar.open(message, this.actions[act], {
      duration: time * 1000,
      horizontalPosition: this.hPCenter,
      verticalPosition: this.vPTop

    })
  }
  msgCenterBottom(message: string, act: number, time: number) {

    this.snackBar.open(message, this.actions[act], {
      duration: time * 1000,
      horizontalPosition: this.hPCenter,
      verticalPosition: this.vPBottom

    })
  }


}
