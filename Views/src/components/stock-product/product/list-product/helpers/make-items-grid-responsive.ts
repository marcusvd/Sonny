
import { ItemsInterface } from "src/shared/components/list-g/list/interfaces/items-interface"
import { TruncatePipe } from "src/shared/pipes/truncate.pipe"
import { ProductList } from "../dto/product-list"
import { ProductDto } from "../../dtos/product-dto"
import { PtBrCurrencyPipe } from "src/shared/pipes/pt-br-currency.pipe";

const entities: ProductList[] = [];

export const ex_makeItemsGridSmall = (x: ProductList[], _truncatePipe: TruncatePipe) => {

  const buttonStyle = `background-color:rgb(43, 161, 168);border:none; color:white; height: 20px;  display: flex;  justify-content: center;   align-items: center;   padding: 0 12px; width: 100px; max-width: 100px;`
  const buttonCellStyle = `display: flex; justify-content: center; align-items: center;`
  const iconStyle = `color:rgb(43, 161, 168); cursor: pointer; font-size:20px; float:left;`
  const soldPricestyleInsideCell = 'border:0.5px solid red;'

  const createdItems: ProductList[] = [];

  let items: ProductList = null;

  x.forEach(x => {

    items = new ProductList();

    items.id = { key: x?.id.toString() };

    items.productTypeView = { key: _truncatePipe.transform(x?.productType.key, 14), icons: [''], button: x?.productType.key, styleInsideCell: '', styleCell: '', route: '' };

    items.segmentView = { key: _truncatePipe.transform(x?.segment.key, 10), icons: [''], styleInsideCell: '', styleCell: '', route: '' };

    items.manufacturerView = { key: _truncatePipe.transform(x?.manufacturer.key, 10), display: '', button: 'Menu', icons: [''], styleInsideCell: '', styleCell: '', route: '' };

    items.productType = { key: x?.productType.key };

    items.segment = { key: x?.segment.key };

    items.manufacturer = { key: x?.manufacturer.key };

    items.model = { key: x?.model.key };

    items.soldPrice = { key: x?.soldPrice.key };

    items.isReservedByUser = { key: x?.isReservedByUser?.key ?? 'Não' };

    items.quantity = { key: x?.quantity.key.toString() };

    if (ex_haveSpace(x?.description.key))
      items.description = { key: x?.description.key, icons: [''], styleInsideCell: 'text-align: center;', styleCell: 'flex: 3; wrap: break-word', route: '' };
    else
      items.description = { key: _truncatePipe.transform(x?.description.key, 20), icons: [''], styleInsideCell: 'text-align: center;', styleCell: 'flex: 3;', route: '' };

    items.isUsed = { key: x?.isUsed ? 'Sim' : 'Não' };

    createdItems.push(items);
  })


  return createdItems;

}

export const ex_makeItemsGridLager = (products: ProductList[], _truncatePipe: TruncatePipe) => {

  const buttonStyle = `background-color:rgb(43, 161, 168);border:none; color:white; height: 20px;  display: flex;  justify-content: center;   align-items: center;   padding: 0 12px; width: 100px; max-width: 100px;`
  const buttonCellStyle = `display: flex; justify-content: center; align-items: center;`
  const iconStyle = `color:rgb(43, 161, 168); cursor: pointer; font-size:20px;`
  const soldPricestyleInsideCell = 'border:0.5px solid red; width: 100px;';

  const createdItems: ProductList[] = [];
  let items: ProductList = null;

  return products.map(x => {

    return {

      id: {
        key: x?.id.toString(),
        display: 'icons',
        icons: ['list', 'edit', 'home'],
        styleInsideCell: iconStyle,
        styleCell: '',
        route: ''
      },

      productTypeView: {
        key: _truncatePipe.transform(x?.productType.key,
          14),
        icons: [''],
        button: x?.productType.key,
        styleInsideCell: '',
        styleCell: '',
        route: ''
      },

      segmentView: {
        key: _truncatePipe.transform(x?.segment.key,
          10),
        icons: [''],
        styleInsideCell: '',
        styleCell: '',
        route: ''
      },

      manufacturerView: {
        key: _truncatePipe.transform(x?.manufacturer.key,
          10),
        display: '',
        button: 'Menu',
        icons: [''],
        styleInsideCell: '',
        styleCell: '',
        route: ''
      },

      productType: {
        key: x?.productType.key,
        icons: [''],
        button: x?.productType.key,
        styleInsideCell: '',
        styleCell: '',
        route: ''
      },

      segment: {
        key: x?.segment.key,
        icons: [''],
        styleInsideCell: '',
        styleCell: '',
        route: ''
      },

      manufacturer: {
        key: x?.manufacturer.key,
        display: '',
        button: 'Menu',
        icons: [''],
        styleInsideCell: '',
        styleCell: '',
        route: ''
      },

      model: {
        key: x?.model.key,
        icons: [''],
        styleInsideCell: '',
        styleCell: '',
        route: ''
      },

      soldPrice: {
        key: x?.soldPrice.key,
        icons: [''],
        styleInsideCell: soldPricestyleInsideCell,
        styleCell: 'text-align: center;',
        route: ''
      },

      isReservedByUser: {
        key: x?.isReservedByUser?.key ?? 'Não',
        icons: [''],
        styleInsideCell: '',
        styleCell: '',
        route: ''
      },

      quantity: {
        key: x?.quantity.key.toString()
      },

      description: {
        key: x?.description.key,
        icons: [''],
        styleInsideCell: 'text-align: center;',
        styleCell: 'flex: 3;',
        route: ''
      },

      isUsed: {
        key: x?.isUsed ? 'Sim' : 'Não'
      },
    }
  })

  return createdItems;

}

