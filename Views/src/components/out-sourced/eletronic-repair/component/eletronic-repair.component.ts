import { Component, OnInit } from '@angular/core';
import { validateBasis } from '@angular/flex-layout';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClientDto } from 'src/shared/components/table-g/dtos/client-dto';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { PartnerDto } from '../../../partner/dto/partner-dto';
import { EletronicRepairCreateService } from '../services/eletronic-repair.create.service';


@Component({
  selector: 'eletronic-repair',
  templateUrl: './eletronic-repair.component.html',
  styleUrls: ['./eletronic-repair.component.css']
})
export class EletronicRepairComponent extends BaseForm implements OnInit {
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
    private _Fb: FormBuilder,
  ) { super() }



  // get formMain(): FormGroup {
  //   return this._EletronicRepairCreateService.formMain
  // }
  // get clients(): ClientDto[] {
  //   return this._EletronicRepairCreateService.cli
  // }

  get partners():PartnerDto[] {
    return this._EletronicRepairCreateService.par
  }


  save() {
    this._EletronicRepairCreateService.save();
  }


  formLoad() {
    return this.formMain = this._Fb.group({

      item: ['', [Validators.required, Validators.maxLength(50)]],
      day: ['', []],
      problem: ['', [Validators.required, Validators.maxLength(1000)]],
      user: ['', [Validators.maxLength(50)]],
      password: ['', [Validators.minLength(6), Validators.maxLength(10)]],
      price: ['', []],
      partnerId: ['', []],
      solution: ['', [Validators.required, Validators.maxLength(1000)]],
      authorized: ['', []],
      finished: ['', []],
    })
  }

  ngOnInit(): void {
    // this._ActRoute.data.subscribe({
    //   next: (item: any) => {
    //     this._EletronicRepairCreateService.cli = <ClientDto[]>item.loaded['clients'];
    //     this._EletronicRepairCreateService.par = <PartnerDto[]>item.loaded['partners'];
    //   }
    // })
    this.formLoad();



  }

}
