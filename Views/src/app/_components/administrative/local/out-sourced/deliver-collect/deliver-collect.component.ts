import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClientDto } from '../../../client/dto/client-dto';
import { PartnerDto } from '../dto/partner-dto';
import { CollectDeliverCreateService } from '../services/collect-deliver-create.service';
@Component({
  selector: 'app-deliver-collect',
  templateUrl: './deliver-collect.component.html',
  styleUrls: ['./deliver-collect.component.css']
})
export class DeliverCollectComponent implements OnInit {

  private _radioValue: string;
  private _radioValueDestinyType: string;


  public destinyClients: boolean;
  public destinyPartners: boolean;
  public destinyOthers: boolean;

  public sourceClients: boolean;
  public sourcePartners: boolean;
  public sourceOthers: boolean;

  public transporter: boolean = false;

  constructor(
    private _CDCreateService: CollectDeliverCreateService,
    private _ActRoute: ActivatedRoute,
  ) { }


  trans() {
    this.transporter = !this.transporter;
    if (this.transporter) {
      this.formMain.get('transporter').setValue(null);
    }

  }

  source($event) {


    switch ($event.value) {

      case 'client':
        this.sourceClients = $event.value === "client" ? true : false;
        this.sourcePartners = false;
        this.sourceOthers = false;
        this._CDCreateService.formSourceSet = ['sourcePartnerId', 'noRegisterName', 'noRegisterAddress'];
        break;
      case 'partner':
        this.sourcePartners = $event.value === "partner" ? true : false;;
        this.sourceClients = false;
        this.sourceOthers = false;
        this._CDCreateService.formSourceSet = ['sourceClientId', 'noRegisterName', 'noRegisterAddress'];
        break;
      case 'other':
        this.sourceOthers = $event.value === "other" ? true : false;
        this.sourceClients = false;
        this.sourcePartners = false;
        this._CDCreateService.formSourceSet = ['sourcePartnerId', 'sourceClientId'];
        break;
    }


  }
  destiny($event) {
    //

    switch ($event.value) {
      case 'client':
        this.destinyClients = $event.value === "client" ? true : false;
        this.destinyPartners = false;
        this.destinyOthers = false;
        this._CDCreateService.formDestinySet = ['destinyPartnerId', 'noRegisterName', 'noRegisterAddress'];
        break;
      case 'partner':
        this.destinyPartners = $event.value === "partner" ? true : false;
        this.destinyClients = false;
        this.destinyOthers = false;
        this._CDCreateService.formDestinySet = ['destinyClientId', 'noRegisterName', 'noRegisterAddress'];
        break;
      case 'other':
        this.destinyOthers = $event.value === "other" ? true : false;
        this.destinyClients = false;
        this.destinyPartners = false;
        this._CDCreateService.formDestinySet = ['destinyPartnerId', 'destinyClientId'];
        break;
    }
  }

  get formMain(): FormGroup {
    return this._CDCreateService.formMain
  }

  get formSource(): FormGroup {
    return this._CDCreateService.formSource
  }
  get formDestiny(): FormGroup {
    return this._CDCreateService.formDestiny
  }
  get clients(): ClientDto[] {
    return this._CDCreateService.cli.filter(x => x.id !=1)
  }

  get partners(): PartnerDto[] {
    return this._CDCreateService.par.filter(x => x.id !=1)
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
    this._CDCreateService.formLoadMain();


  }

}
