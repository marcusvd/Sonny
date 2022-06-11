import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientDto } from 'src/app/_components/administrative/client/dto/client-dto';

import { ValidatorsService } from 'src/app/_shared/helpers/validators.service';
import { MsgOperation } from 'src/app/_shared/services/messages/snack-bar.service';
import { NavBackService } from 'src/app/_shared/services/navigation/nav-back.service';
import { environment } from 'src/environments/environment';
import { CollectEquipamentDto } from '../dto/collect-equipament-dto';


@Component({
  selector: 'create-collect-equipament',
  templateUrl: './create-collect-equipament.component.html',
  styleUrls: ['./create-collect-equipament.component.css']
})
export class CreateCollectEquipament implements OnInit {
  private readonly _API_URL_CLIENT: string = `${environment._CLIENTS}`
  private readonly _API_URL_ORDERSERVICES: string = `${environment._ORDERSERVICES}`
  startDate = new Date(2021, 0, 1, 23, 0);
  _formOS: FormGroup;
  _status: string[] = ['Em Execução', 'Parado', 'Peças', 'Finalizado'];
  _btnView: boolean = false;
  @ViewChild(MatAccordion) accordion: MatAccordion;


  constructor(
    private _FormBuilder: FormBuilder,
    private _SnackBar: MsgOperation,
    private _ActivatedRoute: ActivatedRoute,
    // private _Crud: ServicesProviderService,

    public _BackButton: NavBackService,
    public _ValidationMsg: ValidatorsService,

  ) { }
  btnsView(): boolean {
    return this._btnView = !this._btnView;
    // return this._btnView == false ? true : false;
  }

  getClientById() {
    let id: number = 0;
    this._ActivatedRoute.params.subscribe(_id => {
      id = _id['id'];

      // this._Crud.loadById$(id).subscribe((_Client: any) => {

      //   // console.log(id);
      // });
    });
  }

  save() {
    const osRemove: CollectEquipamentDto = Object.assign({}, this._formOS.value);
    // this._Crud.add$(osRemove).subscribe((_osRemove: CollectEquipamentDto) => {
    //   this._ValidationMsg.cleanAfters(['', '',''], this._formOS);
    //   this._SnackBar.msgCenterTop(`${osRemove?.user} ${osRemove.model}`, 0, 5);
    // })
  }

  _formLoad() {
    this._formOS = this._FormBuilder.group({
      start: ['', []],
      user: ['', []],
      clients: ['', []],
      model: ['', []],
      equipamentDescription: ['', []],
      userConsiderations: ['', []],
      foundedErrors: ['', []],
      appliedSolutions: ['', []],
      status: ['', []],
      end: ['', []],
    })

  }
  ngOnInit(): void {
    this._formLoad();
    this.getClientById();
    console.log(this._btnView);
  }

}
