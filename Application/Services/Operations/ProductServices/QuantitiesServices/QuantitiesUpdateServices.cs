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

        public Task<QuantityDto> Reserve(int quantityId, QuantityDto entityDto)
        {
            throw new NotImplementedException();
        }

        public Task<QuantityDto> Sell(int quantityId, QuantityDto entityDto)
        {
            throw new NotImplementedException();
        }
    }
}