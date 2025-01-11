import { FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";


import { ManufacturerDto } from "../../../dtos/manufacturer-dto";
import { ModelDto } from "../../../dtos/model-dto";
import { ProductTypeEdit } from "../../../dtos/produc-type-edit";
import { ProductTypeDto } from "../../../dtos/product-type-dto";
import { SegmentDto } from "../../../dtos/segment-dto";
import { SpecificitiesDto } from "../../../dtos/specificities-dto";

const newItem = () => {
  const toRegisterNew: any = {
    id: 0,
    userId: 0,
    user: null,
    companyId: 0,
    company: null,
    name: 'Adicionar Novo',
    productTypeId: 0,
    productType: null,
    manufacturers: null,
    products: null,
    deleted: null,
    registered: null
  };
  return toRegisterNew
}

const setProductTypeEdit = (entity: string, id: number, name: string, productTypeEdit: ProductTypeEdit) => {

  switch (entity) {

    case 'productType': {
      productTypeEdit.productTypeId = id;
      productTypeEdit.productTypeName = name;
      break;
    }
    case 'segment': {
      productTypeEdit.segmentId = id;
      productTypeEdit.segmentName = name;
      break;
    }
    case 'manufacturer': {
      productTypeEdit.manufacturerId = id;
      productTypeEdit.manufacturerName = name;
      break;
    }

  }

}

const setFormValue = (form: FormGroup, field: string, value: string | number) => {

  form?.get(field)?.patchValue(value);

}

const fieldFormEnableDisable = (form: FormGroup, field: string, action: string) => {

  if (action == 'enable')
    form.get(field)?.enable();

  if (action == 'disable')
    form.get(field)?.disable();

}

export const ex_onSelectedProduct = (id: number, formMain: FormGroup, productsTypes$: Observable<ProductTypeDto[]>, segments$: Observable<SegmentDto[]>, productTypeEdit: ProductTypeEdit) => {

  segments$ = productsTypes$.pipe(map(x => {

    const segment = x.find(y => y.id == id);

    setProductTypeEdit('productType', id, segment.name, productTypeEdit);

    return segment.segments

  }));

  setFormValue(formMain, 'productTypeId', id);

  return segments$ = segments$.pipe(map(x => [newItem(), ...x ?? []]))
}

export const ex_onSelectedSegment = (id: number, formMain: FormGroup, productsTypes$: Observable<ProductTypeDto[]>, segments$: Observable<SegmentDto[]>, manufacturers$: Observable<ManufacturerDto[]>, productTypeEdit: ProductTypeEdit) => {

  manufacturers$ = segments$.pipe(
    map(x => {

      const manufacturer = x.find(y => y.id == id);

      setProductTypeEdit('segment', id, manufacturer.name, productTypeEdit);

      return manufacturer.manufacturers
    })
  )

  setFormValue(formMain, 'segmentId', id);

  return manufacturers$ = manufacturers$.pipe(map(x => [newItem(), ...x ?? []]));

}

export const ex_onSelectedManufacturer = (id: number, formMain: FormGroup, manufacturers$: Observable<ManufacturerDto[]>, models$: Observable<ModelDto[]>, productTypeEdit: ProductTypeEdit) => {

  models$ = manufacturers$?.pipe(
    map(x => {

      const model = x.find(y => y.id == id);

      setProductTypeEdit('manufacturer', id, model.name, productTypeEdit);

      return model.models
    })
  )

  setFormValue(formMain, 'manufacturerId', id);

  return models$ = models$?.pipe(map(x => [newItem(), ...x ?? []]));
}

export const ex_onSelectedModel = (id: number, formMain: FormGroup, models$: Observable<ModelDto[]>) => {

  models$.pipe(
    map(x => {

      const specificity = x.find(models => models.id == id).specificities;
      setFormValue(formMain, 'specificitiesId', specificity?.id);
      specificityBuilderFromSelectedModel(formMain, specificity);

    })
  ).subscribe();

  setFormValue(formMain, 'modelId', id);
}

const specificityBuilderFromSelectedModel = (formMain: FormGroup, specificitiesDto: SpecificitiesDto) => {

  const speed = specificitiesDto?.speed == null ? 'Não cadastrado': specificitiesDto?.description.split(',')[4];
  const capacity = specificitiesDto?.capacity == null ? 'Não cadastrado': specificitiesDto?.description.split(',')[5];
  const generation = specificitiesDto?.generation == null ? 'Não cadastrado': specificitiesDto?.description.split(',')[6];
  const detailedDescription = specificitiesDto?.detailedDescription;

  console.log(speed)
  console.log(capacity)
  console.log(generation)


  if (speed && capacity && generation)
    setFormValue(formMain, 'specificitiesName', `${speed}, ${capacity}, ${generation}`);
  else
    setFormValue(formMain, 'specificitiesName', `Nenhuma especifidade cadastrada!`);

  if (detailedDescription)
    setFormValue(formMain, 'detailedDescription', detailedDescription);
  else
    setFormValue(formMain, 'detailedDescription', `Não cadastrado.`);


}