using System.Threading.Tasks;
using AutoMapper;
using UnitOfWork.Persistence.Contracts;
using System;
using Application.Exceptions;
using Domain.Entities.Stocks;
using System.Linq;
using Application.Services.Operations.Products.BusinessRulesValidation;
using Application.Services.Operations.Products.Dtos;

namespace Application.Services.Operations.Products
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

            var availableQuantity = entityToDb.Quantities.Count();

            ProductAddBusinessRulesValidation.AvailableQuantity(availableQuantity);

            entityToDb.Quantities.ToList().ForEach(x =>
            {
                    x.SoldDate = DateTime.MinValue;
                    x.IsReserved = DateTime.MinValue;
                    x.EntryDate = DateTime.Now;

            });

            ProductAddBusinessRulesValidation.QuantitiesValidation(entityToDb.Quantities);

            entityToDb.AvailableQuantity = availableQuantity;

            entityToDb.Status = availableQuantity > 0 ? StatusEnum.available : StatusEnum.unavailable;

            ProductAddBusinessRulesValidation.StatusAvailable(entityToDb.Status);

            _GENERIC_REPO.Products.AddAsync(entityToDb);

            if (await _GENERIC_REPO.save())
            {
                var entityFromDb = await _GENERIC_REPO.Products.GetByIdAsync(_id => _id.Id == entityToDb.Id);
                if (entityFromDb == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);
                return _MAP.Map<ProductDto>(entityFromDb);
            }

            return entityDto;

        }


    }

}