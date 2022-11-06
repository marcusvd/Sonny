import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';

import { OsEquipamentRemoveServicesService } from '../services/os-equipament_remove-services.service';


@Component({
  selector: 'create-os-remove-equipament',
  templateUrl: './create-os-remove-equipament.component.html',
  styleUrls: ['./create-os-remove-equipament.component.css']
})
export class CreateOsRemoveEquipament extends BaseForm implements OnInit {

  startClientNameCols:number;
  startClientNameRowHeight:string = '180px';
  assPrintCols:number;
  assPrintRowHeight:string = '140px';

  constructor(
    private _OsEquipamentRemoveServicesService: OsEquipamentRemoveServicesService,
    private _fb: FormBuilder,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }


  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.startClientNameCols = 1;
            this.assPrintCols = 1;

            break;
          }
          case 'small': {
            this.startClientNameCols = 1;
            this.assPrintCols = 1;

            break;
          }
          case 'medium': {
            this.startClientNameCols = 2;
            this.assPrintCols = 2;

            break;
          }
          case 'large': {
            this.startClientNameCols = 2;
            this.assPrintCols = 2;


            break;
          }
          case 'xlarge': {
            this.startClientNameCols = 2;
            this.assPrintCols = 2;

            break;
          }
        }
      }
    })
  }

  get startDate() {
    return this._OsEquipamentRemoveServicesService.startDate
  }

  // print($event: any) {
  //   this._OsEquipamentRemoveServicesService.print($event.checked);
  // }

  formLoad() {
    this.formMain = this._fb.group({
      start: ['', [Validators.required]],
      client: ['', []],
      usr: ['', []],
      pwd: ['', []],
      model: ['', []],
      equipament: ['', []],
      problem: ['', []],
    })

  }

  save() {
    this._OsEquipamentRemoveServicesService.save(this.formMain);
  }
  print(){
    window.print();
  }

  ngOnInit(): void {
    this.formLoad();
    this.screen();
  }

}
