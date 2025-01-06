import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
// import { ProductTypeService } from '../../services/product-type.service';
import { FormControllerAddProductType } from './useful/form-controller-add-product-type';
import { ImportsProductType } from './useful/imports-product-type';
import { ProductTypeValidatorAsync } from './useful/product-type-validator-async-fields';
import { ProductTypeDto } from '../../../dtos/product-type-dto';
import { SegmentDto } from '../../../dtos/segment-dto';
import { ManufacturerDto } from '../../../dtos/manufacturer-dto';
import { ModelDto } from '../../../dtos/model-dto';
import { ProductDto } from '../../../dtos/product-dto';
import { ProductTypeService } from '../../../services/product-type.service';
import { UpdateProductTypeService } from './services/update-product-type.service';


@Component({
  selector: 'new-item-product-type',
  standalone: true,
  imports: [ImportsProductType],
  templateUrl: './new-item-product-type.component.html',
  styleUrls: ['./new-item-product-type.component.scss'],
  providers: []
})
export class NewItemProductTypeComponent extends FormControllerAddProductType implements OnInit, OnChanges {

  @Input() newItemSelected = ''
  @Output() formMainSend = new EventEmitter<FormGroup>();
  @Input() formMainReceived: FormGroup;

  // @Input() formFromromAddProduct: FormGroup;
  // @Input() formToAddArrayUpdate: FormGroup;

  // @Input('productsTypes') productsTypes$ = new Observable<ProductTypeDto[]>();
  // @Input('segments') segments$: Observable<SegmentDto[]>;
  // @Input('manufacturers') manufacturers$: Observable<ManufacturerDto[]>
  // @Input('models') models$: Observable<ModelDto[]>
  // @Input() setSegment: boolean = false;
  // @Input() setManufacturer: boolean = false;

  constructor(
    public _fbMain: FormBuilder,
    public _productTypeService: UpdateProductTypeService,
    override _productTypeValidatorAsync: ProductTypeValidatorAsync,

  ) {
    super(_fbMain, _productTypeValidatorAsync)
  }


  ngOnChanges(changes: SimpleChanges): void {

    // if (this.newItemSelected != '') 


    // if (changes['setSegment']?.currentValue) {
    //   // console.log("deu bom")
    //   this.updateForms(this.segmentForm, 'segmentId', this.segments$);
    // }
    // this.updateSegment();
    // console.log(this.formFromromAddProduct.value)
  }



  ngOnInit(): void {
    this.formLoad();
    this.formMainSend.emit(this.formMain);
    this.addEmptyFormArrays();

    // this.updateForms(this.formMain, 'productTypeId', this.productsTypes$);

    // this.selectedNameHandle('productTypeId', this.productsTypes$, 0);
    // this.selectedNameHandle('segmentId', this.segments$, 1);
    // this.selectedNameHandle('manufacturerId', this.manufacturers$, 2);
    // this.selectedNameHandle('modelId', this.models$, 3);

  }

  speedMeasure = ''
  storageMeasure = ''

  noEntriesFoundLabel = '';
  placeholderProduct = '';
  productNameAttribute = '';
  // resultNames: string[] = [];
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

  handleForms = () => {
    this.segmentForm = this.formMainReceived.get('segments').get('0') as FormGroup;
    this.manufacturerForm = this.segmentForm.get('manufacturers').get('0') as FormGroup;
  }

  getSpecificitiesFormValues(value: string) {
    return this.formMain.get('segments')?.get('0').get('manufacturers').get('0').get('models').get('0').get('specificities').get('0').get(value).value
  }

  makeDescription = async () => {
   
    this.handleForms();

    const items = [] = ['Tipo de produto:', 'Segmento:', 'Fabricante:', 'Modelo:', 'Velocidade:', 'Capacidade:', 'Geração:', 'Versão:', 'Descrição:'];

    const typeName = this.formMain.get('name').value || '#';
    const segmentName = this.segmentForm.get('name').value || '#';
    const manufacturerName = this.manufacturerForm.get('name').value || '#';
    const modelName = this.modelForm.get('name').value || '#';

    const specificitiesSpeed = this.getSpecificitiesFormValues('speed') || '#';

    const specificitiesCapacity = this.getSpecificitiesFormValues('capacity') || '#';
    const specificitiesGenaration = this.getSpecificitiesFormValues('generation') || '#';
    const specificitiesVersion = this.getSpecificitiesFormValues('version') || '#';
 
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


    console.log(this.formMain.controls)
    if (this.alertSave(this.formMain)) {

      this.handleFormToSave();
      this.saveBtnEnabledDisabled = true;
      this._productTypeService.updateSingle(this.formMain);
      this.formControlReset();

    }
    else
      this.formErrosValidation = true;

  }


}
