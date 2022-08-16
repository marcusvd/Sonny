import { X } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ServiceBudgetDto } from '../service-budget/dto/service-budget-dto';
import { ServicesBudgetListService } from '../service-budget/services/services-budget-list.service';
import { BenchTableDto } from './dto/bench-table-dto';

@Component({
  selector: 'app-service-bench',
  templateUrl: './service-bench.component.html',
  styleUrls: ['./service-bench.component.css']
})
export class ServiceBenchComponent implements OnInit {

  private _statusStr: string;
  private _id: number;

  private _fields: string[] = ['id', 'client', 'entryDateOs', 'clientProblems', 'status']
  private _fieldsBr: string[] = ['Código', 'Cliente', 'Reparo iniciado', 'Dificuldade visão cliente', 'Situação']

  constructor(private _ServiceBudgetList: ServicesBudgetListService) { }

  get fields(): string[] {
    return this._fields;
  }
  get fieldsBr(): string[] {
    return this._fieldsBr;
  }





  get entities(): BenchTableDto[] {
    let benchTableDto: BenchTableDto;
    const BenchTableArray: BenchTableDto[] = [];
    this._ServiceBudgetList.getRecordFromDb.filter(x => x.osMake === true && x.status !== 'FINALIZADO')
      .forEach((sb: ServiceBudgetDto) => {
        benchTableDto = new BenchTableDto()

        benchTableDto.id = sb.id;
        benchTableDto.client = sb.client.name;
        benchTableDto.entryDateOs = sb.entryDateOs;
        benchTableDto.clientProblems = sb.clientProblems;
        benchTableDto.status = sb.status;
        BenchTableArray.push(benchTableDto)
      })
    return BenchTableArray;
  }

  get status(): string[] {
    return this._ServiceBudgetList.status.filter(x => x !== 'FINALIZADO');
  }
  datasheetDetailsModal(id: number) {
    this._ServiceBudgetList.datasheetDetailsModal(id);
  }
  makeMoney(id: number) {
    this._ServiceBudgetList.makeMoney(id);
  }

  save() {
    this._ServiceBudgetList.statusSave(this._id, this._statusStr);
    window.location.reload();
  }
  statusToSave($event, id: number) {
    this._id = id;
    this._statusStr = $event;

  }

  ngOnInit(): void {
    this._ServiceBudgetList.loadAllFromDb();
  }

}