export const ex_makeItemsGridMedium = (products: ProductList[], _truncatePipe: TruncatePipe): ProductList[] => {

  const truncate = (value: string | undefined, length: number) => _truncatePipe.transform(value, length);

  return products.map(x => {

    return {

      id: {
        key: x?.id.toString(),
        display: 'icons',
        icons: ['list', 'edit', 'home'],
        styleInsideCell: `color:rgb(43, 161, 168); cursor: pointer; font-size:20px;`,
        styleCell: '',
        route: ''
      },

      productTypeView: {
        key: ex_haveSpace(x.productType.key) ? x?.productType.key : truncate(x?.productType.key, 10),
        icons: [''],
        button: x?.productType.key,
        styleInsideCell: '',
        styleCell: ex_haveSpace(x.productType.key) ? ' wrap: break-word' : '',
        route: ''
      },

      productType: {
        key: x?.productType.key,
        icons: [''],
        button: x?.productType.key,
        styleInsideCell: '',
        styleCell: '',
        route: ''
      },

      soldPrice: {
        key: x?.soldPrice.key,
        icons: [''],
        styleInsideCell: 'border:0.5px solid red; width: 100px;',
        styleCell: 'text-align: center;',
        route: ''
      },

      description: {
        key: ex_haveSpace(x.description.key) ? x?.description.key : truncate(x?.description.key, 20),
        icons: [''],
        styleInsideCell: 'text-align: center;',
        styleCell: 'flex: 3;' + (ex_haveSpace(x.description.key) ? ' wrap: break-word' : ''),
        route: ''
      },
    }
  })
}

export const ex_supplyItemsGrid = (x: ProductDto, _truncatePipe: TruncatePipe, _ptBrCurrencyPipe: PtBrCurrencyPipe) => {

  const items: ProductList = new ProductList();

  items.id = { key: x?.id?.toString() };

  items.productTypeView = { key: _truncatePipe.transform(x?.productType.name, 13) };

  items.segmentView = { key: _truncatePipe.transform(x?.segment.name, 13) };

  items.manufacturerView = { key: _truncatePipe.transform(x?.manufacturer.name, 13) };

  items.productType = { key: x?.productType.name };

  items.segment = { key: x?.segment.name };

  items.manufacturer = { key: x?.manufacturer.name };

  items.model = { key: _truncatePipe.transform(x?.model.name, 25) };

  items.soldPrice = { key: _ptBrCurrencyPipe.transform(x?.soldPrice) };

  items.isReservedByUser = { key: x?.isReservedByUser?.userName ?? 'Não' };

  items.quantity = { key: x.quantity.toString() };

  if (ex_haveSpace(x?.specificities.description))
    items.description = { key: x?.specificities.description, icons: [''], styleInsideCell: 'text-align: center;', styleCell: 'flex: 3; wrap: break-word', route: '' };
  else
    items.description = { key: _truncatePipe.transform(x?.specificities.description, 20), icons: [''], styleInsideCell: 'text-align: center;', styleCell: 'flex: 3;', route: '' };

  items.isUsed = { key: x?.isUsed ? 'Usado' : 'Novo' };

  entities.push(items);

  return entities;

}


export const ex_haveSpace = (value: string) => {
  if (value.includes(" "))
    return true;

  return false;
}

// export const ex_isTested = (value: string) => {
//   const iconStyleTested = `color:rgb(43, 161, 168);`
//   const iconStyleNotTested = `color:red;`;

//   const notTested = 'clear';
//   const tested = 'check';

//   const objReturn: ItemsInterface = { key: value.toString(), display: 'icons', icons: [''], styleInsideCell: '', route: '' };

//   const isTested = new Date(value).getFullYear();

//   if (isTested <= 1) {
//     objReturn.icons.push(notTested);
//     objReturn.styleInsideCell = iconStyleNotTested;
//   }
//   else {
//     objReturn.icons.push(tested);
//     objReturn.styleInsideCell = iconStyleTested;
//   }

//   return objReturn;

// }