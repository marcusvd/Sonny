import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { PartnerDto } from 'src/app/_components/administrative/local/out-sourced/dto/partner-dto';
import { DeleteModalComponent } from 'src/app/_shared/components/delete-modal/delete-modal.component';
import { environment } from 'src/environments/environment';
import { PartnerDetailsComponent } from 'src/app/_components/administrative/local/out-sourced/partner-details/partner-details.component';
import { PartnerSupplierListService } from 'src/app/_components/administrative/local/out-sourced/services/partner-supplier-list.service';

@Component({
  selector: 'partner-list',
  templateUrl: './partner-supplier-list.component.html',
  styleUrls: ['./partner-supplier-list.component.css']
})
export class PartnerSupplierListComponent implements OnInit {



  constructor(private _PartnerSupplierListService: PartnerSupplierListService) { }
  get partners() {
    return this._PartnerSupplierListService.partners;
  }
  ngOnInit(): void {
    this._PartnerSupplierListService.getAll();

  }


}
