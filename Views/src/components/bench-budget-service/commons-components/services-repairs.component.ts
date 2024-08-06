import { BreakpointObserver } from "@angular/cdk/layout";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormArray, FormGroup } from "@angular/forms";
import { MatCheckbox } from "@angular/material/checkbox";
import { ActivatedRoute } from "@angular/router";


import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';
import { IScreen } from 'src/shared/components/inheritance/responsive/iscreen';
import { ValidatorMessages } from "src/shared/helpers/validators/validators-messages";
import { RepairStatusEnum } from "../dto/interfaces/i-repair-status.enum";
import { StatusService } from "../dto/interfaces/i-status-service";
import { TableProvidedServicesPricesDto } from "../dto/table-provided-services-prices-dto";
import { EditServicesService } from "../edit-services/services/edit-services.service";

@Component({
  selector: 'services-repairs',
  templateUrl: './services-repairs.component.html',
  styles: [`
  .serviceTitle{
    font-weight:bolder;
    font-size: 22px;
  }
  .margin-divider-title{
    margin-top:10px;
  }
  .qtsServicesx {
    font-weight: bolder;
  }
  .mat-icon-remove-repair{
    font-size: 50px;
    height: 50px;
    width:50px;
  }
  .mouse{
    cursor:pointer;
  }

  `]
})
export class ServicesRepairsComponent extends BaseForm implements OnInit {

  constructor(
    override _breakpointObserver: BreakpointObserver,
    private _actRoute: ActivatedRoute,
    private _editService: EditServicesService,
  ) {
    super(_breakpointObserver)
  }

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages;
  }

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

  @Input() override formMain: FormGroup;
  @Input() statusOfAllService: boolean = false;

  repairStatusEnum = new RepairStatusEnum();

  statusService: StatusService = new StatusService();

  screenFieldPosition: string = 'row';

  radioExecutionMode: { [key: string]: number } = { Remoto: 0, Presencial: 1, Laboratório: 2 }
  sort = () => {
    return 0
  }

  tableProvidedServicesPrices: TableProvidedServicesPricesDto[] = [];
  getTableOfServicePrices() {
    this._editService.loadById$<TableProvidedServicesPricesDto[]>('TableProvidedServicesPrices/GetAllAsync', JSON.parse(localStorage.getItem('companyId')))
      .subscribe((x: TableProvidedServicesPricesDto[]) => {
        this.tableProvidedServicesPrices = x;
      })


  }

  tablePrices($event: string, index: string) {

    const serviceName = $event;
    const i = index;

    this.tableProvidedServicesPrices.forEach((x: TableProvidedServicesPricesDto) => {
      if (x.serviceName === serviceName)
        this.formMain.get('service').get('repairs').get(i.toString()).get('priceService').setValue(x.priceService)
    })
    this.finishedStatus();
  }

  @Input() finishedHideShow: boolean = false;
  finishedStatus() {

    this.finishedHideShow = true;
    const repairs = this.formMain.get('service').get('repairs') as FormArray;

    let status: number[] = [];

    repairs.controls.forEach(x => {
      status.push(x.get('repairStatus').value)
    })

    const statusEnum = new RepairStatusEnum();

    status.forEach(x => {

      if (x == statusEnum.repairStatus['Aguardando cliente'] || x == statusEnum.repairStatus['Em processo'])
        this.finishedHideShow = false

    })
  }

  showHideBtnAdd: boolean = false;
  authCheckbox($event: MatCheckbox) {

    const auth = $event;

    if (auth.checked) {
      this.formMain.get('service').get('isAuthorized').setValue(new Date());
      this.showHideBtnAdd = true;
    }

    if (!auth.checked) {
      this.showHideBtnAdd = false;
      this.formMain.get('service').get('finished').setValue(null);
      this.formMain.get('service').get('isAuthorized').setValue(null);
    }

  }

  minValueDate = '0001-01-01T00:00:00';
  finished($event: MatCheckbox) {

    const finished = $event;

    if (finished.checked) {
      this.formMain.get('service').get('finished').setValue(new Date())
      this.formMain.get('statusService').setValue(5);
    }

    if (!finished.checked) {
      this.formMain.get('service').get('finished').setValue(this.minValueDate)
      this.formMain.get('statusService').setValue(2);
    }

  }

  @Output() removePricesIndex = new EventEmitter<number>();
  removePrices(id: number) {
    this.removePricesIndex.emit(id);
  }

  @Output() addPricesEvent = new EventEmitter<void>();
  addPrices() {
    this.addPricesEvent.emit();
    this.finishedStatus();
  }


  @Input() pricesArray: FormArray;
  ngOnInit(): void {
    this.getTableOfServicePrices();
    if (this.pricesArray.length > 0)
      this.showHideBtnAdd = true;
  }

}
