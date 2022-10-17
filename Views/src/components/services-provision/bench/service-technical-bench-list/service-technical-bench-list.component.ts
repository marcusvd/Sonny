import { Component, OnInit, Output, EventEmitter, AfterViewInit, AfterContentInit, AfterContentChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { ServiceBenchDto } from '../dto/service-bench-dto';
import { ServicesBenchResolver } from '../resolver/services-bench.resolver';
import { ServiceTechnicalBenchListService } from '../services/service-technical-bench-list.service';
@Component({
  selector: 'service-technical-bench-list',
  templateUrl: './service-technical-bench-list.component.html',
  styleUrls: ['./service-technical-bench-list.component.css'],
  // providers: [ServiceTechnicalBenchListService]
})

export class ServiceTechnicalBenchListComponent extends BaseForm implements OnInit {

  indexTabContentField: number = 0;
  private _servicesBenchDto:ServiceBenchDto[];

  constructor(
    private _serviceTechnicalBenchListService: ServiceTechnicalBenchListService,
    private _actRouter: ActivatedRoute
  ) {
    super();
  }


  get dataSource() {
    // return this._servicesBenchDto;
   return this._serviceTechnicalBenchListService.serviceBenchFromDb;
  }

  tabContentIndex($event) {
    this.indexTabContentField = $event;
  }


  ngOnInit() {
    this._serviceTechnicalBenchListService.loadAllIncluded();
    // this._actRouter.data.subscribe((array: ServiceBenchDto[]) => {
    //   const serviceBenchDto = array['loaded'] as ServiceBenchDto[];
    //   this._servicesBenchDto = serviceBenchDto;
    //   // serviceBenchDto.forEach((entity: ServiceBenchDto) => {
    //   //   console.log(entity.client.name);
    //   // })
    // })
  }

}
