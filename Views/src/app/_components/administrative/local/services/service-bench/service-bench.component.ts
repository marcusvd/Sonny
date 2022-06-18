import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ServiceBudgetDto } from '../service-budget/dto/service-budget-dto';
import { ServicesBudgetListService } from '../service-budget/services/services-budget-list.service';

@Component({
  selector: 'app-service-bench',
  templateUrl: './service-bench.component.html',
  styleUrls: ['./service-bench.component.css']
})
export class ServiceBenchComponent implements OnInit {

  private _statusStr: string;
  private _id: number;

  constructor(private _ServiceBudgetList: ServicesBudgetListService) { }

  save() {
    this._ServiceBudgetList.statusSave(this._id, this._statusStr);
    window.location.reload();
  }
  statusToSave($event, id: number) {
    this._id = id;
    this._statusStr = $event;

  }

  get entities(): ServiceBudgetDto[] {
    return this._ServiceBudgetList.getRecordFromDb.filter(x => x.osMake === true);
  }
  get status(): string[] {
    return this._ServiceBudgetList.status;
  }
  datasheetDetailsModal(id: number) {
    this._ServiceBudgetList.datasheetDetailsModal(id);
  }


  ngOnInit(): void {
    this._ServiceBudgetList.loadAllFromDb();
  }

}

