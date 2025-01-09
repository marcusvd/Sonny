import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { BaseForm } from "src/shared/components/inheritance/forms/base-form";
import { of } from "rxjs";


import { ModelDto } from "src/components/stock-product/product/dtos/model-dto";
import { SpecificitiesDto } from "src/components/stock-product/product/dtos/specificities-dto";
import { ProductTypeEdit } from "../../dto/produc-type-edit";
import { ValidatorsProductTypeEditAsyncField } from "../form-validators/validators-product-type-edit-async-field";




export class FormControllerAddProductType extends BaseForm {
  constructor(
    private _fb: FormBuilder,
    public _validatorsAsyncField: ValidatorsProductTypeEditAsyncField
  ) {
    super()
  }

  speedMeasure = ''
  storageMeasure = ''
  speed$ = of([{ id: 0, name: 'Não especificado' }, { id: 1, name: 'Hz' }, { id: 2, name: 'Khz' }, { id: 3, name: 'Mhz' }, { id: 4, name: 'Ghz' }, { id: 5, name: 'Thz' }, { id: 6, name: 'Rpm' }, { id: 7, name: 'Kbps' }, { id: 8, name: 'Mbps' }, { id: 9, name: 'Gbps' }]);
  storage$ = of([{ id: 0, name: 'Não especificado' }, { id: 1, name: 'Kb' }, { id: 2, name: 'Mb' }, { id: 3, name: 'Gb' }, { id: 4, name: 'Tb' }, { id: 5, name: 'Volt (V)' }, { id: 6, name: 'Watt (W)' }]);

  //FORMS
  get segments() {
    return this.formMain.get('segments') as FormArray
  }
  get manufacturers() {
    return this.segmentForm.get('manufacturers') as FormArray
  }
  get models() {
    return this.manufacturerForm.get('models') as FormArray
  }
  // get specificities() {
  //   return this.modelForm.get('specificities') as FormArray
  // }

  //FormGroups
  segmentForm: FormGroup;
  manufacturerForm: FormGroup;
  modelForm: FormGroup;
  specificitiesForm: FormGroup;

  //Validators
  nameMaxLength = 50;
  descriptionMaxLength = 500;

  formLoad(productType?: ProductTypeEdit) {
    this.formMain = this._fb.group({
      id: [productType?.productTypeId ?? 0, [Validators.required]],
      name: new FormControl(productType?.productTypeName, { validators: [Validators.required, Validators.maxLength(this.nameMaxLength)] }),
      companyId: [this.companyId, [Validators.required]],
      userId: [this.userId, [Validators.required]],
      segments: this._fb.array([], Validators.required)
    })
  }

  formLoadSegment(productType?: ProductTypeEdit) {
    return this.segmentForm = this._fb.group({
      id: [productType?.segmentId ?? 0, [Validators.required]],
      name: new FormControl(productType?.segmentName, { validators: [Validators.required, Validators.maxLength(this.nameMaxLength)], asyncValidators: [this._validatorsAsyncField.validateSegmentAsync(productType?.productTypeId)] }),
      companyId: [this.companyId, [Validators.required]],
      productId: [0, []],
      registered: [new Date(), [Validators.required]],
      manufacturers: this._fb.array([], Validators.required)
    })
  }

  formLoadManufacturer(productType?: ProductTypeEdit) {
    return this.manufacturerForm = this._fb.group({
      id: [productType?.manufacturerId ?? 0, [Validators.required]],
      name: new FormControl(productType?.manufacturerName, { validators: [Validators.required, Validators.maxLength(this.nameMaxLength)], asyncValidators: [this._validatorsAsyncField.validateManufacturerAsync(productType?.segmentId)] }),
      companyId: [this.companyId, [Validators.required]],
      segmentId: [0, []],
      registered: [new Date(), [Validators.required]],
      models: this._fb.array([], Validators.required)
    })
  }

  formLoadModel(productType?: ProductTypeEdit) {
    return this.modelForm = this._fb.group({
      id: [0, [Validators.required]],
      companyId: [this.companyId, [Validators.required]],
      name: new FormControl('', { validators: [Validators.required, Validators.maxLength(this.nameMaxLength)], asyncValidators: [this._validatorsAsyncField.validateModelAsync(productType?.manufacturerId)] }),
      manufacturerId:0,
      registered: [new Date(), [Validators.required]],
      specificities: this.formLoadSpecificities()
      // specificities: this._fb.array([], Validators.required)
    })
  }

  formLoadSpecificities(specificities?: SpecificitiesDto) {
    return this.specificitiesForm = this._fb.group({
      id: [specificities?.id ?? 0, [Validators.required]],
      companyId: [this.companyId, [Validators.required]],
      speed: new FormControl({ value: specificities?.speed ?? '', disabled: true }, [Validators.maxLength(this.nameMaxLength)]),
      capacity: new FormControl({ value: specificities?.capacity ?? '', disabled: true }, [Validators.maxLength(this.nameMaxLength)]),
      generation: ['', []],
      version: ['', []],
      description: ['', []],
      manufacturerLink:['http://', []],
      registered: [new Date(), [Validators.required]],
      // modelId: specificities?.modelId ?? 0,
    })
  }

  formDisabledToStart = () => {
    this?.formMain?.get('name')?.disable();

    if (this?.formMain?.get('segments')?.get('0').get('id').value != 0)
      this?.formMain?.get('segments')?.get('0').get('name')?.disable();

    if (this?.formMain?.get('segments')?.get('0').get('manufacturers').get('0').get('id').value != 0)
      this?.formMain?.get('segments')?.get('0').get('manufacturers').get('0').get('name')?.disable();

  }
  getSpecificitiesFormValues(value: string) {
    return this.formMain.get('segments')?.get('0').get('manufacturers').get('0').get('models').get('0').get('specificities').get(value).value
  }

  makeDescription = async () => {

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

  formEnableToSave = () => {
    this?.formMain?.get('name')?.enable();
    this?.formMain?.get('segments')?.get('0').get('name')?.enable();
    this?.formMain?.get('segments')?.get('0').get('manufacturers').get('0').get('name')?.enable();
  }

  controlReset = false;
  formControlReset = () => {
    this.controlReset = true;
    // this.controlReset = !this.controlReset;
  }


}
