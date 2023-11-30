using System.Threading.Tasks;
using AutoMapper;
using UnitOfWork.Persistence.Operations;
using System;
using Application.Exceptions;
using Domain.Entities.StkProduct;
using System.Linq;
using Application.Services.Operations.Products.BusinessRulesValidation;
using Application.Services.Operations.ProductServices.Dtos;
using Application.Services.Operations.ProductServices.Helper;
using System.Collections.Generic;

namespace Application.Services.Operations.ProductServices
{
    public class ProductsAddServices : IProductsAddServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public ProductsAddServices(
                         IUnitOfWork GENERIC_REPO,
                         IMapper MAP
                        )
        {
            _MAP = MAP;
            _GENERIC_REPO = GENERIC_REPO;
        }
        public async Task<ProductDto> AddAsync(ProductDto entityDto)
        {
            if (entityDto == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            var entityToDb = _MAP.Map<Product>(entityDto);

            entityToDb.Quantities = new ProductHelperAdd().SetQuantitiesFields(entityToDb.Quantities);

            ProductAddBusinessRulesValidation.QuantitiesValidation(entityToDb.Quantities);

            _GENERIC_REPO.Products.Add(entityToDb);

            if (await _GENERIC_REPO.save())
            {
                var entityFromDb = await _GENERIC_REPO.Products.GetById(
                    _id => _id.Id == entityToDb.Id,
                    null,
                    selector => selector
                    );
                if (entityFromDb == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);
                return _MAP.Map<ProductDto>(entityFromDb);
            }

            return entityDto;

        }


        public async Task<KeyValuePair<string, int>> AddProductSoldTrakingAsync(List<TrackingDto> entitiesDto)
        {
            if (entitiesDto == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            var entitiesToDb = _MAP.Map<List<Tracking>>(entitiesDto);

             _GENERIC_REPO.TrackingsProducts.AddRangeAsync(entitiesToDb);

            if (await _GENERIC_REPO.save())
            {
                return new KeyValuePair<string, int>("Success",200);
            }

           return new KeyValuePair<string, int>("Fail",200);

        }





    }

}