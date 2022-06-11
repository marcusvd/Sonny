import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClientDto } from '../../../client/dto/client-dto';
import { PartnerDto } from '../dto/partner-dto';
import { CollectDeliverCreateService } from '../services/collect-deliver-create.service';
import { EletronicRepairCreateService } from './services/eletronic-repair.create.service';

@Component({
  selector: 'eletronic-repair',
  templateUrl: './eletronic-repair.component.html',
  styleUrls: ['./eletronic-repair.component.css']
})
export class EletronicRepairComponent implements OnInit {
  public _formCollectDeliver: FormGroup;

  radioValue: string;
  radioValueDestinyType: string;

  both: boolean;
  destinyClients: boolean;
  destinyPartners: boolean;
  destinyOthers: boolean;

  transporter: boolean = false;

  constructor(
    private _EletronicRepairCreateService:EletronicRepairCreateService,
    private _ActRoute: ActivatedRoute,
  ) { }



  get formMain(): FormGroup {
    return this._EletronicRepairCreateService.formMain
  }
  get clients(): ClientDto[] {
    return this._EletronicRepairCreateService.cli
  }

  get partners():PartnerDto[] {
    return this._EletronicRepairCreateService.par
  }


  save() {
    this._EletronicRepairCreateService.save();
  }


  ngOnInit(): void {
    // this._ActRoute.data.subscribe({
    //   next: (item: any) => {
    //     this._EletronicRepairCreateService.cli = <ClientDto[]>item.loaded['clients'];
    //     this._EletronicRepairCreateService.par = <PartnerDto[]>item.loaded['partners'];
    //   }
    // })
    this._EletronicRepairCreateService.formLoad();



  }

}
