import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { validateBasis } from '@angular/flex-layout';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { PartnerDto } from '../../../partner/dto/partner-dto';
import { EletronicRepairCreateService } from '../services/eletronic-repair.create.service';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { ClientDto } from 'src/components/client/dto/client-dto';

@Component({
  selector: 'eletronic-repair',
  templateUrl: './eletronic-repair.component.html',
  styleUrls: ['./eletronic-repair.component.css']
})
export class EletronicRepairComponent extends BaseForm implements OnInit {
  public _formCollectDeliver: FormGroup;

  radioValue: string;
  radioValueDestinyType: string;

  itemDayCols: number;
  itemDayRowHeight: string = '200px';


  problemSolutionCols: number;
  problemSolutionRowHeight: string = '250px';

  userPwdCols: number;
  userPwdRowHeight: string = '165px';

  partnerIdSolutionCols: number;
  partnerIdSolutionRowHeight: string = '165px';

  both: boolean;
  destinyClients: boolean;
  destinyPartners: boolean;
  destinyOthers: boolean;

  transporter: boolean = false;

  constructor(
    private _EletronicRepairCreateService: EletronicRepairCreateService,
    private _ActRoute: ActivatedRoute,
    private _Fb: FormBuilder,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }

  startDate = new Date();

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {

            this.itemDayCols = 1;

            this.problemSolutionCols = 1;

            this.userPwdCols = 1;

            this.partnerIdSolutionCols = 1;
            break;
          }
          case 'small': {

            this.itemDayCols = 1;

            this.problemSolutionCols = 1;

            this.userPwdCols = 1;

            this.partnerIdSolutionCols = 1;
            break;
          }
          case 'medium': {

            this.itemDayCols = 2;

            this.problemSolutionCols = 2;

            this.userPwdCols = 2;

            this.partnerIdSolutionCols = 2;
            break;
          }
          case 'large': {

            this.itemDayCols = 2;

            this.problemSolutionCols = 2;

            this.userPwdCols = 2;

            this.partnerIdSolutionCols = 2;
            break;
          }
          case 'xlarge': {

            this.itemDayCols = 2;

            this.problemSolutionCols = 2;

            this.userPwdCols = 2;

            this.partnerIdSolutionCols = 2;
            break;
          }
        }
      }
    })
  }


  get partners(): PartnerDto[] {
    return this._EletronicRepairCreateService.par
  }

  get clients(): ClientDto[] {
    return this._EletronicRepairCreateService.clients
  }

  save() {
    this._EletronicRepairCreateService.save(this.formMain);
  }

  formLoad() {
    return this.formMain = this._Fb.group({
      clientId: ['', [Validators.required, Validators.maxLength(50)]],
      item: ['', [Validators.required, Validators.maxLength(50)]],
      day: ['', [Validators.required]],
      problem: ['', [Validators.required, Validators.maxLength(1000)]],
      user: ['', [Validators.maxLength(50)]],
      password: ['', [Validators.minLength(6), Validators.maxLength(10)]],
      price: ['', []],
      partnerId: ['', [Validators.required]],
      solution: ['', [Validators.required, Validators.maxLength(1000)]],
      authorized: ['', []],
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
    this.screen();
    this._EletronicRepairCreateService.loadAllClients();


  }

}
