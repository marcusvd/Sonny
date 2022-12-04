import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { PartnerDto } from '../../../partner/dto/partner-dto';
import { EletronicRepairCreateService } from '../services/eletronic-repair.create.service';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { CustomerDto } from 'src/components/customer/dto/customer-dto';

@Component({
  selector: 'eletronic-repair',
  templateUrl: './eletronic-repair.component.html',
  styleUrls: ['./eletronic-repair.component.css']
})
export class EletronicRepairComponent extends BaseForm implements OnInit {
  public _formCollectDeliver: FormGroup;

  radioValue: string;
  radioValueDestinyType: string;

  itemEntryDateCols: number;
  itemEntryDateRowHeight: string = '200px';


  problemSolutionCols: number;
  problemSolutionRowHeight: string = '350px';

  userPwdCols: number;
  userPwdRowHeight: string = '180px';

  partnerIdSolutionCols: number;
  partnerIdSolutionRowHeight: string = '180px';

  both: boolean;
  destinyClients: boolean;
  destinyPartners: boolean;
  destinyOthers: boolean;


  constructor(
    private _eletronicRepairCreateService: EletronicRepairCreateService,
    private _actRoute: ActivatedRoute,
    private _fb: FormBuilder,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }

  startDate = new Date();

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  private _customers: CustomerDto[] = [];
  private _partners: PartnerDto[] = [];

  get customers() {
    return this._customers;
  }
  get partners() {
    return this._partners;
  }

  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {

            this.itemEntryDateCols = 1;

            this.problemSolutionCols = 1;

            this.userPwdCols = 1;

            this.partnerIdSolutionCols = 1;
            break;
          }
          case 'small': {

            this.itemEntryDateCols = 1;

            this.problemSolutionCols = 1;

            this.userPwdCols = 1;

            this.partnerIdSolutionCols = 1;
            break;
          }
          case 'medium': {

            this.itemEntryDateCols = 2;

            this.problemSolutionCols = 2;

            this.userPwdCols = 2;

            this.partnerIdSolutionCols = 2;
            break;
          }
          case 'large': {

            this.itemEntryDateCols = 2;

            this.problemSolutionCols = 2;

            this.userPwdCols = 2;

            this.partnerIdSolutionCols = 2;
            break;
          }
          case 'xlarge': {

            this.itemEntryDateCols = 2;

            this.problemSolutionCols = 2;

            this.userPwdCols = 2;

            this.partnerIdSolutionCols = 2;
            break;
          }
        }
      }
    })
  }


  // get partners(): PartnerDto[] {
  //   return this._eletronicRepairCreateService.partners
  // }

  // get clients(): CustomerDto[] {
  //   return this._eletronicRepairCreateService.customers
  // }


  formLoad() {
    return this.formMain = this._fb.group({
      customerId: ['', [Validators.required, Validators.maxLength(50)]],
      item: ['', [Validators.required, Validators.maxLength(50)]],
      entryDate: ['', [Validators.required]],
      description:['', [Validators.required,Validators.maxLength(500)]],
      problem: ['', [Validators.required, Validators.maxLength(500)]],
      user: ['', [Validators.maxLength(50)]],
      password: ['', [Validators.minLength(6), Validators.maxLength(50)]],
      price: ['', []],
      partnerId: ['', [Validators.required]],
      solution: ['', [Validators.required, Validators.maxLength(1000)]],
      authorized: [false, []],
    })
  }


  save() {

    if (this.alertSave(this.formMain)) {
      this._eletronicRepairCreateService.save(this.formMain);
      this.formLoad();
    }

  }

  ngOnInit(): void {
    // this._ActRoute.data.subscribe({
    //   next: (item: any) => {
    //     this._EletronicRepairCreateService.cli = <ClientDto[]>item.loaded['clients'];
    //     this._EletronicRepairCreateService.par = <PartnerDto[]>item.loaded['partners'];
    //   }
    // })

    this._actRoute.data.subscribe({
      next: (item: any) => {
        this._customers = <CustomerDto[]>item.loaded['customers'];
        this._partners = <PartnerDto[]>item.loaded['partners'];
        console.log(item.loaded['customers'])
      }
    });


    this.formLoad();
    this.screen();




  }

}
