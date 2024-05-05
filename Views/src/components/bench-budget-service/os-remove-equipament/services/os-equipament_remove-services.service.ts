import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, UntypedFormGroup } from "@angular/forms";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { environment } from "src/environments/environment";
import { OsRemoveEquipamentDto } from "../dto/os-remove-equipament-dto";



@Injectable()
export class OsEquipamentRemoveServicesService extends BackEndService<OsRemoveEquipamentDto>{

  private _startDate = new Date();
  private _formMain: UntypedFormGroup;
  private _print: boolean = false;
  private _status: string[] = ['Em Execução', 'Parado', 'Peças', 'Finalizado'];




  constructor(
    override _http: HttpClient,

  ) {
    super(_http, environment._ORDERSERVICES)
  }


  get startDate() {
    return this._startDate
  }
  get formMain() {
    return this._formMain
  }
  print(p:boolean) {
    return this._print = p;
  }


  save(form: UntypedFormGroup) {
    const osRemove: OsRemoveEquipamentDto = {...form.value};
    this.add$(osRemove, '').subscribe((_osRemove: OsRemoveEquipamentDto) => {
      if (this._print) {
        window.print();
      }

      // this._SnackBar.msgCenterTop(`${osRemove.usr} ${osRemove.model}`, 0, 5);
    })
  }












}
