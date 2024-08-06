import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

// import { IRadiosDictionary } from 'src/shared/components/radio-button-g/interfaces/Iradios-dictionary';
import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';
import { IScreen } from 'src/shared/components/inheritance/responsive/iscreen';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { TableProvidedServicesPricesHelper } from './helper/table-provided-services-prices-helper';
import { TableProvidedServicesPricesService } from './services/table-provided-services-prices.service';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
  selector: 'table-provided-services-prices',
  templateUrl: './table-provided-services-prices.component.html',
  styleUrls: ['./table-provided-services-prices.component.css']
})
export class TableProvidedServicesPricesComponent extends BaseForm implements OnInit {

  screenFieldPosition: string = 'row';

  tableProvidedServicesPricesHelper = new TableProvidedServicesPricesHelper(this._fb);


  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  // entitiesRegister: IRadiosDictionary<string> =
  //   { "B,Fabricante": "manufacturer", "A,TableProvidedServicesPriceso": "TableProvidedServicesPrices" }

  constructor(
    private _fb: FormBuilder,
    private _tableProvidedServicesPricesService: TableProvidedServicesPricesService,
    override _breakpointObserver: BreakpointObserver,
  ) {
    super(_breakpointObserver)
  }

  ngOnInit(): void {
    this.tableProvidedServicesPricesHelper.formLoadTableProvidedServicesPrices();
    this.tableProvidedServicesPricesHelper.addTableProvidedServicesPrices();
    this.screen();
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


  save() {


    if (this.alertSave(this.tableProvidedServicesPricesHelper.formTableProvidedServicesPrices)) {
      this._tableProvidedServicesPricesService.save(this.tableProvidedServicesPricesHelper.formTableProvidedServicesPrices);
      this.tableProvidedServicesPricesHelper.TableProvidedServicesPrices.clear();
      this.tableProvidedServicesPricesHelper.formLoadTableProvidedServicesPrices();
      this.tableProvidedServicesPricesHelper.addTableProvidedServicesPrices();
    }


  }



}
