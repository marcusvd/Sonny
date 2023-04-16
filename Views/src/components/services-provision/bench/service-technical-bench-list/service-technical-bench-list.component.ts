import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, Output, EventEmitter, AfterViewInit, AfterContentInit, AfterContentChecked } from '@angular/core';
import { FormArray, UntypedFormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { BenchToCashBoxDto } from '../dto/bench-to-Cash-Box-Dto';
import { ServiceBenchDto } from '../dto/service-bench-dto';
import { ServiceTechnicalBenchListService } from '../services/service-technical-bench-list.service';
@Component({
  selector: 'service-technical-bench-list',
  templateUrl: './service-technical-bench-list.component.html',
  styleUrls: ['./service-technical-bench-list.component.css'],
  // providers: [ServiceTechnicalBenchListService]
})

export class ServiceTechnicalBenchListComponent extends BaseForm implements OnInit {
  title:string = 'Bancada';
  subTitle:string = 'Técnica';

  indexTabContentField: number = 0;
  private _servicesBenchDto: ServiceBenchDto[];

  status: string[] = [
    'Não deu reparo.',
    'FINALIZADO',
    'Duvida, necessário conversar com o cliente.',
    'Problema físico (Hardware), troca de peça.',
    'Executando...',
  ];
  constructor(
    private _serviceTechnicalBenchListService: ServiceTechnicalBenchListService,
    private _fb: UntypedFormBuilder,
     override _breakpointObserver: BreakpointObserver,
    ) { super(_breakpointObserver) }

  get getForm() {
    return this.formMain
  }


  get dataSource() {
    // return this._servicesBenchDto;
    return this._serviceTechnicalBenchListService.serviceBenchFromDb;
  }

  tabContentIndex($event:any) {
    this.indexTabContentField = $event;
  }

  // formLoad() {
  //   this.formMain = this._fb.group({
  //     id: [this.entity.id, []],

  //     listBenchToCashBox: this._fb.array([])
  //   })
  //   this.seedingForm(this.entity.solutionsPrices);
  // }

  // listBenchToCashBox(): FormGroup {
  //   return this.subForm = this._fb.group({
  //     technicalSolution: ['', []],
  //     status: ['', []],
  //   })
  // }

  // seedingForm(loaded?: BenchToCashBoxDto[]) {
  //   loaded?.forEach((benchToCashBoxDto?: BenchToCashBoxDto) => {
  //     this?.benchToCashBox?.push(this._fb.group(benchToCashBoxDto));
  //   })
  // }

  // get benchToCashBox(): FormArray {
  //   return <FormArray>this.formMain.get('listBenchToCashBox');
  // }

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
