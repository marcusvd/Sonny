import { Component, OnInit } from "@angular/core";
import { validateBasis } from "@angular/flex-layout";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { BaseForm } from "src/shared/helpers/forms/base-form";
import { ClientCreateService } from "../services/client-create.service";



@Component({
  selector: 'client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.css'],
  providers: [
    ClientCreateService
  ]
})

export class ClientCreateComponent extends BaseForm implements OnInit {


  constructor(
    private _ClientService: ClientCreateService,
    private _Fb: FormBuilder
  ) { super() }

  save() {
    this._ClientService.save(this.formMain);
  }

  valueDate() {
    return this._ClientService.valueAndDateChange();
  }

  get valueDateGet() {
    return this._ClientService.valueDateGet;
  }

  address($event?: any) {
    const evt: FormGroup = $event;
    return evt;
  }

  contact($event?: any) {
    const evt: FormGroup = $event;
    return evt;
  }

  formLoad(): FormGroup {
    return this.formMain = this._Fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      cnpj: ['', [Validators.required, Validators.maxLength(8), Validators.minLength(8)]],
      responsible: ['', Validators.required, Validators.maxLength(100)],
      comments: ['', [Validators.maxLength(500)]],
      assured: ['', []],
      clientType: ['', []],
      payment: ['', []],
      expiration: ['', []],
      discount: [0, []],
      address: this.address(),
      contact: this.contact()
    })
  }

  ngOnInit(): void {
    this.formLoad();

  }

}







