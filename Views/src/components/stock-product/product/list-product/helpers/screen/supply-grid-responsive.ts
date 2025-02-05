
import { PtBrCurrencyPipe } from "src/shared/pipes/pt-br-currency.pipe";
import { TruncatePipe } from "src/shared/pipes/truncate.pipe";
import { ProductList } from "../../dto/product-list";
import { ProductDto } from "../../../dtos/product-dto";
import { ex_haveSpace } from "../field-handle-help";


const entities: ProductList[] = [];

export const ex_supplyItemsGrid = (product: ProductDto, _truncatePipe: TruncatePipe, _ptBrCurrencyPipe: PtBrCurrencyPipe) => {

  const items: ProductList = new ProductList();

  Object.assign(items, {
    id: { key: product?.id?.toString() },

    productTypeView: {
      key: _truncatePipe.transform(product?.productType.name, 3)
    },

    segmentView: {
      key: _truncatePipe.transform(product?.segment.name, 13)
    },

    manufacturerView: {
      key: _truncatePipe.transform(product?.manufacturer.name, 13)
    },

    productType: {
      key: product?.productType.name
    },

    segment: {
      key: product?.segment.name
    },

    manufacturer: {
      key: product?.manufacturer.name
    },

    model: {
      key: _truncatePipe.transform(product?.model.name, 25)
    },

    soldPrice: {
      key: _ptBrCurrencyPipe.transform(product?.soldPrice)
    },

    isReservedByUser: {
      key: product?.isReservedByUser?.userName ?? 'Não'
    },

    quantity: {
      key: product.quantity.toString()
    },

    description: {
      key: ex_haveSpace(product?.specificities.description) ? product?.specificities.description : _truncatePipe.transform(product?.specificities.description, 30), icons: [''], styleInsideCell: 'text-align: center;', styleCell: 'flex: 3;' + (ex_haveSpace(product?.specificities.description) ? ' wrap: break-word' : ''), route: ''
    },

    isUsed: {
      key: product?.isUsed ? 'Usado' : 'Novo'
    },
  })

  entities.push(items);

  return entities;

}