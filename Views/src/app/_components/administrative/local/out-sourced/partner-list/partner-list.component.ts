import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { PartnerDto } from 'src/app/_components/administrative/local/out-sourced/dto/partner-dto';
import { DeleteModalComponent } from 'src/app/_shared/components/delete-modal/delete-modal.component';
import { environment } from 'src/environments/environment';
import { PartnerDetailsComponent } from 'src/app/_components/administrative/local/out-sourced/partner-details/partner-details.component';
import { PartnerListService } from 'src/app/_components/administrative/local/out-sourced/services/partner-list.service';

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
