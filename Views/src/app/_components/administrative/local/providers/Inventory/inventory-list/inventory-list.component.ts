import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { BehaviorSubject, Observable } from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';
import { InventoryDto } from 'src/app/_components/administrative/local/providers/Inventory/dto/inventory-dto';
import { environment } from 'src/environments/environment';
import { InventoryCreateService } from '../services/inventory-create.service';
import { DataSource } from '@angular/cdk/collections';
import { ActivatedRoute } from '@angular/router';
import { InventoryListService } from '../services/inventory-list.service';

@Component({
  selector: 'inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css']
})

export class InventoryListComponent implements OnInit {

  private _inventories: InventoryDto[] = [];

  constructor(
    // private _InventoryService: InventoryService,
    private _InventoryListService: InventoryListService,
    private _ActivedRoute: ActivatedRoute
  ) { }

  get inventories() {
    return this._inventories
  }


  datasource() {
    const data = new BehaviorSubject<InventoryDto[]>(this._InventoryListService.inventories)
    return data;
  }

  displayedColumns: string[] = [
    'id',
    'equipament',
    'quantity',
    'model',
    'saleprice',
    'manufactorer',
    //   'isnew',
    // 'istested',
    // 'supplier',
    // 'warranty',
    // 'today',
    // 'sn',
    // 'generation',
    // 'capacity',
    // 'speed',
  ]





  ngOnInit(): void {
    this._InventoryListService.loadAll();
  }



}



