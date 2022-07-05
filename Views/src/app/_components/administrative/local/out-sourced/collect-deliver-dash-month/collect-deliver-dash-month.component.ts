import { Component, OnInit } from '@angular/core';
import { CollectDeliverDto } from '../dto/collect-deliver-dto';
import { CollectDeliverListService } from '../services/collect-deliver-list.service';

@Component({
  selector: 'app-collect-deliver-dash-month',
  templateUrl: './collect-deliver-dash-month.component.html',
  styleUrls: ['./collect-deliver-dash-month.component.css']
})
export class CollectDeliverDashMonthComponent implements OnInit {

  constructor(private listService: CollectDeliverListService) {
  const ddd:string = 'sssss';
  ddd
  }


  get listEntity() {
    console.log(this.listService.cdEntity);
    return this.listService.cdEntity
  }



  ngOnInit(): void {
    this.listService.getAllMonth();
  }

}
