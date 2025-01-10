import { FormGroup } from "@angular/forms";
import { of } from "rxjs";

export const ex_speed = [{ id: 0, name: 'Não especificado' }, { id: 1, name: 'Hz' }, { id: 2, name: 'Khz' }, { id: 3, name: 'Mhz' }, { id: 4, name: 'Ghz' }, { id: 5, name: 'Thz' }, { id: 6, name: 'Rpm' }, { id: 7, name: 'Kbps' }, { id: 8, name: 'Mbps' }, { id: 9, name: 'Gbps' }];
export const ex_storage = [{ id: 0, name: 'Não especificado' }, { id: 1, name: 'Kb' }, { id: 2, name: 'Mb' }, { id: 3, name: 'Gb' }, { id: 4, name: 'Tb' }, { id: 5, name: 'Volt (V)' }, { id: 6, name: 'Watt (W)' }];




export const ex_makeDescription = (formMain: FormGroup, segmentForm: FormGroup, manufacturerForm: FormGroup, modelForm: FormGroup, specificitiesForm: FormGroup, speedMeasure: string, storageMeasure: string, action?:string) => {

    const items = [] = ['Tipo de produto:', 'Segmento:', 'Fabricante:', 'Modelo:', 'Velocidade:', 'Capacidade:', 'Geração:', 'Descrição:'];

    const typeName = formMain.get('name').value || '#';
    const segmentName = segmentForm.get('name').value || '#';
    const manufacturerName = manufacturerForm.get('name').value || '#';
    const modelName = modelForm.get('name').value || '#';

    let formAddEdit:FormGroup = null;

    if(action == 'edit')
        formAddEdit = formMain;
    else
        formAddEdit = specificitiesForm;
    

    const specificitiesSpeed = getSpecificitiesFormValues(formAddEdit, 'speed') || '#';
    const specificitiesCapacity = getSpecificitiesFormValues(formAddEdit, 'capacity') || '#';
    const specificitiesGenaration = getSpecificitiesFormValues(formAddEdit, 'generation') || '#';


    const result = `
    ${items[0]}  ${typeName},
    ${items[1]}  ${segmentName},
    ${items[2]}  ${manufacturerName},
    ${items[3]}  ${modelName},
    ${items[4]}  ${specificitiesSpeed} ${speedMeasure ?? ''},
    ${items[5]}  ${specificitiesCapacity} ${storageMeasure ?? ''},
    ${items[6]}  ${specificitiesGenaration},`;

    specificitiesForm.get('description').setValue(result);
}

const getSpecificitiesFormValues = (formMain: FormGroup, value: string) => {
    return formMain.get('segments')?.get('0').get('manufacturers').get('0').get('models').get('0').get('specificities').get(value).value
}