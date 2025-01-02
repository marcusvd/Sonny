import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';


import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductTypeService } from '../../services/product-type.service';
import { FormControllerAddProductType } from './useful/form-controller-add-product-type';
import { ImportsProductType } from './useful/imports-product-type';
import { ProductTypeValidatorAsync } from './useful/product-type-validator-async-fields';


@Component({
  selector: 'product-add-update',
  standalone: true,
  imports: [ImportsProductType],
  templateUrl: './add-product-type.component.html',
  styleUrls: ['./add-product-type.component.scss'],
  providers: [ProductTypeService]
})
export class AddProductTypeComponent extends FormControllerAddProductType implements OnInit {

  constructor(
    public _fbMain: FormBuilder,
    public _productTypeService: ProductTypeService,
    override _productTypeValidatorAsync: ProductTypeValidatorAsync,

  ) {
    super(_fbMain, _productTypeValidatorAsync)
  }

  ngOnInit(): void {
    this.formLoad();
    this.addEmptyFormArrays();
  }

  speedMeasure = ''
  storageMeasure = ''

  noEntriesFoundLabel = '';
  placeholderProduct = '';
  productNameAttribute = '';

  formErrosValidation = false;

  capacityHandle(value: string) {
    const handledValue = value.replace(/[^\d.-]/g, '');
    this.specificitiesForm.get('capacity').setValue(handledValue);
  }

  speedHandle(value: string) {
    const handledValue = value.replace(/[^\d.-]/g, '');
    this.specificitiesForm.get('speed').setValue(handledValue);
  }

  speed$ = of([{ id: 0, name: 'Não especificado' }, { id: 1, name: 'Hz' }, { id: 2, name: 'Khz' }, { id: 3, name: 'Mhz' }, { id: 4, name: 'Ghz' }, { id: 5, name: 'Thz' }, { id: 6, name: 'Rpm' }, { id: 7, name: 'Kbps' }, { id: 8, name: 'Mbps' }, { id: 9, name: 'Gbps' }]);
  storage$ = of([{ id: 0, name: 'Não especificado' }, { id: 1, name: 'Kb' }, { id: 2, name: 'Mb' }, { id: 3, name: 'Gb' }, { id: 4, name: 'Tb' }, { id: 5, name: 'Volt (V)' }, { id: 6, name: 'Watt (W)' }]);


  onSelectSpeedMeasure(id: number) {
    this.speed$.pipe(map(x => {
      const result = x.find(item => item.id === id)
      this.speedMeasure = this.specificitiesNone(result.name, 'speed');

    })).subscribe();
  }

  onSelectStorageMeasure(id: number) {
    this.storage$.pipe(map(x => {
      const result = x.find(item => item.id === id)

      this.storageMeasure = this.specificitiesNone(result.name, 'capacity');
    })).subscribe();

  }

  specificitiesNone = (value: string, item: string) => {
    if (value == 'Não especificado') {
      this.specificitiesForm.get(item).disable();
      this.specificitiesForm.get(item).reset();
      return null;
    }
    else
      this.specificitiesForm.get(item).enable();

    return value;
  }


  makeDescription = () => {

    const items = [] = ['Tipo de produto:', 'Segmento:', 'Fabricante:', 'Modelo:', 'Velocidade:', 'Capacidade:', 'Geração:', 'Versão:', 'Descrição:'];

    const typeName = this.formMain.get('name').value;
    const segmentName = this.segmentForm.get('name').value;
    const manufacturerName = this.manufacturerForm.get('name').value;
    const modelName = this.modelForm.get('name').value;

    const specificitiesSpeed = this.specificitiesForm.get('speed').value ?? '#'
    const specificitiesCapacity = this.specificitiesForm.get('capacity').value ?? '#'
    const specificitiesGenaration = this.specificitiesForm.get('genaration').value;
    const specificitiesVersion = this.specificitiesForm.get('version').value;
    const specificitiesDescription = this.specificitiesForm.get('description').value;


    const result = `
    ${items[0]}  ${typeName},
    ${items[1]}  ${segmentName},
    ${items[2]}  ${manufacturerName},
    ${items[3]}  ${modelName},
    ${items[4]}  ${specificitiesSpeed} ${this.speedMeasure ?? ''},
    ${items[5]}  ${specificitiesCapacity} ${this.storageMeasure ?? ''},
    ${items[6]}  ${specificitiesGenaration},
    ${items[7]}  ${specificitiesVersion},`;

    this.specificitiesForm.get('description').setValue(result);

  }



  handleFormToSave = () => {
    const speed = this.specificitiesForm.get('speed');
    const capacity = this.specificitiesForm.get('capacity');
    speed.setValue(speed.value + '|' + this.speedMeasure);
    capacity.setValue(capacity.value + '|' + this.storageMeasure);
  }

  save() {
    if (this.alertSave(this.formMain)) {

      this.handleFormToSave();
      this.saveBtnEnabledDisabled = true;
      this._productTypeService.add(this.formMain, this.segmentForm, this.manufacturerForm, this.modelForm, this.specificitiesForm);
      this.formControlReset();

    }
    else
      this.formErrosValidation = true;

  }


}
