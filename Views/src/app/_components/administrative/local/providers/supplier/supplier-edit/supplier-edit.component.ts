import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { NavBackService } from 'src/app/_shared/services/navigation/nav-back.service';
import { ValidatorsService } from 'src/app/_shared/helpers/validators.service';
import { environment } from 'src/environments/environment';
import { SupplierDto } from 'src/app/_components/administrative/local/providers/supplier/dto/supplier-dto';
import { TypePaymentDto } from 'src/app/_components/administrative/local/financial/components/type-payment/dto/type-payment-dto';
import { MsgOperation } from 'src/app/_shared/services/messages/snack-bar.service';
import { SupplierCrudService } from 'src/app/_components/administrative/local/providers/supplier/services/supplier-crud.service';
import { ContactService } from 'src/app/_shared/components/contact/services/contact.service';
import { AddressService } from 'src/app/_shared/components/address/services/address.service';


@Component({
  selector: 'supplier-edit',
  templateUrl: './supplier-edit.component.html',
  styleUrls: ['./supplier-edit.component.css']
})
export class SupplierEditComponent implements OnInit, OnDestroy {

  _subscription$: Subscription;
  _supplier: SupplierDto;
  _formSupplier: FormGroup;
  public _arrayOfTypes: TypePaymentDto[] = [];

  public toppings = new FormControl();
  public selected: string[] = [];

  constructor(
    private _CntValService: ContactService,
    public _Addr: AddressService,
    private _FormBuilder: FormBuilder,
    private _Crud: SupplierCrudService,
    private _RouteList: Router,
    private _Route: ActivatedRoute,
    public _ValidationMsg: ValidatorsService,
    public _Back: NavBackService,
    private _SnackBar: MsgOperation,
  ) {

  }

  loadFormData(supplier: SupplierDto) {

    supplier.contact.socialnetworks.forEach((snw) => {
      this._CntValService.socialNets.push(this._CntValService.SocialNetworkValidators())
    })
    this._formSupplier.patchValue(supplier);
  }

  makerFormValidation(supplier: SupplierDto) {
    let TypePaymentArray = [];
    this._formSupplier = this._FormBuilder.group({
      id: [supplier.id, []],
      name: [supplier.name, []],
      seller: [supplier.seller, []],
      description: [supplier.description, []],
      operation: [supplier.operation, []],
      address: this._Addr.AddressEdit(),
      // contact: this._CntValService.ContactFormEdit(),
      typespayments: [],
      tpaylistbool: [],
    })
  }

  dataToLoad() {
    this._subscription$ = this._Route.data.subscribe(
      (item: { supedit: SupplierDto }) => {
        this._supplier = item.supedit[0];
        //Selected Items
        this.selected = this._supplier.typespayments.map((_checked) => _checked.name);
        this._arrayOfTypes = item.supedit[1];
        this.makerFormValidation(item.supedit[0]);
        this.loadFormData(item.supedit[0]);
      }
    );
  }


  save() {

    const typesToSave: string[] = this._formSupplier.value.typespayments;

    const _typePaymentArray: TypePaymentDto[] = [];

    let singleType: TypePaymentDto;

    typesToSave.forEach(toMount => {
      this._arrayOfTypes.forEach(_type => {
        if (toMount === _type.name) {
          singleType = new TypePaymentDto();
          singleType.id = _type.id;
          _typePaymentArray.push(singleType)
        }
      })
    })

    this._formSupplier.value.typespayments = _typePaymentArray;


    const toSave: SupplierDto = { ... this._formSupplier.value }

    console.log(toSave);
    const routeId: number = toSave.id;

    this._Crud.update$<SupplierDto>(toSave).subscribe((itemSupp: SupplierDto) => {
      this._RouteList.navigate(['supplier/edit/'+routeId]);
      // this._ValidationMsg.cleanAfters(['contact', 'addresss'], this._formSupplier);
      // // CLEAN Fields and forms for the next new insertion.
      this._SnackBar.msgCenterTop(`Fornecedor ${itemSupp.name} ${itemSupp.seller}`, 2, 5);
    });



  }


  ngOnInit(): void {
    this.dataToLoad();
  }


  ngOnDestroy(): void {
    this._subscription$.unsubscribe();
  }


}
