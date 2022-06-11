import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClientDto } from '../../../client/dto/client-dto';
import { PartnerDto } from '../dto/partner-dto';
import { CollectDeliverCreateService } from '../services/collect-deliver-create.service';

@Component({
  selector: 'app-collect-deliver',
  templateUrl: './collect-deliver.component.html',
  styleUrls: ['./collect-deliver.component.css']
})
export class CollectDeliverComponent implements OnInit {
  public _formCollectDeliver: FormGroup;

  radioValue: string;
  radioValueDestinyType: string;

  both: boolean;
  destinyClients: boolean;
  destinyPartners: boolean;
  destinyOthers: boolean;

  transporter: boolean = false;

  constructor(
    private _CDCreateService: CollectDeliverCreateService,
    private _ActRoute: ActivatedRoute,
  ) { }

  delivery($event) {
    this.both = $event.value === "both" ? true : false;
  }

  trans() {
    this.transporter = !this.transporter;
  }

  destiny($event) {
    //
    console.log($event.value)
    switch ($event.value) {
      case 'client':
        this.destinyClients = $event.value === "client" ? true : false;
        this.destinyPartners = false;
        this.destinyOthers = false;
        break;
      case 'partner':
        this.destinyPartners = $event.value === "partner" ? true : false;
        this.destinyClients = false;
        this.destinyOthers = false;
        break;
      case 'other':
        this.destinyOthers = $event.value === "other" ? true : false;
        this.destinyClients = false;
        this.destinyPartners = false;
        break;
    }
  }

  get formMain(): FormGroup {
    return this._CDCreateService.formMain
  }
  get clients(): ClientDto[] {
    return this._CDCreateService.cli
  }

  get partners():PartnerDto[] {
    return this._CDCreateService.par
  }


  save() {
    this._CDCreateService.save();
  }


  ngOnInit(): void {
    this._ActRoute.data.subscribe({
      next: (item: any) => {
        this._CDCreateService.cli = <ClientDto[]>item.loaded['clients'];
        this._CDCreateService.par = <PartnerDto[]>item.loaded['partners'];
      }
    })
    this._CDCreateService.formLoad();



  }

}
