import { BreakpointObserver } from "@angular/cdk/layout";
import { HttpClient } from "@angular/common/http";
import { Injectable, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BehaviorSubject } from "rxjs";

import { BaseForm } from "src/shared/helpers/forms/base-form";
import { IScreen } from "src/shared/helpers/responsive/iscreen";
import { ValidatorsService } from "src/shared/helpers/validators/validators.service";
import { ViaCepDto } from "../../table-g/dtos/address-dto";

@Injectable()

export class AddressService extends BaseForm {

  resizeColsRows = new BehaviorSubject<IScreen>(null);

  // cols: number;
  // rowHeight: string = '120px';



  constructor(
    private _Fb: FormBuilder,
    private _Http: HttpClient,
    override _validatorsService: ValidatorsService,
    override _breakpointObserver: BreakpointObserver,
    // override _responsiveService: ResponsiveService,
  ) { super(_validatorsService, _breakpointObserver) }

  formLoad(): FormGroup {
    return this.formMain = this._Fb.group({
      zipcode: ['', [Validators.maxLength(150)]],
      street: ['', [Validators.required, Validators.maxLength(150)]],
      number: ['', [Validators.required, Validators.maxLength(15)]],
      district: ['', [Validators.required, Validators.maxLength(150)]],
      city: ['', [Validators.required, Validators.maxLength(150)]],
      state: ['', [Validators.required, Validators.maxLength(3)]],
      complement: ['', [Validators.maxLength(500)]]
    });
  };

  get formGet() {
    return this.formMain
  }

  query(cep: string) {
    cep = cep.replace('.', '')
    cep = cep.replace('-', '')
    const cepClean = cep;
    var Url = (`//viacep.com.br/ws/${cepClean}/json`);
    //remove all characters that no be a number.
    cep = cep.replace(/\D/g, '');
    //check if the field are empty
    if (cep != "") {
      //check if number is valid
      var validationCep = /^[0-9]{8}$/;
    }
    if (validationCep?.test(cep)) {
      this._Http.get(Url).subscribe((paramCep: any) => {
        this.seedForm(paramCep)
      });
    }
  }

  seedForm(cepParam: ViaCepDto) {
    this.formMain.controls['complement'].setValue(cepParam.complemento);
    this.formMain.controls['street'].setValue(cepParam.logradouro);
    this.formMain.controls['district'].setValue(cepParam.bairro);
    this.formMain.controls['city'].setValue(cepParam.localidade);
    this.formMain.controls['state'].setValue(cepParam.uf);
  }

  // screen($event) {
  //   this.screenSize().subscribe({
  //     next: (result: IScreen) => {
  //       switch (result.size) {
  //         case 'xsmall': {
  //           //
  //           break;
  //         }
  //         case 'small': {
  //           //
  //           break;
  //         }
  //         case 'medium': {
  //           //
  //           break;
  //         }
  //         case 'large': {
  //           //
  //           break;
  //         }
  //         case 'xlarge': {
  //           //
  //           break;
  //         }
  //       }
  //     }
  //   })


  //   // if ($event.target.innerWidth <= 599.98) {
  //   //   // console.log('xSmall')
  //   //   this.
  //   //   this.onResizeService(1, '120px').subscribe(result => {
  //   //     this.cols = result.cols;
  //   //     this.rowHeight = result.rowHeight;
  //   //   })
  //   // }
  //   // else if ($event.target.innerWidth >= 600 && $event.target.innerWidth <= 959.98) {

  //   //   // console.log('Small')
  //   //   this.onResizeService(1, '120px').subscribe(result => {
  //   //     this.cols = result.cols;
  //   //     this.rowHeight = result.rowHeight;
  //   //   })
  //   // }
  //   // else if ($event.target.innerWidth >= 960 && $event.target.innerWidth <= 1279.98) {
  //   //   // console.log('Medium')
  //   //   this.onResizeService(2, '120px').subscribe(result => {
  //   //     this.cols = result.cols;
  //   //     this.rowHeight = result.rowHeight;
  //   //   })
  //   // }
  //   // else if ($event.target.innerWidth >= 1280 && $event.target.innerWidth <= 1919.98) {
  //   //   // console.log('Large')
  //   //   this.onResizeService(3, '120px').subscribe(result => {
  //   //     this.cols = result.cols;
  //   //     this.rowHeight = result.rowHeight;
  //   //   })
  //   // }
  //   // else if ($event.target.innerWidth >= 1920) {
  //   //   // console.log('XLarge')
  //   //   this.onResizeService(3, '120px').subscribe(result => {
  //   //     this.cols = result.cols;
  //   //     this.rowHeight = result.rowHeight;
  //   //   })
  //   // }

  // }



}
