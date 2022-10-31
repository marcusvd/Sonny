import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CompanyDto } from 'src/shared/dtos/company-dto';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { ValidatorsService } from 'src/shared/helpers/validators/validators.service';
import { ClientDto } from '../../../client/dto/client-dto';
import { PartnerDto } from '../../../partner/dto/partner-dto';
import { CollectDeliverCreateResolver } from '../resolver/collect-deliver.resolver';
import { CollectDeliverCreateService } from '../services/collect-deliver-create.service';
@Component({
  selector: 'deliver-collect',
  templateUrl: './collect-deliver.component.html',
  styleUrls: ['./collect-deliver.component.css'],
})
export class CollectDeliverCreateComponent extends BaseForm implements OnInit, AfterViewInit {

  indexSelectedStep: number =0;

  private _radioValue: string;
  private _radioValueDestinyType: string;



  public destinyClients: boolean;
  public destinyPartners: boolean;
  public destinyOthers: boolean;
  public destinyBase: boolean;

  public sourceClients: boolean;
  public sourcePartners: boolean;
  public sourceOthers: boolean;
  public sourceBase: boolean;

  public transporter: boolean = false;

  constructor(
    private _CDCreateService: CollectDeliverCreateService,
    private _ActRoute: ActivatedRoute,
    private _Fb: FormBuilder,
    override _validatorsService: ValidatorsService,
    override _breakpointObserver: BreakpointObserver,
    ) { super(_validatorsService, _breakpointObserver) }
  ngAfterViewInit(): void {
    this.indexSelectedStep =0;
  }

    changeSelectedIndexStepSelection($event:number){
      const index: number = $event;
      this.indexSelectedStep = index;
      console.log(this.indexSelectedStep)
    }


  trans() {
    this.transporter = !this.transporter;
    if (this.transporter) {
      this.formMain.get('transporterId').setValue(null);
    }

  }

  source($event) {


    switch ($event.value) {

      case 'client':
        this.sourceClients = $event.value === "client" ? true : false;
        this.sourcePartners = false;
        this.sourceOthers = false;
        this.sourceBase = false;
        this._CDCreateService.setFormSource = 'client';
        break;
      case 'partner':
        this.sourcePartners = $event.value === "partner" ? true : false;
        this.sourceClients = false;
        this.sourceOthers = false;
        this.sourceBase = false;
        this._CDCreateService.setFormSource = 'partner';
        break;
      case 'other':
        this.sourceOthers = $event.value === "other" ? true : false;
        this.sourceClients = false;
        this.sourcePartners = false;
        this.sourceBase = false;
        this._CDCreateService.setFormSource = 'other';
        break;
      case 'base':
        this.sourceBase = $event.value === "base" ? true : false;
        this.sourceClients = false;
        this.sourcePartners = false;
        this.sourceOthers = false;
        this._CDCreateService.setFormSource = 'base';
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
        this.destinyBase = false;

        this._CDCreateService.setFormDestiny = 'client';
        break;
      case 'partner':
        this.destinyPartners = $event.value === "partner" ? true : false;
        this.destinyClients = false;
        this.destinyOthers = false;
        this.destinyBase = false;
        this._CDCreateService.setFormDestiny = 'partner';
        break;
      case 'other':
        this.destinyOthers = $event.value === "other" ? true : false;
        this.destinyClients = false;
        this.destinyPartners = false;
        this.destinyBase = false;
        this._CDCreateService.setFormDestiny = 'other';
        break;
      case 'base':
        this.destinyBase = $event.value === "base" ? true : false;
        this.destinyClients = false;
        this.destinyPartners = false;
        this.destinyOthers = false;
        this._CDCreateService.setFormDestiny = 'other';
        break;
    }
  }



  formLoad() {
    return this.formMain = this._Fb.group({
      subject: ['', []],
      transporterId: ['', []],
      transporterNoregisterd: ['', []],

      sourceClientId: [null, []],
      sourcePartnerId: [null, []],
      sourceCompanyId: [null, []],
      sourceNoRegisterName: [null, []],
      sourceNoRegisterAddress: [null, []],

      destinyClientId: [null, []],
      destinyPartnerId: [null, []],
      destinyCompanyId: [null, []],
      destinyNoRegisterName: [null, []],
      destinyNoRegisterAddress: [null, []],

      start: ['', []],
      price: ['', []],
      items: ['', []],
      comments: ['', []],
    })
  }

  get clients(): ClientDto[] {
    return this._CDCreateService.cli;
  }

  get partners(): PartnerDto[] {
    return this._CDCreateService.par;
  }

  get companies(): CompanyDto[] {
    return this._CDCreateService.com;
  }


  save() {
    this._CDCreateService.save(this.formMain);
  }


  ngOnInit(): void {
    this._ActRoute.data.subscribe({
      next: (item: any) => {
        // console.log(item)
        this._CDCreateService.cli = <ClientDto[]>item.loaded['clients'];
        this._CDCreateService.par = <PartnerDto[]>item.loaded['partners'];
        this._CDCreateService.com = <CompanyDto[]>item.loaded['companies'];
      }
    })
    this.formLoad();


  }

}
