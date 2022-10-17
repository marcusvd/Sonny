import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { BenchToCashBoxDto } from '../dto/bench-to-Cash-Box-Dto';
import { ServiceBenchDto } from '../dto/service-bench-dto';
import { ServiceTechnicalBenchListService } from '../services/service-technical-bench-list.service';
@Component({
  selector: 'service-technical-bench-panel',
  templateUrl: './service-technical-bench-panel.component.html',
})

export class ServiceTechnicalBenchPanelComponent extends BaseForm implements OnInit {

  @Input() serviceBenchDtoSingle: ServiceBenchDto;

  status: string[] = [
    'Não deu reparo.',
    'FINALIZADO',
    'Duvida, necessário conversar com o cliente.',
    'Problema físico (Hardware), troca de peça.',
    'Executando...',
  ];
  constructor(
    private _serviceTechnicalBenchListService: ServiceTechnicalBenchListService,
    private _actRouter: ActivatedRoute,
    private _fb: FormBuilder
  ) {
    super();
  }

  get getForm() {
    return this.formMain
  }


  get dataSource() {
    // return this._servicesBenchDto;
    return this._serviceTechnicalBenchListService.serviceBenchFromDb;
  }


  formLoad() {
    this.formMain = this._fb.group({
      id: [this.serviceBenchDtoSingle.id, []],

      listBenchToCashBox: this._fb.array([])
    })
    this.seedingForm(this.serviceBenchDtoSingle.listBenchToCashBox);
  }

  listBenchToCashBox(): FormGroup {
    return this.subForm = this._fb.group({
      technicalSolution: ['', []],
      status: ['', []],
    })
  }

  seedingForm(loaded?: BenchToCashBoxDto[]) {
    loaded?.forEach((benchToCashBoxDto?: BenchToCashBoxDto) => {
      this?.benchToCashBox?.push(this._fb.group(benchToCashBoxDto));
    })
  }

  get benchToCashBox(): FormArray {
    return <FormArray>this.formMain.get('listBenchToCashBox');
  }

  ngOnInit() {
    this.formLoad();
    // this._serviceTechnicalBenchListService.loadAllIncluded();
    // this._actRouter.data.subscribe((array: ServiceBenchDto[]) => {
    //   const serviceBenchDto = array['loaded'] as ServiceBenchDto[];
    //   this._servicesBenchDto = serviceBenchDto;
    //   // serviceBenchDto.forEach((entity: ServiceBenchDto) => {
    //   //   console.log(entity.client.name);
    //   // })
    // })
  }

}
