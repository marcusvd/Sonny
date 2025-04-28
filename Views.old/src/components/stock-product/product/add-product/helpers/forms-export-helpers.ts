import { FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";


import { ManufacturerDto } from "../../dtos/manufacturer-dto";
import { ModelDto } from "../../dtos/model-dto";
import { ProductTypeEdit } from "../../dtos/produc-type-edit";
import { ProductTypeDto } from "../../dtos/product-type-dto";
import { SegmentDto } from "../../dtos/segment-dto";
import { SpecificitiesDto } from "../../dtos/specificities-dto";

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

const specificityBuilderFromSelectedModel = (formMain: FormGroup, specificitiesDto: SpecificitiesDto) => {

  const detailedDescription = specificitiesDto?.detailedDescription;
  const description = specificitiesDto?.description;

  if (description)
    setFormValue(formMain, 'description', description);
  else
    setFormValue(formMain, 'description', `Nenhuma especifidade cadastrada!`);

  if (detailedDescription)
    setFormValue(formMain, 'detailedDescription', detailedDescription);
  else
    setFormValue(formMain, 'detailedDescription', `Não cadastrado.`);


}


const makeProductTypeEdit = (productType?: ProductTypeDto, segment?: SegmentDto, manufacturer?: ManufacturerDto, model?: ModelDto, specificities?: SpecificitiesDto) => {

  if (productType)
    ex_productTypeEndSubItemsSelected = productType

  if (segment)
    ex_productTypeEndSubItemsSelected.segments[0] = segment

  if (manufacturer)
    ex_productTypeEndSubItemsSelected.segments[0].manufacturers[0] = manufacturer

  if (model)
    ex_productTypeEndSubItemsSelected.segments[0].manufacturers[0].models[0] = model

}

export let ex_productTypeEndSubItemsSelected: ProductTypeDto = new ProductTypeDto();

export const ex_onSelectedProduct = (id: number, formMain: FormGroup, productsTypes$: Observable<ProductTypeDto[]>, segments$: Observable<SegmentDto[]>, productTypeEdit: ProductTypeEdit) => {

  segments$ = productsTypes$.pipe(map(x => {

    const productType = x.find(y => y.id == id);

    makeProductTypeEdit(productType)

    setProductTypeEdit('productType', id, productType?.name, productTypeEdit);

    return productType?.segments

  }));

  setFormValue(formMain, 'productTypeId', id);

  return segments$ = segments$.pipe(map(x => [newItem(), ...x ?? []]))
}

export const ex_onSelectedSegment = (id: number, formMain: FormGroup, productsTypes$: Observable<ProductTypeDto[]>, segments$: Observable<SegmentDto[]>, manufacturers$: Observable<ManufacturerDto[]>, productTypeEdit: ProductTypeEdit) => {

  manufacturers$ = segments$.pipe(
    map(x => {

      const segments = x.find(y => y.id == id);

      makeProductTypeEdit(null, segments)

      setProductTypeEdit('segment', id, segments?.name, productTypeEdit);

      return segments?.manufacturers
    })
  )

  setFormValue(formMain, 'segmentId', id);

  return manufacturers$ = manufacturers$.pipe(map(x => [newItem(), ...x ?? []]));

}

export const ex_onSelectedManufacturer = (id: number, formMain: FormGroup, manufacturers$: Observable<ManufacturerDto[]>, models$: Observable<ModelDto[]>, productTypeEdit: ProductTypeEdit) => {

  models$ = manufacturers$?.pipe(
    map(x => {

      const manufacturers = x.find(y => y.id == id);

      makeProductTypeEdit(null, null, manufacturers)

      setProductTypeEdit('manufacturer', id, manufacturers?.name, productTypeEdit);

      return manufacturers?.models
    })
  )

  setFormValue(formMain, 'manufacturerId', id);

  return models$ = models$?.pipe(map(x => [newItem(), ...x ?? []]));
}

export const ex_onSelectedModel = (id: number, formMain: FormGroup, models$: Observable<ModelDto[]>) => {

  models$.pipe(
    map(x => {

      makeProductTypeEdit(null, null, null, x.find(models => models.id == id))

      const specificity = x.find(models => models.id == id)?.specificities;
      setFormValue(formMain, 'specificitiesId', specificity?.id);
      specificityBuilderFromSelectedModel(formMain, specificity);

    })
  ).subscribe();

  setFormValue(formMain, 'modelId', id);
}

