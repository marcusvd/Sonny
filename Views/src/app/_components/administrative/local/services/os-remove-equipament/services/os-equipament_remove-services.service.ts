import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ValidatorsService } from "src/app/_shared/helpers/validators.service";
import { BackEndService } from "src/app/_shared/services/back-end/backend.service";
import { MsgOperation } from "src/app/_shared/services/messages/snack-bar.service";
import { environment } from "src/environments/environment"; import { OsRemoveEquipamentDto } from "../dto/OsRemoveEquipamentDto";
;

@Injectable()
export class OsEquipamentRemoveServicesService extends BackEndService<OsRemoveEquipamentDto, number>{

  private _startDate = new Date();
  private _formMain: FormGroup;
  private _print: boolean = false;
  private _status: string[] = ['Em Execução', 'Parado', 'Peças', 'Finalizado'];




  constructor(
    protected _Http: HttpClient,
    private _FormBuilder: FormBuilder,
    private _SnackBar: MsgOperation,
    public _ValidationMsg: ValidatorsService,

  ) {
    super(_Http, environment._ORDERSERVICES)
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

  _formLoad() {
    this._formMain = this._FormBuilder.group({
      start: ['', []],
      client: ['', []],
      usr: ['', []],
      pwd: ['', []],
      model: ['', []],
      equipament: ['', []],
      problem: ['', []],
    })

  }



  save() {
    const osRemove: OsRemoveEquipamentDto = Object.assign({}, this._formMain.value);
    this.add$(osRemove).subscribe((_osRemove: OsRemoveEquipamentDto) => {
      if (this._print) {
        window.print();
      }
      this._ValidationMsg.cleanAfters(['', '', ''], this._formMain);
      this._SnackBar.msgCenterTop(`${osRemove.usr} ${osRemove.model}`, 0, 5);
    })
  }












}
