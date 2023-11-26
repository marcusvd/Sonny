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
using Pagination.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Application.Services.Operations.ProductServices.QuantitiesServices
{
    public class QuantitiesGetServices : IQuantitiesGetServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;

        public QuantitiesGetServices(
                         IUnitOfWork GENERIC_REPO,
                         IMapper MAP
                        )
        {
            _MAP = MAP;
            _GENERIC_REPO = GENERIC_REPO;
        }

        public async Task<Page<QuantityDto>> GetAllQuantitiesByProductId(Params parameters)
        {
            var fromDb = await _GENERIC_REPO.QuantitiesProduct.GetPaged(
                        parameters, predicate => predicate.ProductId == parameters.predicate,
                        null,
                        selector => selector
          );

            if (fromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            DateTime minDate = DateTime.MinValue;


            fromDb.ToList().ForEach(x =>
            {
                if (x.IsReserved != minDate || x.SoldDate != minDate)
                    fromDb.Remove(x);
            });


            var viewDto = _MAP.Map<List<QuantityDto>>(fromDb);

            var pagedToReturn = new Page<QuantityDto>()
            {
                // CurrentPg = fromDb.CurrentPg,
                // TotalPgs = fromDb.TotalPgs,
                // PgSize = fromDb.PgSize,
                // TotalCount = fromDb.TotalCount,
                // HasPrevious = fromDb.HasPrevious,
                // HasNext = fromDb.HasNext,
                EntitiesToShow = viewDto
            };

            return pagedToReturn;

        }


        // public async Task<int> LengthQuantitiesAsync(int productId)
        // {
        //     var lengthQuantityFromDb = _GENERIC_REPO.QuantitiesProduct
        //     .GetCount(x => x.ProductId == productId);

        //     if (lengthQuantityFromDb == null) throw new

        //                                   GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

        //     return await lengthQuantityFromDb;

        // }
        public async Task<int> LengthQuantitiesAsync(int productId)
        {
            var lengthQuantityFromDb = await _GENERIC_REPO.QuantitiesProduct
            .Get(
                x => x.ProductId == productId,
                null,
                selector => selector
                ).ToListAsync();

            if (lengthQuantityFromDb == null) throw new
                                          GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            var minValue = DateTime.MinValue;

            lengthQuantityFromDb.ToList().ForEach(x =>
            {
                if (x.IsReserved != minValue || x.SoldDate != minValue)
                lengthQuantityFromDb.Remove(x);
            });

            var result = lengthQuantityFromDb.Count();

            return result;

        }

    }
}