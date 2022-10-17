import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ServiceBenchDto } from '../dto/service-bench-dto';
import { ServiceTechnicalBenchListService } from '../services/service-technical-bench-list.service';

@Injectable()

export class ServicesBenchResolver implements Resolve<ServiceBenchDto[]> {

  constructor(private _serviceTechnicalBenchListService: ServiceTechnicalBenchListService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<ServiceBenchDto[]> {
    return this._serviceTechnicalBenchListService.loadAllIncluded$();
  }
}
