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
  itemDayRowHeight: string = '120px';


  problemSolutionCols: number;
  problemSolutionRowHeight: string = '250px';

  userPwdCols: number;
  userPwdRowHeight: string = '145px';

  partnerIdSolutionCols: number;
  partnerIdSolutionRowHeight: string = '145px';

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

  private validatorMessages = ValidatorMessages;
  get ValidatorMessages() {
    return this.validatorMessages
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
    this.screen();


  }

}
