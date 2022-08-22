import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { ServiceBudgetDto } from 'src/components/services-provision/service-budget/dto/service-budget-dto';
import { ServicesBudgetListService } from 'src/components/services-provision/service-budget/services/services-budget-list.service';
import { ServiceBenchListService } from '../services/service-bench-list.service';


@Component({
  selector: 'app-service-bench',
  templateUrl: './service-bench.component.html',
  styleUrls: ['./service-bench.component.css']
})
export class ServiceBenchComponent implements OnInit {

  private _dataSourceView: ServiceBudgetDto[] = [];
  // private _id: number;


  constructor(
    private _ServiceBudgetListServices: ServicesBudgetListService,
    private _ServiceBenchList: ServiceBenchListService
  ) { }

  get dataSourceView() {
    return this._dataSourceView;
  }
  // get displayedColumns(): string[] {
  //   return this._ServiceBenchList.displayedColumns;
  // }
  // get displayedColumnsBr(): string[] {
  //   return this._ServiceBenchList.displayedColumnsBr;
  // }

  // get spinnerShowHide() {
  //   return this._ServiceBenchList.spinnerShowHide
  // }

  // benchTableDto: BenchTableDto = null;


  // get entities(): BenchTableDto[] {
  //   let benchTableDto: BenchTableDto;
  //   const BenchTableArray: BenchTableDto[] = [];
  //   //.filter(x => x.osMake === true && x.status !== 'FINALIZADO')
  //   this._ServiceBudgetList.getRecordFromDb
  //     .forEach((sb: ServiceBudgetDto) => {
  //       benchTableDto = new BenchTableDto()

  //       benchTableDto.id = sb.id;
  //       benchTableDto.client = sb.client.name;
  //       benchTableDto.entryDateOs = sb.entryDateOs;
  //       benchTableDto.clientProblems = sb.clientProblems;
  //       benchTableDto.status = sb.status;
  //       BenchTableArray.push(benchTableDto);
  //     })
  //   return BenchTableArray;
  // }

  // get status(): string[] {
  //   return this._ServiceBudgetList.status.filter(x => x !== 'FINALIZADO');
  // }
  // datasheetDetailsModal(id: number) {
  //   this._ServiceBudgetList.datasheetDetailsModal(id);
  // }
  // makeMoney(id: number) {
  //   this._ServiceBudgetList.makeMoney(id);
  // }

  // save() {
  //   this._ServiceBudgetList.statusSave(this._id, this._statusStr);
  //   window.location.reload();
  // }
  // statusToSave($event, id: number) {
  //   this._id = id;
  //   this._statusStr = $event;

  // }
  // sort($event: Sort) {
  //   const evt: Sort = $event;
  //   this._ServiceBenchList.sortData(evt);
  //   console.log($event)
  // }



  get dataSource() {
    return this._ServiceBenchList.dataSource;
  }


  ngOnInit(): void {
    this._ServiceBenchList.firstToLoad(this._ServiceBudgetListServices);
    // this._ServiceBenchList.firstToLoad(this._ServiceBenchList);
    // this.dataSource.subscribe((serviceBudgetArray: ServiceBudgetDto[]) => {
    //   this._dataSourceView = serviceBudgetArray;
    // }

    // )
  }

}

