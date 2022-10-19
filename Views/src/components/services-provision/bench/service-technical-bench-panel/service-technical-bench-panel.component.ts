import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { BenchToCashBoxDto } from '../dto/bench-to-Cash-Box-Dto';
import { ServiceBenchDto } from '../dto/service-bench-dto';
import { ServiceTechnicalBenchListService } from '../services/service-technical-bench-list.service';
@Component({
  selector: 'service-technical-bench-panel',
  templateUrl: './service-technical-bench-panel.component.html',
  styleUrls: ['./service-technical-bench-panel.component.css']
})

export class ServiceTechnicalBenchPanelComponent extends BaseForm implements OnInit {

  @Input() serviceBenchDtoSingle: ServiceBenchDto;
  // controlOnOff:boolean = true;

  status: string[] = [
    'Não deu reparo.',
    'FINALIZADO',
    'Duvida, necessário conversar com o cliente.',
    'Problema físico (Hardware), troca de peça.',
    'Executando...',
    'Aguardando...'
  ];

  constructor(
    private _serviceTechnicalBenchListService: ServiceTechnicalBenchListService,
    private _fb: FormBuilder
  ) {
    super();
  }

  get getForm() {
    return this.formMain
  }

  get dataSource() {
    return this._serviceTechnicalBenchListService.serviceBenchFromDb;
  }

  formLoad() {
    this.formMain = this._fb.group({
      id: [this.serviceBenchDtoSingle.id, []],
      clientId: [this.serviceBenchDtoSingle.clientId, []],
      dateServiceStarted: [this.serviceBenchDtoSingle.dateServiceStarted, []],
      remote: [this.serviceBenchDtoSingle.remote, []],
      remoteAccessData: [this.serviceBenchDtoSingle.remoteAccessData, []],
      visually: [this.serviceBenchDtoSingle.visually, []],
      status: [this.serviceBenchDtoSingle.status, []],
      finished: [this.serviceBenchDtoSingle.finished, []],
      listBenchToCashBox: this._fb.array([])
    })
    this.seedingForm(this.serviceBenchDtoSingle.listBenchToCashBox);
  }

  seedingForm(loaded: BenchToCashBoxDto[]) {
    loaded.forEach((benchCashBoxDto: BenchToCashBoxDto) => {
      this.benchToCashBox.push(this._fb.group({
        id: [benchCashBoxDto.id, []],
        technician: [benchCashBoxDto.technician, []],
        priceService: [benchCashBoxDto.priceService, []],
        problemByTechnician: [benchCashBoxDto.problemByTechnician, []],
        // problemByTechnician: new FormControl({ value: benchCashBoxDto.problemByTechnician, disabled: true }),
        technicalSolutionApplied: [benchCashBoxDto.technicalSolutionApplied, []],
        status: [benchCashBoxDto.status, []],
        solved: [benchCashBoxDto.solved, []],
        hardware: [benchCashBoxDto.hardware, []],
        serviceBenchId: [benchCashBoxDto.serviceBenchId, []],
      }));

    })
  }


  get benchToCashBox(): FormArray {
    return <FormArray>this.formMain.get('listBenchToCashBox');
  }



  update() {
    this._serviceTechnicalBenchListService.update(this.formMain);
    // this.seedingForm(this.serviceBenchDtoSingle.listBenchToCashBox);
    // console.log(this.formMain.value);
  }

  ngOnInit() {
    this.formLoad();
  }

}
