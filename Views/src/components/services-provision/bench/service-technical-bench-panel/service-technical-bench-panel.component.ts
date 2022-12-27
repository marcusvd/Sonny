import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, Input } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, Validators } from '@angular/forms';

import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
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
    'FINALIZADO.',
    'Duvida, necessário conversar com o cliente.',
    'Problema físico (Hardware), troca de peça.',
    'Executando...',
    'Aguardando...'
  ];

  constructor(
    private _serviceTechnicalBenchListService: ServiceTechnicalBenchListService,
    private _fb: UntypedFormBuilder,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }


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

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  // private valCustom = ValidatorsCustom;
  // get validatorCustom() {
  //   return this.valCustom
  // }

  // get getForm() {
  //   return this.formMain
  // }

  get dataSource() {
    return this._serviceTechnicalBenchListService.serviceBenchFromDb;
  }

  formLoad() {
    this.formMain = this._fb.group({
      id: [this.serviceBenchDtoSingle.id, []],
      customerId: [this.serviceBenchDtoSingle.customerId, []],
      dateServiceStarted: [this.serviceBenchDtoSingle.dateServiceStarted, []],
      remote: [this.serviceBenchDtoSingle.remote, []],
      remoteAccessData: [this.serviceBenchDtoSingle.remoteAccessData, []],
      visually: [this.serviceBenchDtoSingle.visually, []],
      status: [this.serviceBenchDtoSingle.status, []],
      finished: [this.serviceBenchDtoSingle.finished, []],
      listBenchToCashBox: this._fb.array([])
      //
    })
    this.seedingForm(this.serviceBenchDtoSingle.listBenchToCashBox);
  }

  seedingForm(loaded: BenchToCashBoxDto[]) {
    loaded.forEach((benchCashBoxDto: BenchToCashBoxDto) => {
      this.benchToCashBox.push(
        this.subForm = this._fb.group({
          id: [benchCashBoxDto.id, []],
          technician: [benchCashBoxDto.technician, [Validators.required, Validators.maxLength(50)]],
          priceService: [benchCashBoxDto.priceService, []],
          problemByTechnician: [benchCashBoxDto.problemByTechnician, [Validators.required, Validators.maxLength(500)]],
          // problemByTechnician: new FormControl({ value: benchCashBoxDto.problemByTechnician, disabled: true }),
          technicalSolutionApplied: [benchCashBoxDto.technicalSolutionApplied, [Validators.required, Validators.maxLength(500)]],
          status: [benchCashBoxDto.status, [Validators.required]],
          solved: [benchCashBoxDto.solved, []],
          // hardware: [benchCashBoxDto.hardware, []],
          serviceBenchId: [benchCashBoxDto.serviceBenchId, []],
        })
      );
    })
  }

  // benchToCashBoxFormGroup(loaded: BenchToCashBoxDto[]) {
  //   loaded.map((formGroup) => {
  //     this.subForm = this._fb.group({
  //       id: [formGroup.id, []],
  //     technician: [formGroup.technician, []],
  //     priceService: [formGroup.priceService, []],
  //     problemByTechnician: [formGroup.problemByTechnician, []],
  //     // problemByTechnician: new FormControl({ value: formGroup.problemByTechnician, disabled: true }),
  //     technicalSolutionApplied: [formGroup.technicalSolutionApplied, []],
  //     status: [formGroup.status, []],
  //     solved: [formGroup.solved, []],
  //     // hardware: [formGroup.hardware, []],
  //     serviceBenchId: [formGroup.serviceBenchId, []],
  //     })
  //   })



  //   // this.subForm = this._fb.group({
  //   //   id: [benchCashBoxDto.id, []],
  //   //   technician: [benchCashBoxDto.technician, []],
  //   //   priceService: [benchCashBoxDto.priceService, []],
  //   //   problemByTechnician: [benchCashBoxDto.problemByTechnician, []],
  //   //   // problemByTechnician: new FormControl({ value: benchCashBoxDto.problemByTechnician, disabled: true }),
  //   //   technicalSolutionApplied: [benchCashBoxDto.technicalSolutionApplied, []],
  //   //   status: [benchCashBoxDto.status, []],
  //   //   solved: [benchCashBoxDto.solved, []],
  //   //   // hardware: [benchCashBoxDto.hardware, []],
  //   //   serviceBenchId: [benchCashBoxDto.serviceBenchId, []],
  //   // })
  // }


  get benchToCashBox(): UntypedFormArray {
    return <UntypedFormArray>this.formMain.get('listBenchToCashBox');
  }

  update() {
    this._serviceTechnicalBenchListService.update(this.formMain);
  }

  ngOnInit() {
    this.formLoad();
    // this.benchToCashBoxFormGroup();
    console.log(this.formMain.controls['listBenchToCashBox'])
    //console.log(this.subForm)
  }

}
