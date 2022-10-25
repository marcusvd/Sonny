import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';

import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { ValidatorsService } from 'src/shared/helpers/validators/validators.service';
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
  problemByTechnicianTechnicalSolutionRowHeightDefault: string = '350px';

  problemByTechnicianTechnicalSolutionCols: number = 2;
  problemByTechnicianTechnicalSolutionRowHeight: string = this.problemByTechnicianTechnicalSolutionRowHeightDefault;

  saveFinishCols: number = 2;
  saveFinishRowHeight: string = '50px';

  statusSolvedRowHeightDefault: string = '140px';
  statusSolvedCols: number = 2;
  statusSolvedRowHeight: string = this.statusSolvedRowHeightDefault;

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
    private _fb: FormBuilder,
    override _validatorsService: ValidatorsService,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_validatorsService, _breakpointObserver) }


  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.problemByTechnicianTechnicalSolutionCols = 1;
            this.problemByTechnicianTechnicalSolutionRowHeight = this.problemByTechnicianTechnicalSolutionRowHeightDefault;

            this.saveFinishCols = 1;
            this.saveFinishRowHeight = '50px';

            this.statusSolvedCols = 1;
            this.statusSolvedRowHeight = this.statusSolvedRowHeightDefault;
            break;
          }
          case 'small': {
            this.problemByTechnicianTechnicalSolutionCols = 1;
            this.problemByTechnicianTechnicalSolutionRowHeight = this.problemByTechnicianTechnicalSolutionRowHeightDefault;

            this.saveFinishCols = 1;
            this.saveFinishRowHeight = '50px';

            this.statusSolvedCols = 1;
            this.statusSolvedRowHeight = this.statusSolvedRowHeightDefault;
            break;
          }
          case 'medium': {
            this.problemByTechnicianTechnicalSolutionCols = 2;
            this.problemByTechnicianTechnicalSolutionRowHeight = this.problemByTechnicianTechnicalSolutionRowHeightDefault;

            this.saveFinishCols = 2;
            this.saveFinishRowHeight = '50px';

            this.statusSolvedCols = 2;
            this.statusSolvedRowHeight = this.statusSolvedRowHeightDefault;
            break;
          }
          case 'large': {
            this.problemByTechnicianTechnicalSolutionCols = 2;
            this.problemByTechnicianTechnicalSolutionRowHeight = this.problemByTechnicianTechnicalSolutionRowHeightDefault;

            this.saveFinishCols = 2;
            this.saveFinishRowHeight = '50px';

            this.statusSolvedCols = 2;
            this.statusSolvedRowHeight = this.statusSolvedRowHeightDefault;
            break;
          }
          case 'xlarge': {
            this.problemByTechnicianTechnicalSolutionCols = 2;
            this.problemByTechnicianTechnicalSolutionRowHeight = this.problemByTechnicianTechnicalSolutionRowHeightDefault;

            this.saveFinishCols = 2;
            this.saveFinishRowHeight = '50px';

            this.statusSolvedCols = 2;
            this.statusSolvedRowHeight = this.statusSolvedRowHeightDefault;
            break;
          }
        }
      }
    })




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
  }

  ngOnInit() {
    this.formLoad();
  }

}
