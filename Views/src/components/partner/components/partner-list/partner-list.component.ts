import { Component, OnDestroy, OnInit } from '@angular/core';
import { PartnerListService } from 'src/components/partner/services/partner-list.service';

@Component({
  selector: 'partner-list',
  templateUrl: './partner-list.component.html',
  styleUrls: ['./partner-list.component.css']
})
export class PartnerListComponent implements OnInit {

  constructor(private _PartnerListService: PartnerListService) { }
  get partners() {
    return this._PartnerListService.partners;
  }
  ngOnInit(): void {
    this._PartnerListService.getAll();

  }


}
