import { Injectable } from "@angular/core";
import { MatLegacyDialog as MatDialog } from "@angular/material/legacy-dialog";


@Injectable({
  providedIn: 'root'
})
export class SnackActions {

  constructor(private _dialog: MatDialog) { }


  snackActionsTrigger(action: string) {
    switch (action) {
      case 'retryEmail': {

        break;
      }


      case 'abc': {
        break;
      }

      case 'abcd': {
        break;
      }

    }
  }

}
