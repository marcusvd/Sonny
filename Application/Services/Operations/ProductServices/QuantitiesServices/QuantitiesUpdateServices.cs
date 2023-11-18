using System.Threading.Tasks;
using AutoMapper;
using UnitOfWork.Persistence.Operations;
using System;
using Application.Exceptions;
using Domain.Entities.StkProduct;
using System.Collections.Generic;
using Application.Services.Operations.ProductServices.Dtos;
using Application.Services.Operations.ProductServices.Helper;
using Application.Services.Operations.ProductServices;

namespace Application.Services.Operations.ProductServices.QuantitiesServices
{
    public class QuantitiesUpdateServices : IQuantitiesUpdateServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;

        public QuantitiesUpdateServices(
                         IUnitOfWork GENERIC_REPO,
                         IMapper MAP
                        )
        {
            _MAP = MAP;
            _GENERIC_REPO = GENERIC_REPO;
        }

        public async Task<QuantityDto> ToReserve(int quantityId, QuantityDto entityDto)
        {

            if (quantityId != entityDto.Id) throw new Exception(GlobalErrorsMessagesException.IdIsDifferentFromEntityUpdate);

            var fromDb = await _GENERIC_REPO.QuantitiesProduct.GetById(
             predicate => predicate.Id == quantityId,
             null,
             selector => selector
             );

            if (entityDto == null || fromDb == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            var toUpdate = _MAP.Map(entityDto, fromDb);

            _GENERIC_REPO.QuantitiesProduct.Update(toUpdate);

            if (await _GENERIC_REPO.save())
            {
                var fromDbAfterUpdated = await _GENERIC_REPO.QuantitiesProduct.GetById(predicate => predicate.Id == toUpdate.Id, null, selector => selector);
                var toReturn = _MAP.Map<QuantityDto>(fromDbAfterUpdated);
                return toReturn;
            }

            return entityDto;

        }

        public Task<QuantityDto> ToSell(int quantityId, QuantityDto entityDto)
        {
            throw new NotImplementedException();
        }

        public async Task<QuantityDto> GetByIdAsync(int quantityId)
        {
            var fromDb = await _GENERIC_REPO.QuantitiesProduct.GetById(predicate => predicate.Id == quantityId, null, selector => selector);
            
            if (fromDb == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);
            
            return _MAP.Map<QuantityDto>(fromDb);
        }


    }
}