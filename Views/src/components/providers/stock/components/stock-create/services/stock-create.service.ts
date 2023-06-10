import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UntypedFormGroup } from "@angular/forms";

import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";
import { environment } from "src/environments/environment";
import { StockDto } from "../../../dto/stock-dto";



@Injectable()
export class StockCreateService extends BackEndService<StockDto>{


  private _isNewShowHide: boolean = false;
  private _selectedCat: number;
  public _formInventory: UntypedFormGroup;
  startDate = new Date(2021, 0, 1);

  constructor(
    override _http: HttpClient,
    private _communicationsAlerts: CommunicationAlerts,
  ) {
    super(_http, environment.backEndDoor);
  }

  get isNewShowHide() {
    return this._isNewShowHide;
  }
  get selectedCat() {
    return this._selectedCat;
  }


  equipamentArray: any[] = [
    { id: 0, name: 'ADAPTADOR' },
    { id: 1, name: 'PROCESSADOR' },
    { id: 2, name: 'MEMÓRIA' },
    { id: 3, name: 'ARMAZENAMENTO' },
    { id: 4, name: 'FONTE' },
    { id: 5, name: 'PLACA MÃE' },
    { id: 6, name: 'MONITOR' },
    { id: 7, name: 'TECLADO' },
    { id: 8, name: 'MOUSE' },
    { id: 9, name: 'COOLER' },
    { id: 10, name: 'PLACA DE VIDEO' },
    { id: 11, name: 'PLACA DE REDE' },
    { id: 12, name: 'OUTROS' },

  ];

  save(form: UntypedFormGroup) {

    if (form.get('equipament').value.toLocaleLowerCase() === 'outros') {
      form.get('equipament').setValue(form.get('otherEquipament').value);
      form.controls['otherEquipament'].disable();
    }
    const toSave: StockDto = { ...form.value };
    this.add$<StockDto>(toSave, 'stocks/additemstock').subscribe({
      next: () => {
        this._communicationsAlerts.communication('', 0, 2, 'top', 'center');
        form.reset();
        // form.controls['nameOther'].disable();
      },
      error: (errors) => {
        this._communicationsAlerts.communicationError('', 4, 2, 'top', 'center');
        console.log(errors)
      }
    })
  }




}
