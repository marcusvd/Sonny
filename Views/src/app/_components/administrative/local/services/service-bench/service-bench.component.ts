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


  constructor(private _ServiceBudgetList: ServicesBudgetListService) { }


  get entities(): ServiceBudgetDto[] {
    return this._ServiceBudgetList.getRecordFromDb.filter(x => x.osMake === true);
  }
  get status(): string[] {
    return this._ServiceBudgetList.status;
  }
  datasheetDetailsModal(sb:ServiceBudgetDto) {
    this._ServiceBudgetList.datasheetDetailsModal(sb);
  }


  ngOnInit(): void {
    this._ServiceBudgetList.loadAllFromDb();
  }

}

