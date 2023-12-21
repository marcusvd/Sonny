import { BreakpointObserver } from "@angular/cdk/layout";
import { Component, OnInit } from "@angular/core";


import { BaseForm } from "src/shared/helpers/forms/base-form";
import { IScreen } from "src/shared/helpers/responsive/iscreen";
import { CommonService } from "./services/common.service";
import { GridListOptsGHelper } from "src/shared/components/grid-list-opts/helpers/grid-list-opts-helper";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'hardware-included',
  templateUrl: './hardware-included.component.html',
  styles: [`
  .hardwareTitle{
    font-weight:bolder;
    font-size: 22px;
  }
  .margin-divider-title{
    margin-top:10px;
  }
  `]
})
export class HardwareIncludedComponent extends BaseForm implements OnInit {

  constructor(
    override _breakpointObserver: BreakpointObserver,
    private _commonService: CommonService,
    private _route: ActivatedRoute,
    private _http: HttpClient,
  ) {
    super(_breakpointObserver)
  }

  screenFieldPosition: string = 'row';
  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.screenFieldPosition = 'column';
            break;
          }
          case 'small': {
            this.screenFieldPosition = 'column';
            break;
          }
          case 'medium': {
            this.screenFieldPosition = 'row';
            break;
          }
          case 'large': {
            this.screenFieldPosition = 'row';
            break;
          }
          case 'xlarge': {
            this.screenFieldPosition = 'row';
            break;
          }
        }
      }
    })
  }
  gridListOptsGHelper = new GridListOptsGHelper(this._http, this._route);

  trackingInServicesBackEndUrl: string = 'productstrackings/GetByIdInServicesAsync';
  pageSize: number = 5;
  ngOnInit(): void {
    this.gridListOptsGHelper.pageSize = this.pageSize;

    this.gridListOptsGHelper.getAllEntitiesPaged(this.trackingInServicesBackEndUrl, this.gridListOptsGHelper.paramsTo(1, this.pageSize, 4));

    // this.gridListOptsGHelper.entities$.subscribe((x: CustomerDto[]) => {

    //   let viewDto = new CustomerGridDto;
    //   this.entities = [];
    //   x.forEach((xy: CustomerDto) => {
    //     viewDto = new CustomerGridDto();
    //     viewDto.id = xy.id;
    //     viewDto.name = xy.name;
    //     viewDto.bussinesLine = xy.businessLine;
    //     this.entities.push(viewDto);

    //   })

    //   this.entities$ = of(this.entities)
    // })
    // this.gridListOptsGHelper.getLengthEntitiesFromBackEnd('customersLength');
    // this.lengthCustomer = this.gridListOptsGHelper.length;
  }

}
