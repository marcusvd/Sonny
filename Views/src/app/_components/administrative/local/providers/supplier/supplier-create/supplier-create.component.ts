

import { Component, OnInit, Type } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { NavBackService } from 'src/app/_shared/services/navigation/nav-back.service';
import { ValidatorsService } from 'src/app/_shared/helpers/validators.service';

import { environment } from 'src/environments/environment';

import { MsgOperation } from 'src/app/_shared/services/messages/snack-bar.service';
import { SupplierDto } from 'src/app/_components/administrative/local/providers/supplier/dto/supplier-dto';
import { TypePaymentDto } from 'src/app/_components/administrative/local/financial/components/type-payment/dto/type-payment-dto';
import { Router } from '@angular/router';
import { SupplierCrudService, TypePaymentCrudService } from '../services/supplier-crud.service';
import { ContactValidatorsService } from 'src/app/_shared/components/contact/services/contact-validators.service';
import { AddressValidatorsService } from 'src/app/_shared/components/address/services/address-validators.service';



@Component({
  selector: 'supplier-create',
  templateUrl: './supplier-create.component.html',
  styleUrls: ['./supplier-create.component.css']
})
export class SupplierCreateComponent implements OnInit {

  public _formSupplier: FormGroup;
  private _supplier: SupplierDto;


  ids: number[];

  public _arrayOfTypes: any[] = [];
  private readonly _API_URL_TYPEPAY: string = `${environment._TYPEPAY}`
  private readonly _API_URL_SUPPLIER: string = `${environment._SUPPLIER}`

  constructor(
    private _FormBuilder: FormBuilder,
    private _SnackBar: MsgOperation,
    private _Crud: SupplierCrudService,
    private _TypePaymentService: TypePaymentCrudService,
    private _RouteList: Router,
    //private _FinancialService: FinancialService,
    public _ValidationMsg: ValidatorsService,
    public _Addr: AddressValidatorsService,
    private _CntValService: ContactValidatorsService,
    public _back: NavBackService,
  ) { }

  _form() {
    return this._formSupplier = this._FormBuilder.group({
      name: ['', []],
      description: [[], []],
      operation: [[], []],
      seller: ['', []],
      address: this._Addr.AddressForm(),
      contact: this._CntValService.ContactForm(),
      typespayments: ['', []],
    })
  }
  _backNow() {
    this._back.back();
  }
  save() {

    let typepaymentarray: TypePaymentDto[] = [];
    // if (this._formSupplier.value.TypesPayments) {
    // }
 //   console.log('AQUI',this._formSupplier.value.socialnetworks)




    this._formSupplier.value.typespayments.forEach(typeP => {
        typepaymentarray.push(typeP);
      });
      this._formSupplier.value.typespayments = typepaymentarray;

      this._supplier = new SupplierDto();
      this._supplier = {...this._formSupplier.value}

      // console.log(this._supplier)

      this._Crud.add$(this._supplier).subscribe((item: SupplierDto) => {
        this._SnackBar.msgCenterTop(`Fornecedor ${this._supplier.name} ${this._supplier.seller}`, 0, 5);
        //CLEAN Fields and forms for the next new insertion
        this._ValidationMsg.cleanAfters(['contact', 'addresss'], this._formSupplier)
        this._RouteList.navigate(['/supplier']);
      })


  }


  ngOnInit(): void {
    this._form();



    this._TypePaymentService.loadAll$<TypePaymentDto>().subscribe((item: TypePaymentDto[]) => {
      this._arrayOfTypes = item;

        // console.log(item);
    }, error => {
      // console.log(error);
    })

  }

}
