using System.Threading.Tasks;
using AutoMapper;
using UnitOfWork.Persistence.Operations;
using System;
using Application.Exceptions;
using Domain.Entities.Product;
using System.Collections.Generic;
using Application.Services.Operations.Products.Dtos;
using Application.Services.Operations.Products.Helper;

namespace Application.Services.Operations.Products
{
    public class ProductsUpdateServices : IProductsUpdateServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;

        public ProductsUpdateServices(
                         IUnitOfWork GENERIC_REPO,
                         IMapper MAP
                        )
        {
            _MAP = MAP;
            _GENERIC_REPO = GENERIC_REPO;
        }
        public async Task<ProductDto> UpdateAsync(int productId, ProductDto entityDto)
        {

            if (productId != entityDto.Id)
                throw new Exception(GlobalErrorsMessagesException.IdIsDifferentFromEntityUpdate);

            // var entity = await _GENERIC_REPO.Products.GetProductByIdByStockIdAsync
            //          (x => x.StockId == entityDto.StockId, y => y.Id == entityDto.Id);

            var fromDbTraking = await _GENERIC_REPO.Products.GetProductByIdByStockIdTrakingIncludedAsync
                     (entityDto.StockId, entityDto.Id);

            ProductsUpdateHelper productsUpdateHelper = new(_MAP);

            entityDto.Quantities = productsUpdateHelper.QuantitiesSetIsReservedSoldDateHelperUpdateAsync(entityDto.Quantities);

            entityDto.Trackings = _MAP.Map<List<TrackingDto>>(productsUpdateHelper.TrakingsHelperUpdateAsync(entityDto, fromDbTraking));

            var toUpdate = _MAP.Map<Product>(entityDto);

            _GENERIC_REPO.Products.Update(toUpdate);

            if (await _GENERIC_REPO.save())
            {
                var entityFromDb = await _GENERIC_REPO.Products.GetById(_id => _id.Id == toUpdate.Id);

                if (entityFromDb == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);
                return _MAP.Map<ProductDto>(entityFromDb);
            }

            return entityDto;
        }


    }
}