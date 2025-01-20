import { FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";


const items = [] = ['Tipo de produto:', 'Segmento:', 'Fabricante:', 'Modelo:', 'Velocidade:', 'Capacidade:', 'Geração:', 'Descrição:'];

const getSpecificitiesFormValues = (formMain: FormGroup, value: string, action?: string) => {
  return formMain?.get('segments')?.get('0').get('manufacturers')?.get('0')?.get('models')?.get('0')?.get('specificities')?.get(value).value
}

const getFormFieldValue = (form: FormGroup, field: string) => {
  return form?.get(field)?.value
}

const specificitiesNone = (form: FormGroup, value: string, formField: string) => {

  if (value == 'Não especificado') {
    form.get(formField).reset();
    form.get(formField).disable();
    return '#';
  }
  else
    form.get(formField).enable();

  return value;
}


export const ex_speed = [{ id: 0, name: 'Não especificado' }, { id: 1, name: '(Hz)' }, { id: 2, name: '(Khz)' }, { id: 3, name: '(Mhz)' }, { id: 4, name: '(Ghz)' }, { id: 5, name: '(Thz)' }, { id: 6, name: '(Rpm)' }, { id: 7, name: '(Kbps)' }, { id: 8, name: '(Mbps)' }, { id: 9, name: '(Gbps)' }];
export const ex_storage = [{ id: 0, name: 'Não especificado' }, { id: 1, name: '(Kb)' }, { id: 2, name: '(Mb)' }, { id: 3, name: '(Gb)' }, { id: 4, name: '(Tb)' }, { id: 5, name: '(Volt V)' }, { id: 6, name: '(Watt W)' }];

export const ex_makeDescription = (formMain: FormGroup, segmentForm: FormGroup, manufacturerForm: FormGroup, modelForm: FormGroup, specificitiesForm: FormGroup, action?: string) => {

  const specificitiesSpeed = getSpecificitiesFormValues(formMain, 'speed', action) ?? '#';
  const specificitiesCapacity = getSpecificitiesFormValues(formMain, 'capacity', action) ?? '#';
  const specificitiesGenaration = getSpecificitiesFormValues(formMain, 'generation', action) ?? '#';

  const productType: string = `${items[0]} ${getFormFieldValue(formMain, 'name')}`;
  const segment: string = `${items[1]} ${getFormFieldValue(segmentForm, 'name')}`;
  const manufacturer: string = `${items[2]} ${getFormFieldValue(manufacturerForm, 'name')}`;
  const model: string = `${items[3]} ${getFormFieldValue(modelForm, 'name')}`;
  const speed = `${items[4]} ${specificitiesSpeed}`;
  const capacity = `${items[5]} ${specificitiesCapacity}`;
  const generation = `${items[6]} ${specificitiesGenaration == null || specificitiesGenaration == '' ? '#' : specificitiesGenaration}`;

  const result = `${productType},${segment},${manufacturer},${model},${speed},${capacity},${generation}`

  specificitiesForm.get('description').setValue(result);
}

export const ex_measurersHandle = (form: FormGroup, formValue: string, value: string, measurers: string) => {

  const valueHandled = value.replace(/[^\d.-]/g, '');

  form.get(formValue).setValue(`${valueHandled} ${measurers}`);

  return valueHandled;
}

export const ex_onSelectSpeedMeasure = (id: number, form: FormGroup, measurersSelect: Observable<any[]>, measurers: string, measurersHandledValue: string) => {

  const resultMeasurers: string[] = [];

  measurersSelect.pipe(map(x => {
    const result = x.find(item => item.id === id)
    resultMeasurers[0] = specificitiesNone(form, result.name, measurers);
    form.get(measurers).setValue(`${measurersHandledValue} ${resultMeasurers[0]}`);
  })).subscribe();

  return resultMeasurers[0];
}




