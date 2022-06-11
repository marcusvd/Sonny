import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ClientDto } from '../../../../client/dto/client-dto';
import { ClientCreateService } from '../../../../client/services/client-create.service';
import { ServiceBudgetDto } from '../dto/service-budget-dto';
import { ServicesBudgetCreateService } from '../services/services-budget-create.service';

@Component({
  selector: 'service-budget-create',
  templateUrl: './service-budget-create.component.html',
  styleUrls: ['./service-budget-create.component.css']
})
export class ServiceBudgetCreateComponent implements OnInit {

  collected: boolean;

  clients: ClientDto[] = [];

  constructor(
    private _ServicesBgtSrv: ServicesBudgetCreateService,
    private _ClientService: ClientCreateService,

  ) { }

  showHide(id: number) {
    const getById = document.getElementById(id.toString());
    console.log(getById);
  }

  switchCollected() {
    this.collected = !this.collected
  }
  emailSendOnOthersBlur($event) {
  }

  get emailField(): boolean {
    return this._ServicesBgtSrv.emailField;
  }
  set emailSend($event) {
    this._ServicesBgtSrv.emailSet = $event.target.value;
  }

  get pricesServiices(): FormArray {
    return this._ServicesBgtSrv.pricesServiices
  }

  // add() {
  //   this._ServicesBgtSrv.add();
  // }
  // removePriceService(i: number) {
  //   this._ServicesBgtSrv.removePriceService(i);
  // }

  formLoad() {
    this._ServicesBgtSrv.formLoad();
  }

  get form(): FormGroup {
    return this._ServicesBgtSrv.formGet
  }


  save() {
    this._ServicesBgtSrv.save();
  }




  ngOnInit(): void {
    this.formLoad();
    this._ClientService.loadAll$().subscribe(
      (clients: ClientDto[]) => {
        this.clients = clients;
       //this.clients.forEach((item: ClientDto)=>{console.log(item.id)})
      },
      (error) => {
        console.log(error)
      },
      () => {
        console.log('complete')
      })

  }

}
