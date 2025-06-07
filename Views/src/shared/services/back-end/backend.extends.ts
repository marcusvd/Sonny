import { inject, Inject, Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

import { BaseForm } from "src/shared/components/inheritance/forms/base-form";

Injectable({
  providedIn: 'root'
})

export abstract class BackEndExtends extends BaseForm {

  constructor(
  ) { super() }

  protected snackBar: MatSnackBar = inject(MatSnackBar);

  openSnackBar(message: string, style: string, action: string = 'Fechar') {
    this.snackBar.open(message, action, {
      duration: 5000, // Tempo em milissegundos (5 segundos)
      panelClass: [style], // Aplica a classe personalizada
      horizontalPosition: 'center', // Centraliza horizontalmente
      verticalPosition: 'top', // Posição vertical (pode ser 'top' ou 'bottom')
    });
  }


}
